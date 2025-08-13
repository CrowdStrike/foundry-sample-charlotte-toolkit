// src/services/workflow/__tests__/WorkflowPolling.test.ts

import {
  pollWorkflowCompletion,
  getWorkflowStatus,
  isWorkflowRunning,
  isWorkflowTerminal,
  parseWorkflowStatus,
} from '../WorkflowPolling';
import { WorkflowStatus, WORKFLOW_CONFIG } from '../types';

// Mock external dependencies
jest.mock('@crowdstrike/foundry-js', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('../../../utils/helpers', () => ({
  wait: jest.fn(),
}));

import { wait } from '../../../utils/helpers';

// Type the mocked functions
const mockWait = wait as jest.MockedFunction<typeof wait>;

describe('WorkflowPolling', () => {
  // Create mock Falcon API instance
  const createMockFalcon = () => ({
    api: {
      workflows: {
        getEntitiesExecutionResultsV1: jest.fn(),
      },
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWait.mockResolvedValue();
  });

  describe('pollWorkflowCompletion', () => {
    describe('successful completion scenarios', () => {
      it('should complete successfully on first poll', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{
            status: 'completed',
            output_data: { result: 'success' },
          }],
          errors: [],
        });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result).toEqual({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'success' },
          pollResults: [{
            attempt: 1,
            timestamp: expect.any(Number),
            status: WorkflowStatus.COMPLETED,
            hasOutput: true,
          }],
        });

        expect(falcon.api.workflows.getEntitiesExecutionResultsV1).toHaveBeenCalledTimes(1);
        expect(mockWait).not.toHaveBeenCalled();
      });

      it('should complete successfully after multiple polls', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        // First two calls return running, third returns completed
        falcon.api.workflows.getEntitiesExecutionResultsV1
          .mockResolvedValueOnce({
            resources: [{ status: 'running' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{ status: 'running' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{
              status: 'completed',
              output_data: { final: 'result' },
            }],
            errors: [],
          });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.status).toBe(WorkflowStatus.COMPLETED);
        expect(result.output_data).toEqual({ final: 'result' });
        expect(result.pollResults).toHaveLength(3);
        expect(falcon.api.workflows.getEntitiesExecutionResultsV1).toHaveBeenCalledTimes(3);
        expect(mockWait).toHaveBeenCalledTimes(2);
        expect(mockWait).toHaveBeenCalledWith(1000);
      });

      it('should handle completion without output data', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: 'completed' }],
          errors: [],
        });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.status).toBe(WorkflowStatus.COMPLETED);
        expect(result.output_data).toBeUndefined();
        expect(result.pollResults).toHaveLength(1);
      });

      it('should handle different running states', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1
          .mockResolvedValueOnce({
            resources: [{ status: 'pending' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{ status: 'inprogress' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{ status: 'running' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{ status: 'completed', output_data: {} }],
            errors: [],
          });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.status).toBe(WorkflowStatus.COMPLETED);
        expect(result.pollResults).toHaveLength(4);
        expect(result.pollResults[0].status).toBe(WorkflowStatus.PENDING);
        expect(result.pollResults[1].status).toBe(WorkflowStatus.IN_PROGRESS);
        expect(result.pollResults[2].status).toBe(WorkflowStatus.RUNNING);
        expect(result.pollResults[3].status).toBe(WorkflowStatus.COMPLETED);
      });
    });

    describe('failure scenarios', () => {
      it('should handle workflow failure', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{
            status: 'failed',
            error: 'Workflow execution error',
          }],
          errors: [],
        });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result).toEqual({
          status: WorkflowStatus.FAILED,
          error: 'Workflow execution error',
          pollResults: [{
            attempt: 1,
            timestamp: expect.any(Number),
            status: WorkflowStatus.FAILED,
            hasOutput: false,
          }],
        });
      });

      it('should handle workflow failure without error message', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: 'failed' }],
          errors: [],
        });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.status).toBe(WorkflowStatus.FAILED);
        expect(result.error).toBe('Workflow execution failed');
      });

      it('should handle unknown status', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: 'unknown-status' }],
          errors: [],
        });

        await expect(pollWorkflowCompletion(falcon as any, workflowId))
          .rejects.toThrow('Unknown workflow status: Unknown');
      });
    });

    describe('timeout scenarios', () => {
      it('should timeout after max attempts (default)', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        // Always return running status
        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: 'running' }],
          errors: [],
        });

        await expect(pollWorkflowCompletion(falcon as any, workflowId))
          .rejects.toThrow('Workflow execution timed out');

        expect(falcon.api.workflows.getEntitiesExecutionResultsV1)
          .toHaveBeenCalledTimes(WORKFLOW_CONFIG.MAX_POLL_ATTEMPTS);
      });

      it('should timeout after custom max attempts', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';
        const maxAttempts = 3;

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: 'running' }],
          errors: [],
        });

        await expect(pollWorkflowCompletion(falcon as any, workflowId, { maxAttempts }))
          .rejects.toThrow('Workflow execution timed out');

        expect(falcon.api.workflows.getEntitiesExecutionResultsV1)
          .toHaveBeenCalledTimes(maxAttempts);
      });

      it('should handle timeout after multiple retries with errors', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';
        const maxAttempts = 3;

        // All calls fail
        falcon.api.workflows.getEntitiesExecutionResultsV1.mockRejectedValue(
          new Error('Network error')
        );

        await expect(pollWorkflowCompletion(falcon as any, workflowId, { maxAttempts }))
          .rejects.toThrow('Network error');

        expect(falcon.api.workflows.getEntitiesExecutionResultsV1)
          .toHaveBeenCalledTimes(maxAttempts);
        expect(mockWait).toHaveBeenCalledTimes(maxAttempts - 1);
      });
    });

    describe('error handling', () => {
      it('should handle network errors during polling', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockRejectedValue(
          new Error('Network connection failed')
        );

        await expect(pollWorkflowCompletion(falcon as any, workflowId))
          .rejects.toThrow('Network connection failed');
      });

      it('should retry after intermittent failures', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        // First call fails, second succeeds
        falcon.api.workflows.getEntitiesExecutionResultsV1
          .mockRejectedValueOnce(new Error('Temporary error'))
          .mockResolvedValueOnce({
            resources: [{ status: 'completed', output_data: {} }],
            errors: [],
          });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.status).toBe(WorkflowStatus.COMPLETED);
        expect(result.pollResults).toHaveLength(2);
        expect(result.pollResults[0].error).toBe('Temporary error');
        expect(result.pollResults[1].status).toBe(WorkflowStatus.COMPLETED);
      });

      it('should handle non-Error exceptions', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1.mockRejectedValue('String error');

        await expect(pollWorkflowCompletion(falcon as any, workflowId))
          .rejects.toBe('String error');
      });
    });

    describe('poll results tracking', () => {
      it('should track all poll attempts with timestamps', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1
          .mockResolvedValueOnce({
            resources: [{ status: 'running' }],
            errors: [],
          })
          .mockResolvedValueOnce({
            resources: [{ status: 'completed', output_data: { test: true } }],
            errors: [],
          });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.pollResults).toHaveLength(2);
        expect(result.pollResults[0]).toEqual({
          attempt: 1,
          timestamp: expect.any(Number),
          status: WorkflowStatus.RUNNING,
          hasOutput: false,
        });
        expect(result.pollResults[1]).toEqual({
          attempt: 2,
          timestamp: expect.any(Number),
          status: WorkflowStatus.COMPLETED,
          hasOutput: true,
        });
      });

      it('should track errors in poll results', async () => {
        const falcon = createMockFalcon();
        const workflowId = 'test-workflow-id';

        falcon.api.workflows.getEntitiesExecutionResultsV1
          .mockRejectedValueOnce(new Error('API error'))
          .mockResolvedValueOnce({
            resources: [{ status: 'completed' }],
            errors: [],
          });

        const result = await pollWorkflowCompletion(falcon as any, workflowId);

        expect(result.pollResults[0]).toEqual({
          attempt: 1,
          timestamp: expect.any(Number),
          error: 'API error',
        });
      });
    });
  });

  describe('getWorkflowStatus', () => {
    it('should get workflow status successfully', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'completed',
          output_data: { final: 'data' },
        }],
        errors: [],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result).toEqual({
        status: WorkflowStatus.COMPLETED,
        output_data: { final: 'data' },
        error: undefined,
      });

      expect(falcon.api.workflows.getEntitiesExecutionResultsV1)
        .toHaveBeenCalledWith({ ids: [workflowId] });
    });

    it('should handle API errors', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [{ message: 'API request failed' }],
      });

      await expect(getWorkflowStatus(falcon as any, workflowId))
        .rejects.toThrow('API request failed');
    });

    it('should handle API errors without message', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [{}],
      });

      await expect(getWorkflowStatus(falcon as any, workflowId))
        .rejects.toThrow('Failed to get workflow results');
    });

    it('should handle missing resources', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [],
      });

      await expect(getWorkflowStatus(falcon as any, workflowId))
        .rejects.toThrow('No workflow results found');
    });

    it('should handle undefined resources', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        errors: [],
      });

      await expect(getWorkflowStatus(falcon as any, workflowId))
        .rejects.toThrow('No workflow results found');
    });

    it('should handle different status types', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';
      const testCases = [
        { input: 'running', expected: WorkflowStatus.RUNNING },
        { input: 'pending', expected: WorkflowStatus.PENDING },
        { input: 'failed', expected: WorkflowStatus.FAILED },
        { input: 'unknown-status', expected: WorkflowStatus.UNKNOWN },
      ];

      for (const testCase of testCases) {
        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status: testCase.input }],
          errors: [],
        });

        const result = await getWorkflowStatus(falcon as any, workflowId);
        expect(result.status).toBe(testCase.expected);
      }
    });

    it('should include error field from workflow result', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'test-workflow-id';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{
          status: 'failed',
          error: 'Custom workflow error',
        }],
        errors: [],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result.status).toBe(WorkflowStatus.FAILED);
      expect(result.error).toBe('Custom workflow error');
    });
  });

  describe('isWorkflowRunning', () => {
    it('should identify running states correctly', () => {
      const runningStates = [
        WorkflowStatus.PENDING,
        WorkflowStatus.IN_PROGRESS,
        WorkflowStatus.RUNNING,
      ];

      runningStates.forEach(status => {
        expect(isWorkflowRunning(status)).toBe(true);
      });
    });

    it('should identify non-running states correctly', () => {
      const nonRunningStates = [
        WorkflowStatus.COMPLETED,
        WorkflowStatus.FAILED,
        WorkflowStatus.UNKNOWN,
      ];

      nonRunningStates.forEach(status => {
        expect(isWorkflowRunning(status)).toBe(false);
      });
    });
  });

  describe('isWorkflowTerminal', () => {
    it('should identify terminal states correctly', () => {
      const terminalStates = [
        WorkflowStatus.COMPLETED,
        WorkflowStatus.FAILED,
      ];

      terminalStates.forEach(status => {
        expect(isWorkflowTerminal(status)).toBe(true);
      });
    });

    it('should identify non-terminal states correctly', () => {
      const nonTerminalStates = [
        WorkflowStatus.PENDING,
        WorkflowStatus.IN_PROGRESS,
        WorkflowStatus.RUNNING,
        WorkflowStatus.UNKNOWN,
      ];

      nonTerminalStates.forEach(status => {
        expect(isWorkflowTerminal(status)).toBe(false);
      });
    });
  });

  describe('parseWorkflowStatus', () => {
    it('should parse known status strings correctly', () => {
      const testCases = [
        { input: 'pending', expected: WorkflowStatus.PENDING },
        { input: 'inprogress', expected: WorkflowStatus.IN_PROGRESS },
        { input: 'in progress', expected: WorkflowStatus.IN_PROGRESS },
        { input: 'running', expected: WorkflowStatus.RUNNING },
        { input: 'completed', expected: WorkflowStatus.COMPLETED },
        { input: 'failed', expected: WorkflowStatus.FAILED },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(parseWorkflowStatus(input)).toBe(expected);
      });
    });

    it('should handle case insensitive parsing', () => {
      const testCases = [
        'PENDING',
        'Pending',
        'RUNNING',
        'Running',
        'COMPLETED',
        'Completed',
        'FAILED',
        'Failed',
        'INPROGRESS',
        'InProgress',
        'IN PROGRESS',
        'In Progress',
      ];

      testCases.forEach(input => {
        const result = parseWorkflowStatus(input);
        expect(result).not.toBe(WorkflowStatus.UNKNOWN);
      });
    });

    it('should handle whitespace in status strings', () => {
      const testCases = [
        '  pending  ',
        '\trunning\t',
        '\ncompleted\n',
        ' failed ',
      ];

      testCases.forEach(input => {
        const result = parseWorkflowStatus(input);
        expect(result).not.toBe(WorkflowStatus.UNKNOWN);
      });
    });

    it('should return UNKNOWN for unrecognized status strings', () => {
      const unknownStatuses = [
        'unknown-status',
        'invalid',
        'cancelled',
        'paused',
        '',
        'some-random-string',
      ];

      unknownStatuses.forEach(status => {
        expect(parseWorkflowStatus(status)).toBe(WorkflowStatus.UNKNOWN);
      });
    });

    it('should handle null and undefined inputs', () => {
      expect(parseWorkflowStatus(null as any)).toBe(WorkflowStatus.UNKNOWN);
      expect(parseWorkflowStatus(undefined as any)).toBe(WorkflowStatus.UNKNOWN);
    });

    it('should handle edge case inputs', () => {
      const edgeCases = [
        '0',
        '1',
        'true',
        'false',
      ];

      edgeCases.forEach(input => {
        expect(parseWorkflowStatus(input)).toBe(WorkflowStatus.UNKNOWN);
      });
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete polling workflow with mixed states', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'integration-test-id';

      // Simulate realistic workflow progression
      falcon.api.workflows.getEntitiesExecutionResultsV1
        .mockResolvedValueOnce({
          resources: [{ status: 'pending' }],
          errors: [],
        })
        .mockResolvedValueOnce({
          resources: [{ status: 'inprogress' }],
          errors: [],
        })
        .mockResolvedValueOnce({
          resources: [{ status: 'running' }],
          errors: [],
        })
        .mockResolvedValueOnce({
          resources: [{
            status: 'completed',
            output_data: { 
              analysis: 'Complete security analysis',
              confidence: 0.95,
              threats: []
            },
          }],
          errors: [],
        });

      const result = await pollWorkflowCompletion(falcon as any, workflowId, { maxAttempts: 10 });

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(result.output_data).toBeDefined();
      expect(result.pollResults).toHaveLength(4);
      
      // Verify progression through states
      expect(result.pollResults[0].status).toBe(WorkflowStatus.PENDING);
      expect(result.pollResults[1].status).toBe(WorkflowStatus.IN_PROGRESS);
      expect(result.pollResults[2].status).toBe(WorkflowStatus.RUNNING);
      expect(result.pollResults[3].status).toBe(WorkflowStatus.COMPLETED);
      
      expect(mockWait).toHaveBeenCalledTimes(3);
    });

    it('should handle polling with intermittent network issues', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'network-test-id';

      // First call fails, second succeeds but still running, third completes
      falcon.api.workflows.getEntitiesExecutionResultsV1
        .mockRejectedValueOnce(new Error('Network timeout'))
        .mockResolvedValueOnce({
          resources: [{ status: 'running' }],
          errors: [],
        })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: { success: true } }],
          errors: [],
        });

      const result = await pollWorkflowCompletion(falcon as any, workflowId, { maxAttempts: 5 });

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(result.pollResults).toHaveLength(3);
      expect(result.pollResults[0].error).toBe('Network timeout');
      expect(result.pollResults[1].status).toBe(WorkflowStatus.RUNNING);
      expect(result.pollResults[2].status).toBe(WorkflowStatus.COMPLETED);
    });
  });
});
