import type FalconApi from '@crowdstrike/foundry-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { WorkflowExecutionParams } from '../types';
import { WorkflowStatus } from '../types';
import { executeWorkflowWithCache } from '../WorkflowExecutor';

// Mock all dependencies
vi.mock('../WorkflowValidator');
vi.mock('../WorkflowPayloadBuilder');
vi.mock('../WorkflowPolling');
vi.mock('../WorkflowContentExtractor');
vi.mock('../../../utils/cache');
vi.mock('../../../utils/helpers');

describe('WorkflowExecutor', () => {
  let mockFalconApi: FalconApi;
  let mockPostEntitiesExecuteV1: ReturnType<typeof vi.fn>;

  const validParams: WorkflowExecutionParams = {
    query: 'Test security analysis',
    model: 'gpt-4',
    temperature: 0.7,
    stopWords: [],
    jsonSchema: '',
    dataToInclude: [],
    selectedContext: '',
    enableCaching: true,
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    // Setup FalconApi mock
    mockPostEntitiesExecuteV1 = vi.fn();
    mockFalconApi = {
      api: {
        workflows: {
          postEntitiesExecuteV1: mockPostEntitiesExecuteV1,
        },
      },
    } as unknown as FalconApi;

    // Setup default successful mock implementations
    const { validateWorkflowParams } = await import('../WorkflowValidator');
    vi.mocked(validateWorkflowParams).mockReturnValue({
      isValid: true,
    });

    const { buildWorkflowPayload, logPayloadInfo } = await import('../WorkflowPayloadBuilder');
    vi.mocked(buildWorkflowPayload).mockReturnValue({
      user_prompt: 'Test security analysis',
      model_name: 'gpt-4',
      temperature: 0.7,
    });
    vi.mocked(logPayloadInfo).mockImplementation(() => {});

    const { pollWorkflowCompletion } = await import('../WorkflowPolling');
    vi.mocked(pollWorkflowCompletion).mockResolvedValue({
      status: WorkflowStatus.COMPLETED,
      output_data: { completion: 'Analysis complete' },
    });

    const { extractWorkflowContent, validateExtractedContent } = await import(
      '../WorkflowContentExtractor'
    );
    vi.mocked(extractWorkflowContent).mockReturnValue('Analysis complete');
    vi.mocked(validateExtractedContent).mockReturnValue({
      isValid: true,
      isEmpty: false,
      wordCount: 2,
      estimatedFormat: 'text',
      warnings: [],
      hasStructuredData: false,
    });

    const { responseCache } = await import('../../../utils/cache');
    vi.mocked(responseCache.get).mockReturnValue(null);
    vi.mocked(responseCache.set).mockImplementation(() => {});

    const { generateCacheKey, formatErrorMessage } = await import('../../../utils/helpers');
    vi.mocked(generateCacheKey).mockReturnValue('test-cache-key');
    vi.mocked(formatErrorMessage).mockImplementation((error) =>
      error instanceof Error ? error.message : String(error),
    );

    // Default successful workflow execution
    mockPostEntitiesExecuteV1.mockResolvedValue({
      resources: ['workflow-exec-123'],
    });
  });

  describe('successful end-to-end execution', () => {
    it('should execute workflow successfully from start to finish', async () => {
      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Analysis complete');
      expect(result.fromCache).toBe(false);
      expect(result.error).toBeUndefined();
    });

    it('should call all services in correct order', async () => {
      const { validateWorkflowParams } = await import('../WorkflowValidator');
      const { buildWorkflowPayload } = await import('../WorkflowPayloadBuilder');
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      const validateCall = vi.mocked(validateWorkflowParams).mock.invocationCallOrder[0];
      const buildCall = vi.mocked(buildWorkflowPayload).mock.invocationCallOrder[0];
      const executeCall = mockPostEntitiesExecuteV1.mock.invocationCallOrder[0];
      const pollCall = vi.mocked(pollWorkflowCompletion).mock.invocationCallOrder[0];
      const extractCall = vi.mocked(extractWorkflowContent).mock.invocationCallOrder[0];

      expect(validateCall).toBeDefined();
      expect(buildCall).toBeDefined();
      expect(executeCall).toBeDefined();
      expect(pollCall).toBeDefined();
      expect(extractCall).toBeDefined();

      expect(validateCall).toBeLessThan(buildCall as number);
      expect(buildCall).toBeLessThan(executeCall as number);
      expect(executeCall).toBeLessThan(pollCall as number);
      expect(pollCall).toBeLessThan(extractCall as number);
    });

    it('should pass correct parameters to workflow execution', async () => {
      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(mockPostEntitiesExecuteV1).toHaveBeenCalledWith(
        {
          user_prompt: 'Test security analysis',
          model_name: 'gpt-4',
          temperature: 0.7,
        },
        {
          name: 'Charlotte Toolkit Chat Completion',
          depth: 0,
        },
      );
    });

    it('should pass workflow ID to polling service', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(pollWorkflowCompletion).toHaveBeenCalledWith(mockFalconApi, 'workflow-exec-123');
    });

    it('should extract content from polling result', async () => {
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(extractWorkflowContent).toHaveBeenCalledWith({ completion: 'Analysis complete' });
    });
  });

  describe('cache integration', () => {
    it('should return cached result when cache hit', async () => {
      const { responseCache } = await import('../../../utils/cache');
      vi.mocked(responseCache.get).mockReturnValue({
        content: 'Cached response',
        model: 'gpt-4',
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Cached response');
      expect(result.fromCache).toBe(true);
      expect(mockPostEntitiesExecuteV1).not.toHaveBeenCalled();
    });

    it('should check cache with correct key parameters', async () => {
      const { generateCacheKey } = await import('../../../utils/helpers');
      const { responseCache } = await import('../../../utils/cache');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(generateCacheKey).toHaveBeenCalledWith(
        'Test security analysis',
        'gpt-4',
        0.7,
        [],
        '',
        [],
      );
      expect(responseCache.get).toHaveBeenCalledWith('test-cache-key');
    });

    it('should save result to cache after successful execution', async () => {
      const { responseCache } = await import('../../../utils/cache');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(responseCache.set).toHaveBeenCalledWith('test-cache-key', {
        content: 'Analysis complete',
        model: 'gpt-4',
      });
    });

    it('should not check cache when caching disabled', async () => {
      const { responseCache } = await import('../../../utils/cache');
      const params = { ...validParams, enableCaching: false };

      await executeWorkflowWithCache(mockFalconApi, params);

      expect(responseCache.get).not.toHaveBeenCalled();
      expect(mockPostEntitiesExecuteV1).toHaveBeenCalled();
    });

    it('should not save to cache when caching disabled', async () => {
      const { responseCache } = await import('../../../utils/cache');
      const params = { ...validParams, enableCaching: false };

      await executeWorkflowWithCache(mockFalconApi, params);

      expect(responseCache.set).not.toHaveBeenCalled();
    });

    it('should execute workflow on cache miss', async () => {
      const { responseCache } = await import('../../../utils/cache');
      vi.mocked(responseCache.get).mockReturnValue(null);

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.fromCache).toBe(false);
      expect(mockPostEntitiesExecuteV1).toHaveBeenCalled();
    });

    it('should handle cache errors gracefully', async () => {
      const { responseCache } = await import('../../../utils/cache');
      vi.mocked(responseCache.get).mockImplementation(() => {
        throw new Error('Cache error');
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.fromCache).toBe(false);
      expect(mockPostEntitiesExecuteV1).toHaveBeenCalled();
    });

    it('should continue if cache save fails', async () => {
      const { responseCache } = await import('../../../utils/cache');
      vi.mocked(responseCache.set).mockImplementation(() => {
        throw new Error('Cache save error');
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Analysis complete');
    });
  });

  describe('validation errors', () => {
    it('should return error when validation fails', async () => {
      const { validateWorkflowParams } = await import('../WorkflowValidator');
      vi.mocked(validateWorkflowParams).mockReturnValue({
        isValid: false,
        error: 'Query is required',
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Query is required');
      expect(mockPostEntitiesExecuteV1).not.toHaveBeenCalled();
    });

    it('should return generic error when validation fails without message', async () => {
      const { validateWorkflowParams } = await import('../WorkflowValidator');
      vi.mocked(validateWorkflowParams).mockReturnValue({
        isValid: false,
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
    });

    it('should not check cache when validation fails', async () => {
      const { validateWorkflowParams } = await import('../WorkflowValidator');
      const { responseCache } = await import('../../../utils/cache');
      vi.mocked(validateWorkflowParams).mockReturnValue({
        isValid: false,
        error: 'Invalid parameters',
      });

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(responseCache.get).not.toHaveBeenCalled();
    });
  });

  describe('workflow execution errors', () => {
    it('should handle API errors in workflow execution', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({
        errors: [{ message: 'Workflow API error' }],
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow API error');
    });

    it('should handle missing error message in API response', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({
        errors: [{}],
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should handle missing resources in API response', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({
        resources: [],
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No workflow execution ID returned');
    });

    it('should handle undefined resources in API response', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({});

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No workflow execution ID returned');
    });

    it('should handle network errors during execution', async () => {
      mockPostEntitiesExecuteV1.mockRejectedValue(new Error('Network timeout'));

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network timeout');
    });
  });

  describe('polling errors', () => {
    it('should handle workflow failure status', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      vi.mocked(pollWorkflowCompletion).mockResolvedValue({
        status: WorkflowStatus.FAILED,
        error: 'Workflow execution failed',
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should handle workflow failure without error message', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      vi.mocked(pollWorkflowCompletion).mockResolvedValue({
        status: WorkflowStatus.FAILED,
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution failed');
    });

    it('should handle polling timeout', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      vi.mocked(pollWorkflowCompletion).mockRejectedValue(
        new Error('Workflow execution timed out'),
      );

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow execution timed out');
    });

    it('should handle polling errors', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      vi.mocked(pollWorkflowCompletion).mockRejectedValue(new Error('Polling failed'));

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Polling failed');
    });
  });

  describe('content extraction errors', () => {
    it('should handle content extraction failure', async () => {
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');
      vi.mocked(extractWorkflowContent).mockImplementation(() => {
        throw new Error('Unable to extract content from workflow output');
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unable to extract content from workflow output');
    });

    it('should handle missing output data', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');
      vi.mocked(pollWorkflowCompletion).mockResolvedValue({
        status: WorkflowStatus.COMPLETED,
      });
      vi.mocked(extractWorkflowContent).mockImplementation(() => {
        throw new Error('No output data received from workflow');
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toContain('output data');
    });

    it('should handle empty content extraction', async () => {
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');
      vi.mocked(extractWorkflowContent).mockImplementation(() => {
        throw new Error('Workflow completed but produced no content');
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Workflow completed but produced no content');
    });
  });

  describe('content validation', () => {
    it('should validate extracted content', async () => {
      const { validateExtractedContent } = await import('../WorkflowContentExtractor');

      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(validateExtractedContent).toHaveBeenCalledWith('Analysis complete');
    });

    it('should continue with warnings in content validation', async () => {
      const { validateExtractedContent } = await import('../WorkflowContentExtractor');
      vi.mocked(validateExtractedContent).mockReturnValue({
        isValid: true,
        isEmpty: false,
        wordCount: 2,
        estimatedFormat: 'text',
        warnings: ['Content is very short (less than 5 words)'],
        hasStructuredData: false,
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Analysis complete');
    });

    it('should handle invalid content from validation', async () => {
      const { validateExtractedContent } = await import('../WorkflowContentExtractor');
      vi.mocked(validateExtractedContent).mockReturnValue({
        isValid: false,
        isEmpty: true,
        wordCount: 0,
        estimatedFormat: 'text',
        warnings: ['Content is empty after trimming'],
        hasStructuredData: false,
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Analysis complete');
    });
  });

  describe('integration scenarios', () => {
    it('should handle complex workflow with all features', async () => {
      const complexParams: WorkflowExecutionParams = {
        query: 'Analyze this threat intelligence',
        model: 'claude-3-sonnet',
        temperature: 0.8,
        stopWords: ['stop1', 'stop2'],
        jsonSchema: '{"type": "object"}',
        dataToInclude: ['detection', 'incident'],
        selectedContext: 'domain_data',
        enableCaching: true,
        enablePromptEnhancement: true,
      };

      const result = await executeWorkflowWithCache(mockFalconApi, complexParams);

      expect(result.success).toBe(true);
      expect(result.content).toBe('Analysis complete');
    });

    it('should handle workflow with minimal parameters', async () => {
      const minimalParams: WorkflowExecutionParams = {
        query: 'Test',
        model: 'gpt-4',
        temperature: 0.5,
        stopWords: [],
        jsonSchema: '',
        dataToInclude: [],
        selectedContext: '',
        enableCaching: false,
      };

      const result = await executeWorkflowWithCache(mockFalconApi, minimalParams);

      expect(result.success).toBe(true);
    });

    it('should handle multiple sequential executions', async () => {
      await executeWorkflowWithCache(mockFalconApi, validParams);
      await executeWorkflowWithCache(mockFalconApi, validParams);
      await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(mockPostEntitiesExecuteV1).toHaveBeenCalledTimes(3);
    });

    it('should isolate errors between executions', async () => {
      const { validateWorkflowParams } = await import('../WorkflowValidator');

      // First execution fails
      vi.mocked(validateWorkflowParams).mockReturnValueOnce({
        isValid: false,
        error: 'Validation failed',
      });

      const result1 = await executeWorkflowWithCache(mockFalconApi, validParams);
      expect(result1.success).toBe(false);

      // Second execution succeeds
      vi.mocked(validateWorkflowParams).mockReturnValueOnce({
        isValid: true,
      });

      const result2 = await executeWorkflowWithCache(mockFalconApi, validParams);
      expect(result2.success).toBe(true);
    });
  });

  describe('error formatting', () => {
    it('should format Error objects', async () => {
      mockPostEntitiesExecuteV1.mockRejectedValue(new Error('Custom error'));

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Custom error');
    });

    it('should format string errors', async () => {
      mockPostEntitiesExecuteV1.mockRejectedValue('String error');

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(typeof result.error).toBe('string');
    });

    it('should handle unknown error types', async () => {
      mockPostEntitiesExecuteV1.mockRejectedValue({ unknown: 'error' });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle very long query strings', async () => {
      const longQuery = 'test '.repeat(10000).trim();
      const params = { ...validParams, query: longQuery };

      const result = await executeWorkflowWithCache(mockFalconApi, params);

      expect(result.success).toBe(true);
    });

    it('should handle special characters in query', async () => {
      const params = {
        ...validParams,
        query: 'Test: <script>alert("xss")</script> & special chars 中文',
      };

      const result = await executeWorkflowWithCache(mockFalconApi, params);

      expect(result.success).toBe(true);
    });

    it('should handle empty workflow ID from API', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({
        resources: [''],
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
    });

    it('should handle null workflow ID from API', async () => {
      mockPostEntitiesExecuteV1.mockResolvedValue({
        resources: [null],
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(false);
    });

    it('should handle workflow with structured JSON output', async () => {
      const { pollWorkflowCompletion } = await import('../WorkflowPolling');
      const { extractWorkflowContent } = await import('../WorkflowContentExtractor');
      const { validateExtractedContent } = await import('../WorkflowContentExtractor');

      vi.mocked(pollWorkflowCompletion).mockResolvedValue({
        status: WorkflowStatus.COMPLETED,
        output_data: { completion: '{"result": "structured data"}' },
      });
      vi.mocked(extractWorkflowContent).mockReturnValue('{"result": "structured data"}');
      vi.mocked(validateExtractedContent).mockReturnValue({
        isValid: true,
        isEmpty: false,
        wordCount: 10,
        estimatedFormat: 'json',
        warnings: [],
        hasStructuredData: true,
      });

      const result = await executeWorkflowWithCache(mockFalconApi, validParams);

      expect(result.success).toBe(true);
      expect(result.content).toContain('structured data');
    });

    it('should handle concurrent cache access safely', async () => {
      const { responseCache } = await import('../../../utils/cache');
      let getCalls = 0;
      vi.mocked(responseCache.get).mockImplementation(() => {
        getCalls++;
        return null;
      });

      const promise1 = executeWorkflowWithCache(mockFalconApi, validParams);
      const promise2 = executeWorkflowWithCache(mockFalconApi, validParams);

      await Promise.all([promise1, promise2]);

      expect(getCalls).toBe(2);
    });
  });
});
