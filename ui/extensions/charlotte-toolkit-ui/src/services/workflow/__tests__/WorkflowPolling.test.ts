import type FalconApi from '@crowdstrike/foundry-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { WorkflowStatus } from '../types';
import { pollWorkflowCompletion } from '../WorkflowPolling';

describe('WorkflowPolling', () => {
  let mockFalconApi: FalconApi;
  let mockGetEntitiesExecutionResultsV1: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGetEntitiesExecutionResultsV1 = vi.fn();
    mockFalconApi = {
      api: {
        workflows: {
          getEntitiesExecutionResultsV1: mockGetEntitiesExecutionResultsV1,
        },
      },
    } as unknown as FalconApi;

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('successful completion', () => {
    it('should return result when workflow completes successfully', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [
          {
            status: 'completed',
            output_data: { result: 'Success output' },
          },
        ],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-123');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(result.output_data).toEqual({ result: 'Success output' });
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledWith({ ids: ['exec-123'] });
    });

    it('should poll multiple times before getting success', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: { result: 'Final' } }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-456');

      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(result.output_data).toEqual({ result: 'Final' });
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(3);
    });

    it('should handle completion without output data', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [{ status: 'completed' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-789');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(result.output_data).toBeUndefined();
    });
  });

  describe('running status detection', () => {
    it('should detect RUNNING status', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'completed', output_data: {} }] });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-run');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });

    it('should detect IN_PROGRESS status', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'inprogress' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'completed', output_data: {} }] });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-prog');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });

    it('should detect PENDING status', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'pending' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'completed', output_data: {} }] });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-pend');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });

    it('should handle status with spaces', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'in progress' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'completed', output_data: {} }] });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-space');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });
  });

  describe('error handling', () => {
    it('should return failed status when workflow fails', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [
          {
            status: 'failed',
            error: 'Workflow execution failed',
          },
        ],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-fail');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.FAILED);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should provide generic error when no error message provided', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [{ status: 'failed' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-gen');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.FAILED);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should throw when API returns errors', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValue({
        errors: [{ message: 'API error occurred' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-api-err');

      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('API error occurred');
    });

    it('should throw when no resources returned', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-nores');

      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('No workflow results found');
    });

    it('should throw when API call fails', async () => {
      mockGetEntitiesExecutionResultsV1.mockRejectedValue(new Error('Network error'));

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-net');

      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Network error');
    });

    it('should throw for unknown workflow status', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'weird_status' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-unknown');

      await vi.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Unknown workflow status');
    });
  });

  describe('timeout handling', () => {
    it('should timeout with default max attempts', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'running' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-timeout');

      // Default is 90 attempts
      await vi.advanceTimersByTimeAsync(91000);

      await expect(promise).rejects.toThrow('Workflow execution timed out');
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(90);
    });

    it('should timeout with custom max attempts', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'running' }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-short', {
        maxAttempts: 5,
      });

      await vi.advanceTimersByTimeAsync(6000);

      await expect(promise).rejects.toThrow('Workflow execution timed out');
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(5);
    });

    it('should allow very long polling with high max attempts', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: { result: 'Done' } }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-long', {
        maxAttempts: 200,
      });

      await vi.advanceTimersByTimeAsync(4000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(4);
    });
  });

  describe('polling interval', () => {
    it('should poll immediately then at 1-second intervals', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: {} }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-interval');

      // First poll happens immediately (no timer), wait for it to complete
      await vi.advanceTimersByTimeAsync(0);
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(1);

      // After 1 second wait, polls at t=1000
      await vi.advanceTimersByTimeAsync(1000);
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(2);

      // After another 1 second wait, polls at t=2000 and completes
      await vi.advanceTimersByTimeAsync(1000);
      await promise;

      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(3);
    });

    it('should poll immediately on start', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: {} }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-immediate');

      // First poll happens immediately (no timer), wait for it to complete
      await vi.advanceTimersByTimeAsync(0);
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(1);

      // Then waits 1 second before next poll
      await vi.advanceTimersByTimeAsync(1000);
      await promise;

      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(2);
    });
  });

  describe('poll results tracking', () => {
    it('should track poll results', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: { result: 'Done' } }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-track');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.pollResults).toBeDefined();
      expect(result.pollResults).toHaveLength(2);

      if (!result.pollResults) {
        throw new Error('pollResults should be defined');
      }

      expect(result.pollResults[0]).toMatchObject({
        attempt: 1,
        status: WorkflowStatus.RUNNING,
      });
      expect(result.pollResults[1]).toMatchObject({
        attempt: 2,
        status: WorkflowStatus.COMPLETED,
        hasOutput: true,
      });
    });

    it('should track errors in poll results', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockRejectedValueOnce(new Error('Temporary error'))
        .mockResolvedValue({
          resources: [{ status: 'completed', output_data: {} }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-err-track', {
        maxAttempts: 10,
      });

      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(result.pollResults).toHaveLength(2);

      if (!result.pollResults) {
        throw new Error('pollResults should be defined');
      }

      expect(result.pollResults[0]).toHaveProperty('error', 'Temporary error');
    });
  });

  describe('edge cases', () => {
    it('should handle immediate success without waiting', async () => {
      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [{ status: 'completed', output_data: { immediate: true } }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-immediate');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
      expect(mockGetEntitiesExecutionResultsV1).toHaveBeenCalledTimes(1);
    });

    it('should handle case-insensitive status strings', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'RUNNING' }] })
        .mockResolvedValueOnce({ resources: [{ status: 'COMPLETED', output_data: {} }] });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-case');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });

    it('should handle status with extra whitespace', async () => {
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: '  running  ' }] })
        .mockResolvedValueOnce({
          resources: [{ status: '  completed  ', output_data: {} }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-space');

      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.status).toBe(WorkflowStatus.COMPLETED);
    });

    it('should use provided execution ID for all requests', async () => {
      const executionId = 'unique-exec-id-123';
      mockGetEntitiesExecutionResultsV1
        .mockResolvedValueOnce({ resources: [{ status: 'running' }] })
        .mockResolvedValueOnce({
          resources: [{ status: 'completed', output_data: {} }],
        });

      const promise = pollWorkflowCompletion(mockFalconApi, executionId);

      await vi.advanceTimersByTimeAsync(2000);
      await promise;

      mockGetEntitiesExecutionResultsV1.mock.calls.forEach((call) => {
        expect(call[0]).toEqual({ ids: [executionId] });
      });
    });

    it('should handle complex output data structures', async () => {
      const complexOutput = {
        nested: { data: { items: [1, 2, 3], metadata: { count: 3 } } },
      };

      mockGetEntitiesExecutionResultsV1.mockResolvedValueOnce({
        resources: [{ status: 'completed', output_data: complexOutput }],
      });

      const promise = pollWorkflowCompletion(mockFalconApi, 'exec-complex');

      await vi.runAllTimersAsync();
      const result = await promise;

      expect(result.output_data).toEqual(complexOutput);
    });
  });
});
