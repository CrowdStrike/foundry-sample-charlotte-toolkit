// src/hooks/__tests__/useJsonDataManager.test.ts

import { renderHook, act } from '@testing-library/react';
import { useJsonDataManager } from '../useJsonDataManager';
import type { ContextOption } from '../../types';

// Mock the dependencies
jest.mock('../useCopyToClipboard', () => ({
  useCopyToClipboard: jest.fn(),
}));

jest.mock('../../utils/socketDetection', () => ({
  detectCurrentSocket: jest.fn(),
}));

import { useCopyToClipboard } from '../useCopyToClipboard';
import { detectCurrentSocket } from '../../utils/socketDetection';

const mockUseCopyToClipboard = useCopyToClipboard as jest.MockedFunction<typeof useCopyToClipboard>;
const mockDetectCurrentSocket = detectCurrentSocket as jest.MockedFunction<typeof detectCurrentSocket>;

describe.skip('useJsonDataManager', () => {
  const mockCopyToClipboard = jest.fn();
  const mockSocketInfo = {
    socket_type: 'incident' as const,
    socket_id: 'inc_123',
    socket_name: 'Test Incident',
  };

  const mockProps = {
    falconData: {
      incident: {
        id: 'inc_123',
        name: 'Test Incident',
        status: 'new'
      }
    },
    availableContextOptions: [
      {
        value: 'test.com',
        displayName: 'test.com',
        type: 'domain' as const,
        queryTemplate: 'analyze {value}',
      }
    ] as ContextOption[],
    contextCounts: {
      total: 1,
      domains: 1,
      files: 0,
      ips: 0,
      fqdns: 0,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock useCopyToClipboard to return the same value for all 4 calls
    mockUseCopyToClipboard.mockReturnValue({
      copyState: 'clipboard' as const,
      copyToClipboard: mockCopyToClipboard,
      isSuccess: false,
    });

    mockDetectCurrentSocket.mockReturnValue(mockSocketInfo);
  });

  describe('Initialization', () => {
    it('should initialize with null jsonContextData when no falconData', () => {
      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          falconData: null,
        })
      );

      expect(result.current.jsonContextData).toBeNull();
    });

    it('should initialize jsonContextData when falconData is provided', () => {
      const { result } = renderHook(() =>
        useJsonDataManager(mockProps)
      );

      expect(result.current.jsonContextData).not.toBeNull();
      expect(result.current.jsonContextData?.falcon_context.socket_info).toEqual(mockSocketInfo);
      expect(result.current.jsonContextData?.falcon_context.falcon_object.full_data).toEqual(mockProps.falconData);
      expect(result.current.jsonContextData?.falcon_context.falcon_object.available_entities).toEqual(mockProps.availableContextOptions);
    });

    it('should update jsonContextData when falconData changes', () => {
      const { result, rerender } = renderHook(
        ({ falconData, availableContextOptions, contextCounts }) =>
          useJsonDataManager({ falconData, availableContextOptions, contextCounts }),
        { initialProps: mockProps }
      );

      const initialData = result.current.jsonContextData;

      const newFalconData = {
        detection: {
          id: 'det_456',
          name: 'Test Detection',
        }
      };

      rerender({
        ...mockProps,
        falconData: newFalconData,
      });

      expect(result.current.jsonContextData).not.toBe(initialData);
      expect(result.current.jsonContextData?.falcon_context.falcon_object.full_data).toEqual(newFalconData);
    });

    it('should call detectCurrentSocket with falconData', () => {
      renderHook(() => useJsonDataManager(mockProps));

      expect(mockDetectCurrentSocket).toHaveBeenCalledWith(mockProps.falconData);
    });

    it('should return correct copy states', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      expect(result.current.contextCopyState).toBe('clipboard');
      expect(result.current.requestCopyState).toBe('clipboard');
      expect(result.current.responseCopyState).toBe('clipboard');
      expect(result.current.rawResponseCopyState).toBe('clipboard');
    });
  });

  describe('Request Data Management', () => {
    const mockRequestParams = {
      query: 'test query',
      model: 'gpt-4',
      temperature: 0.5,
      stopWords: ['stop'],
      jsonSchema: '{}',
      dataToInclude: ['incident'],
      selectedContext: 'test.com',
    };

    it('should initialize request data and return updated context', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      let updatedContext;
      act(() => {
        updatedContext = result.current.initializeRequestData(mockRequestParams);
      });

      expect(updatedContext).toBeDefined();
      expect(updatedContext?.request_data?.parameters).toEqual(mockRequestParams);
      expect(updatedContext?.request_data?.timestamp).toBeDefined();
      expect(result.current.jsonContextData?.request_data?.parameters).toEqual(mockRequestParams);
    });

    it('should update request data without changing timestamp', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      // Initialize first
      act(() => {
        result.current.initializeRequestData(mockRequestParams);
      });

      const originalTimestamp = result.current.jsonContextData?.request_data?.timestamp;

      const updatedParams = { ...mockRequestParams, query: 'updated query' };

      act(() => {
        result.current.updateRequestData(updatedParams);
      });

      expect(result.current.jsonContextData?.request_data?.parameters.query).toBe('updated query');
      expect(result.current.jsonContextData?.request_data?.timestamp).toBe(originalTimestamp);
    });

    it('should handle updateRequestData when no previous request data exists', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      act(() => {
        result.current.updateRequestData(mockRequestParams);
      });

      expect(result.current.jsonContextData?.request_data?.parameters).toEqual(mockRequestParams);
      expect(result.current.jsonContextData?.request_data?.timestamp).toBe('');
    });
  });

  describe('Response Data Management', () => {
    const mockResponseData = {
      executionStartTime: '2024-01-01T10:00:00.000Z',
      executionEndTime: '2024-01-01T10:00:02.500Z',
      success: true,
      fromCache: false,
      content: 'test response content',
      workflowResult: { result: 'success' },
    };

    it('should update response data with calculated execution time', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      act(() => {
        result.current.updateResponseData(mockResponseData);
      });

      const responseData = result.current.jsonContextData?.response_data;
      expect(responseData?.timestamp).toBe(mockResponseData.executionEndTime);
      expect(responseData?.execution_time_ms).toBe(2500); // 2.5 seconds
      expect(responseData?.success).toBe(true);
      expect(responseData?.from_cache).toBe(false);
      expect(responseData?.content).toBe('test response content');
      expect(responseData?.content_length).toBe(21);
      expect(responseData?.workflow_result).toEqual({ result: 'success' });
    });

    it('should handle response data with minimal fields', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      const minimalResponseData = {
        executionStartTime: '2024-01-01T10:00:00.000Z',
        executionEndTime: '2024-01-01T10:00:01.000Z',
        success: false,
      };

      act(() => {
        result.current.updateResponseData(minimalResponseData);
      });

      const responseData = result.current.jsonContextData?.response_data;
      expect(responseData?.execution_time_ms).toBe(1000);
      expect(responseData?.success).toBe(false);
      expect(responseData?.from_cache).toBe(false);
      expect(responseData?.content).toBeNull();
      expect(responseData?.content_length).toBe(0);
      expect(responseData?.error).toBeNull();
    });

    it('should handle error response data', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      const errorResponseData = {
        executionStartTime: '2024-01-01T10:00:00.000Z',
        executionEndTime: '2024-01-01T10:00:01.000Z',
        success: false,
        error: 'Test error message',
      };

      act(() => {
        result.current.updateResponseData(errorResponseData);
      });

      const responseData = result.current.jsonContextData?.response_data;
      expect(responseData?.success).toBe(false);
      expect(responseData?.error).toBe('Test error message');
    });

    it('should not update response data when jsonContextData is null', () => {
      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          falconData: null,
        })
      );

      act(() => {
        result.current.updateResponseData(mockResponseData);
      });

      expect(result.current.jsonContextData).toBeNull();
    });
  });

  describe('Copy Operations', () => {
    beforeEach(() => {
      mockCopyToClipboard.mockResolvedValue(undefined);
    });

    it('should copy falcon context data', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      await act(async () => {
        await result.current.copyFalconContext();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        JSON.stringify(result.current.jsonContextData?.falcon_context, null, 2)
      );
    });

    it('should copy request data', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      const requestParams = {
        query: 'test',
        model: 'gpt-4',
        temperature: 0.5,
        stopWords: [],
        jsonSchema: '{}',
        dataToInclude: [],
        selectedContext: '',
      };

      act(() => {
        result.current.initializeRequestData(requestParams);
      });

      await act(async () => {
        await result.current.copyRequestData();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        JSON.stringify(result.current.jsonContextData?.request_data, null, 2)
      );
    });

    it('should copy response metadata without content', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      const responseData = {
        executionStartTime: '2024-01-01T10:00:00.000Z',
        executionEndTime: '2024-01-01T10:00:01.000Z',
        success: true,
        content: 'large content that should be excluded',
      };

      act(() => {
        result.current.updateResponseData(responseData);
      });

      await act(async () => {
        await result.current.copyResponseData();
      });

      const expectedMetadata = {
        timestamp: responseData.executionEndTime,
        execution_time_ms: 1000,
        success: true,
        from_cache: false,
        content_length: 40,
        error: null,
        workflow_result: undefined,
      };

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        JSON.stringify(expectedMetadata, null, 2)
      );
    });

    it('should copy empty object when no response data exists', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      await act(async () => {
        await result.current.copyResponseData();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        JSON.stringify({}, null, 2)
      );
    });

    it('should copy raw response content', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      const responseData = {
        executionStartTime: '2024-01-01T10:00:00.000Z',
        executionEndTime: '2024-01-01T10:00:01.000Z',
        success: true,
        content: 'raw response content',
      };

      act(() => {
        result.current.updateResponseData(responseData);
      });

      await act(async () => {
        await result.current.copyRawResponse();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith('raw response content');
    });

    it('should copy empty string when no response content exists', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      await act(async () => {
        await result.current.copyRawResponse();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle falconData with both incident and detection', () => {
      const complexFalconData = {
        incident: { id: 'inc_123', name: 'Test Incident' },
        detection: { id: 'det_456', name: 'Test Detection' },
      };

      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          falconData: complexFalconData,
        })
      );

      const falconObject = result.current.jsonContextData?.falcon_context.falcon_object;
      expect(falconObject?.incident).toEqual(complexFalconData.incident);
      expect(falconObject?.detection).toEqual(complexFalconData.detection);
    });

    it('should handle falconData with missing incident/detection', () => {
      const minimalFalconData = {
        host: { id: 'host_789', hostname: 'test-host' },
      };

      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          falconData: minimalFalconData,
        })
      );

      const falconObject = result.current.jsonContextData?.falcon_context.falcon_object;
      expect(falconObject?.incident).toBeNull();
      expect(falconObject?.detection).toBeNull();
      expect(falconObject?.full_data).toEqual(minimalFalconData);
    });

    it('should handle empty contextCounts', () => {
      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          contextCounts: {
            total: 0,
            domains: 0,
            files: 0,
            ips: 0,
            fqdns: 0,
          },
        })
      );

      const entityCounts = result.current.jsonContextData?.falcon_context.falcon_object.entity_counts;
      expect(entityCounts?.total_entities).toBe(0);
      expect(entityCounts?.domains).toBe(0);
    });

    it('should handle copy operations with null jsonContextData', async () => {
      const { result } = renderHook(() =>
        useJsonDataManager({
          ...mockProps,
          falconData: null,
        })
      );

      await act(async () => {
        await result.current.copyFalconContext();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(
        JSON.stringify({}, null, 2)
      );
    });
  });

  describe('Integration Scenarios', () => {
    it('should handle complete workflow: initialize → request → response → copy', async () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

      // Initialize request
      const requestParams = {
        query: 'analyze this data',
        model: 'gpt-4',
        temperature: 0.7,
        stopWords: ['end'],
        jsonSchema: '{"type": "object"}',
        dataToInclude: ['incident', 'detection'],
        selectedContext: 'test.com',
      };

      act(() => {
        result.current.initializeRequestData(requestParams);
      });

      // Update response
      const responseData = {
        executionStartTime: '2024-01-01T10:00:00.000Z',
        executionEndTime: '2024-01-01T10:00:03.000Z',
        success: true,
        content: 'Analysis complete',
        workflowResult: { status: 'completed' },
      };

      act(() => {
        result.current.updateResponseData(responseData);
      });

      // Verify complete data structure
      const jsonData = result.current.jsonContextData;
      expect(jsonData?.falcon_context).toBeDefined();
      expect(jsonData?.request_data?.parameters).toEqual(requestParams);
      expect(jsonData?.response_data?.success).toBe(true);
      expect(jsonData?.response_data?.execution_time_ms).toBe(3000);

      // Test all copy operations
      await act(async () => {
        await result.current.copyFalconContext();
        await result.current.copyRequestData();
        await result.current.copyResponseData();
        await result.current.copyRawResponse();
      });

      expect(mockCopyToClipboard).toHaveBeenCalledTimes(4);
    });

    it('should maintain referential stability for callbacks', () => {
      const { result, rerender } = renderHook(() => useJsonDataManager(mockProps));

      const initialCallbacks = {
        initializeRequestData: result.current.initializeRequestData,
        updateRequestData: result.current.updateRequestData,
        updateResponseData: result.current.updateResponseData,
        copyFalconContext: result.current.copyFalconContext,
        copyRequestData: result.current.copyRequestData,
        copyResponseData: result.current.copyResponseData,
        copyRawResponse: result.current.copyRawResponse,
      };

      // Rerender with same props
      rerender();

      // Callbacks should be stable
      expect(result.current.updateRequestData).toBe(initialCallbacks.updateRequestData);
      expect(result.current.updateResponseData).toBe(initialCallbacks.updateResponseData);
    });
  });
});
