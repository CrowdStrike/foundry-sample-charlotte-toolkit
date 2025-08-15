// src/services/workflow/__tests__/WorkflowExecutor.test.ts

import {
  executeWorkflowWithCache,
  cancelWorkflowExecution,
  getWorkflowStatus,
} from '../WorkflowExecutor';
import type { WorkflowExecutionParams } from '../types';
import { WorkflowStatus, WORKFLOW_CONFIG } from '../types';

// Mock external dependencies
jest.mock('@crowdstrike/foundry-js', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

jest.mock('../../../utils/cache', () => ({
  responseCache: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock('../../../utils/helpers', () => ({
  generateCacheKey: jest.fn(),
  formatErrorMessage: jest.fn(),
}));

jest.mock('../WorkflowContentExtractor', () => ({
  extractWorkflowContent: jest.fn(),
  validateExtractedContent: jest.fn(),
}));

jest.mock('../WorkflowPayloadBuilder', () => ({
  buildWorkflowPayload: jest.fn(),
  logPayloadInfo: jest.fn(),
}));

jest.mock('../WorkflowPolling', () => ({
  pollWorkflowCompletion: jest.fn(),
}));

jest.mock('../WorkflowValidator', () => ({
  validateWorkflowParams: jest.fn(),
}));

import { responseCache } from '../../../utils/cache';
import { generateCacheKey, formatErrorMessage } from '../../../utils/helpers';
import { extractWorkflowContent, validateExtractedContent } from '../WorkflowContentExtractor';
import { buildWorkflowPayload, logPayloadInfo } from '../WorkflowPayloadBuilder';
import { pollWorkflowCompletion } from '../WorkflowPolling';
import { validateWorkflowParams } from '../WorkflowValidator';

// Type the mocked functions
const mockResponseCache = responseCache as jest.Mocked<typeof responseCache>;
const mockGenerateCacheKey = generateCacheKey as jest.MockedFunction<typeof generateCacheKey>;
const mockFormatErrorMessage = formatErrorMessage as jest.MockedFunction<typeof formatErrorMessage>;
const mockExtractWorkflowContent = extractWorkflowContent as jest.MockedFunction<typeof extractWorkflowContent>;
const mockValidateExtractedContent = validateExtractedContent as jest.MockedFunction<typeof validateExtractedContent>;
const mockBuildWorkflowPayload = buildWorkflowPayload as jest.MockedFunction<typeof buildWorkflowPayload>;
const mockLogPayloadInfo = logPayloadInfo as jest.MockedFunction<typeof logPayloadInfo>;
const mockPollWorkflowCompletion = pollWorkflowCompletion as jest.MockedFunction<typeof pollWorkflowCompletion>;
const mockValidateWorkflowParams = validateWorkflowParams as jest.MockedFunction<typeof validateWorkflowParams>;

describe('WorkflowExecutor', () => {
  // Create mock Falcon API instance
  const createMockFalcon = () => ({
    api: {
      workflows: {
        postEntitiesExecuteV1: jest.fn(),
        getEntitiesExecutionResultsV1: jest.fn(),
      },
    },
  });

  // Test data factory
  const createValidParams = (): WorkflowExecutionParams => ({
    query: 'Test security analysis',
    model: 'Claude Latest',
    temperature: 0.5,
    stopWords: ['stop'],
    jsonSchema: '{"type":"object"}',
    dataToInclude: ['context1'],
    selectedContext: 'test context',
    enableCaching: true,
    enablePromptEnhancement: true,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockValidateWorkflowParams.mockReturnValue({ isValid: true });
    mockGenerateCacheKey.mockReturnValue('test-cache-key');
    mockBuildWorkflowPayload.mockReturnValue({ user_prompt: 'test', model_name: 'Claude Latest', temperature: 0.5 });
    mockExtractWorkflowContent.mockReturnValue('Extracted content');
    mockValidateExtractedContent.mockReturnValue({ 
      isValid: true, 
      wordCount: 10, 
      estimatedFormat: 'text',
      warnings: []
    });
    mockFormatErrorMessage.mockImplementation((error: any) => error?.message || String(error));
  });

  describe('executeWorkflowWithCache', () => {
    describe('successful execution flow', () => {
      it('should execute complete workflow successfully', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        // Mock cache miss
        mockResponseCache.get.mockReturnValue(null);

        // Mock successful workflow execution
        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        // Mock successful polling
        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'workflow output' },
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: true,
          content: 'Extracted content',
          fromCache: false,
        });

        // Verify the complete flow
        expect(mockValidateWorkflowParams).toHaveBeenCalledWith(params);
        expect(mockResponseCache.get).toHaveBeenCalledWith('test-cache-key');
        expect(mockBuildWorkflowPayload).toHaveBeenCalledWith(params);
        expect(mockLogPayloadInfo).toHaveBeenCalled();
        expect(falcon.api.workflows.postEntitiesExecuteV1).toHaveBeenCalled();
        expect(mockPollWorkflowCompletion).toHaveBeenCalledWith(falcon, 'workflow-id-123');
        expect(mockExtractWorkflowContent).toHaveBeenCalledWith({ result: 'workflow output' });
        expect(mockValidateExtractedContent).toHaveBeenCalledWith('Extracted content');
        expect(mockResponseCache.set).toHaveBeenCalled();
      });

      it('should handle content validation warnings gracefully', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);
        
        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'workflow output' },
        });

        // Mock content validation with warnings
        mockValidateExtractedContent.mockReturnValue({
          isValid: false,
          wordCount: 5,
          estimatedFormat: 'text',
          warnings: ['Content is too short']
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(true);
        expect(result.content).toBe('Extracted content');
      });
    });

    describe('cache handling', () => {
      it('should return cached response when cache hit occurs', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        // Mock cache hit
        mockResponseCache.get.mockReturnValue({
          content: 'Cached response content',
          model: 'Claude Latest',
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: true,
          content: 'Cached response content',
          fromCache: true,
        });

        // Verify only cache was checked, no workflow execution
        expect(mockValidateWorkflowParams).toHaveBeenCalledWith(params);
        expect(mockResponseCache.get).toHaveBeenCalledWith('test-cache-key');
        expect(falcon.api.workflows.postEntitiesExecuteV1).not.toHaveBeenCalled();
      });

      it('should skip cache when caching is disabled', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();
        params.enableCaching = false;

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'workflow output' },
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(true);
        expect(result.fromCache).toBe(false);
        
        // Cache should not be checked or set when disabled
        expect(mockResponseCache.get).not.toHaveBeenCalled();
        expect(mockResponseCache.set).not.toHaveBeenCalled();
      });

      it('should handle cache errors gracefully', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        // Mock cache error
        mockResponseCache.get.mockImplementation(() => {
          throw new Error('Cache error');
        });

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'workflow output' },
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(true);
        expect(result.fromCache).toBe(false);
      });

      it('should handle cache save errors gracefully', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: { result: 'workflow output' },
        });

        // Mock cache save error
        mockResponseCache.set.mockImplementation(() => {
          throw new Error('Cache save error');
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        // Should still succeed despite cache save failure
        expect(result.success).toBe(true);
        expect(result.content).toBe('Extracted content');
      });
    });

    describe('validation errors', () => {
      it('should return error when parameter validation fails', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockValidateWorkflowParams.mockReturnValue({
          isValid: false,
          error: 'Invalid query parameter',
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: false,
          error: 'Invalid query parameter',
        });

        // Should not proceed with execution
        expect(falcon.api.workflows.postEntitiesExecuteV1).not.toHaveBeenCalled();
      });

      it('should handle validation error without message', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockValidateWorkflowParams.mockReturnValue({
          isValid: false,
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: false,
          error: 'Validation failed',
        });
      });
    });

    describe('workflow execution errors', () => {
      it('should handle workflow API errors', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: [],
          errors: [{ message: 'API execution error' }],
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('API execution error');
      });

      it('should handle workflow API errors without message', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: [],
          errors: [{}],
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Workflow execution failed');
      });

      it('should handle missing workflow execution ID', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: [],
          errors: [],
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('No workflow execution ID returned');
      });

      it('should handle network errors during workflow execution', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);
        mockFormatErrorMessage.mockReturnValue('Network error');

        falcon.api.workflows.postEntitiesExecuteV1.mockRejectedValue(new Error('Network error'));

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Network error');
      });
    });

    describe('polling errors', () => {
      it('should handle workflow polling failure', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.FAILED,
          error: 'Workflow execution timeout',
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: false,
          error: 'Workflow execution timeout',
        });
      });

      it('should handle workflow polling failure without error message', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.FAILED,
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result).toEqual({
          success: false,
          error: 'Workflow execution failed',
        });
      });

      it('should handle polling exceptions', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);
        mockFormatErrorMessage.mockReturnValue('Polling error');

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockRejectedValue(new Error('Polling error'));

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Polling error');
      });
    });

    describe('edge cases', () => {
      it('should handle missing workflow ID after execution', async () => {
        const falcon = createMockFalcon();
        const params = createValidParams();

        mockResponseCache.get.mockReturnValue(null);

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: [null], // null workflow ID
          errors: [],
        });

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(false);
        expect(result.error).toBe('No workflow ID received from execution');
      });

      it('should handle all steps with minimal data', async () => {
        const falcon = createMockFalcon();
        const params: WorkflowExecutionParams = {
          query: 'minimal query',
          model: 'Claude Latest',
          temperature: 0.5,
          stopWords: [],
          jsonSchema: '',
          dataToInclude: [],
          selectedContext: '',
          enableCaching: false,
        };

        falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
          resources: ['workflow-id-123'],
          errors: [],
        });

        mockPollWorkflowCompletion.mockResolvedValue({
          status: WorkflowStatus.COMPLETED,
          output_data: {},
        });

        mockExtractWorkflowContent.mockReturnValue('minimal content');

        const result = await executeWorkflowWithCache(falcon as any, params);

        expect(result.success).toBe(true);
        expect(result.content).toBe('minimal content');
        expect(result.fromCache).toBe(false);
      });
    });
  });

  describe('cancelWorkflowExecution', () => {
    it('should return success for workflow cancellation', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      const result = await cancelWorkflowExecution(falcon as any, workflowId);

      expect(result).toEqual({ success: true });
    });

    it('should handle different workflow IDs', async () => {
      const falcon = createMockFalcon();
      const workflowIds = ['id1', 'id2', 'very-long-workflow-id-with-special-chars-123'];

      for (const workflowId of workflowIds) {
        const result = await cancelWorkflowExecution(falcon as any, workflowId);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('getWorkflowStatus', () => {
    it('should return workflow status successfully', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{ status: 'completed' }],
        errors: [],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result).toEqual({ status: 'completed' });
      expect(falcon.api.workflows.getEntitiesExecutionResultsV1).toHaveBeenCalledWith({
        ids: [workflowId],
      });
    });

    it('should handle API errors', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [{ message: 'API error' }],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('API error');
    });

    it('should handle API errors without message', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [{}],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('Failed to get workflow status');
    });

    it('should handle missing resources', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [],
        errors: [],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('No workflow status found');
    });

    it('should handle missing status in resource', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
        resources: [{}], // No status field
        errors: [],
      });

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result).toEqual({ status: 'Unknown' });
    });

    it('should handle network errors', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';

      mockFormatErrorMessage.mockReturnValue('Network error');
      falcon.api.workflows.getEntitiesExecutionResultsV1.mockRejectedValue(new Error('Network error'));

      const result = await getWorkflowStatus(falcon as any, workflowId);

      expect(result.status).toBe('Unknown');
      expect(result.error).toBe('Network error');
    });

    it('should handle different status values', async () => {
      const falcon = createMockFalcon();
      const workflowId = 'workflow-id-123';
      const statusValues = ['running', 'completed', 'failed', 'pending', 'cancelled'];

      for (const status of statusValues) {
        falcon.api.workflows.getEntitiesExecutionResultsV1.mockResolvedValue({
          resources: [{ status }],
          errors: [],
        });

        const result = await getWorkflowStatus(falcon as any, workflowId);
        expect(result.status).toBe(status);
      }
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete failure scenario', async () => {
      const falcon = createMockFalcon();
      const params = createValidParams();

      // Validation passes
      mockValidateWorkflowParams.mockReturnValue({ isValid: true });
      
      // Cache miss
      mockResponseCache.get.mockReturnValue(null);
      
      // Workflow execution fails
      mockFormatErrorMessage.mockReturnValue('Complete failure');
      falcon.api.workflows.postEntitiesExecuteV1.mockRejectedValue(new Error('Complete failure'));

      const result = await executeWorkflowWithCache(falcon as any, params);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Complete failure');
    });

    it('should handle partial failure with recovery', async () => {
      const falcon = createMockFalcon();
      const params = createValidParams();

      mockResponseCache.get.mockReturnValue(null);

      falcon.api.workflows.postEntitiesExecuteV1.mockResolvedValue({
        resources: ['workflow-id-123'],
        errors: [],
      });

      // Polling succeeds despite content extraction warnings
      mockPollWorkflowCompletion.mockResolvedValue({
        status: WorkflowStatus.COMPLETED,
        output_data: { result: 'partial data' },
      });

      mockValidateExtractedContent.mockReturnValue({
        isValid: false,
        wordCount: 1,
        estimatedFormat: 'unknown',
        warnings: ['Low quality content']
      });

      const result = await executeWorkflowWithCache(falcon as any, params);

      // Should still succeed with warnings
      expect(result.success).toBe(true);
      expect(result.content).toBe('Extracted content');
    });
  });
});
