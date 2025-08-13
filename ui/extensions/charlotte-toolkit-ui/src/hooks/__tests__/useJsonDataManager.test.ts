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

describe('useJsonDataManager', () => {
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
    jest.resetAllMocks();
    
    // Mock useCopyToClipboard to return the same value for all 4 calls
    mockUseCopyToClipboard.mockReturnValue({
      copyState: 'clipboard' as const,
      copyToClipboard: mockCopyToClipboard,
      isSuccess: false,
    });

    mockDetectCurrentSocket.mockReturnValue(mockSocketInfo);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
  });

  describe('Basic Functionality', () => {
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
      expect(result.current.jsonContextData?.request_data?.parameters).toEqual(mockRequestParams);
    });

    it('should update request data without changing timestamp', () => {
      const { result } = renderHook(() => useJsonDataManager(mockProps));

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
      expect(responseData?.execution_time_ms).toBe(2500);
      expect(responseData?.success).toBe(true);
      expect(responseData?.content).toBe('test response content');
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
  });
});
