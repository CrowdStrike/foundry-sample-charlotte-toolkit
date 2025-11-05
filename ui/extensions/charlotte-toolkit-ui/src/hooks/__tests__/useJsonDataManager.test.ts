import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ContextOption } from '../../types';
import { useJsonDataManager } from '../useJsonDataManager';

// Import the JsonContextData type for proper typing
type JsonContextData = {
  falcon_context: {
    socket_info: unknown;
    falcon_object: {
      full_data: unknown;
      data_structure: string[];
      incident: unknown;
      detection: unknown;
      available_entities: ContextOption[];
      entity_counts: {
        total_entities: number;
        domains: number;
        files: number;
        ips: number;
        fqdns: number;
      };
    };
  };
  request_data?: {
    timestamp: string;
    parameters: {
      query: string;
      model: string;
      temperature: number;
      stopWords: string[];
      jsonSchema: string;
      dataToInclude: string[];
      selectedContext: string;
    };
  };
  response_data?: {
    timestamp: string;
    execution_time_ms: number;
    success: boolean;
    from_cache: boolean;
    content: string | null;
    content_length: number;
    error: string | null;
    workflow_result: unknown;
  };
};

// Mock dependencies
vi.mock('../useCopyToClipboard', () => ({
  useCopyToClipboard: vi.fn(() => ({
    copyState: 'clipboard' as const,
    isSuccess: false,
    copyToClipboard: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock('../../utils/socketDetection', () => ({
  detectCurrentSocket: vi.fn(() => ({
    type: 'detection',
    id: 'test-id',
    timestamp: '2024-01-01T00:00:00Z',
  })),
}));

describe('useJsonDataManager', () => {
  const mockFalconData = {
    detection: { id: 'det-123', name: 'Test Detection' },
    incident: { id: 'inc-456', name: 'Test Incident' },
  };

  const mockContextOptions: ContextOption[] = [
    {
      type: 'ip',
      value: '192.168.1.1',
      displayName: 'IP: 192.168.1.1',
      queryTemplate: 'ip:{value}',
    },
  ];

  const mockContextCounts = {
    total: 5,
    domains: 2,
    files: 1,
    ips: 1,
    fqdns: 1,
  };

  const mockRequestParams = {
    query: 'Test query',
    model: 'gpt-4',
    temperature: 0.7,
    stopWords: ['stop'],
    jsonSchema: '{}',
    dataToInclude: ['detection'],
    selectedContext: 'all',
  };

  const mockResponseData = {
    executionEndTime: '2024-01-01T00:00:10Z',
    executionStartTime: '2024-01-01T00:00:00Z',
    success: true,
    content: 'Test response content',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null when no falconData', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: null,
        availableContextOptions: [],
        contextCounts: { total: 0, domains: 0, files: 0, ips: 0, fqdns: 0 },
      }),
    );

    expect(result.current.jsonContextData).toBeNull();
  });

  it('should initialize falcon context data', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    expect(result.current.jsonContextData).not.toBeNull();
    expect(result.current.jsonContextData?.falcon_context).toBeDefined();
  });

  it('should provide all required functions', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    expect(typeof result.current.initializeRequestData).toBe('function');
    expect(typeof result.current.updateRequestData).toBe('function');
    expect(typeof result.current.updateResponseData).toBe('function');
  });

  it('should initialize request data', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    let returned: JsonContextData | undefined;
    act(() => {
      returned = result.current.initializeRequestData(mockRequestParams);
    });

    expect(returned).toBeDefined();
    expect(result.current.jsonContextData?.request_data).toBeDefined();
  });

  it('should throw error when initializing without context', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: null,
        availableContextOptions: [],
        contextCounts: { total: 0, domains: 0, files: 0, ips: 0, fqdns: 0 },
      }),
    );

    expect(() => {
      act(() => {
        result.current.initializeRequestData(mockRequestParams);
      });
    }).toThrow('Cannot initialize request data: jsonContextData is null');
  });

  it('should update request data', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.initializeRequestData(mockRequestParams);
    });

    const updatedParams = { ...mockRequestParams, query: 'Updated query' };

    act(() => {
      result.current.updateRequestData(updatedParams);
    });

    expect(result.current.jsonContextData?.request_data?.parameters.query).toBe('Updated query');
  });

  it('should update response data', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.updateResponseData(mockResponseData);
    });

    expect(result.current.jsonContextData?.response_data).toBeDefined();
    expect(result.current.jsonContextData?.response_data?.content).toBe('Test response content');
  });

  it('should calculate execution time', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.updateResponseData(mockResponseData);
    });

    expect(result.current.jsonContextData?.response_data?.execution_time_ms).toBe(10000);
  });

  it('should provide copy states', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    expect(result.current.contextCopyState).toBe('clipboard');
    expect(result.current.requestCopyState).toBe('clipboard');
    expect(result.current.responseCopyState).toBe('clipboard');
    expect(result.current.rawResponseCopyState).toBe('clipboard');
  });

  it('should execute copyFalconContext', async () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    await act(async () => {
      await result.current.copyFalconContext();
    });

    expect(result.current.jsonContextData?.falcon_context).toBeDefined();
  });

  it('should execute copyRequestData', async () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.initializeRequestData(mockRequestParams);
    });

    await act(async () => {
      await result.current.copyRequestData();
    });

    expect(result.current.jsonContextData?.request_data).toBeDefined();
  });

  it('should execute copyResponseData with response data', async () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.updateResponseData(mockResponseData);
    });

    await act(async () => {
      await result.current.copyResponseData();
    });

    expect(result.current.jsonContextData?.response_data).toBeDefined();
  });

  it('should execute copyResponseData when no response data', async () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    await act(async () => {
      await result.current.copyResponseData();
    });

    expect(result.current.jsonContextData?.response_data).toBeUndefined();
  });

  it('should execute copyRawResponse', async () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: mockFalconData,
        availableContextOptions: mockContextOptions,
        contextCounts: mockContextCounts,
      }),
    );

    act(() => {
      result.current.updateResponseData(mockResponseData);
    });

    await act(async () => {
      await result.current.copyRawResponse();
    });

    expect(result.current.jsonContextData?.response_data?.content).toBe('Test response content');
  });

  it('should handle updateRequestData with null state', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: null,
        availableContextOptions: [],
        contextCounts: { total: 0, domains: 0, files: 0, ips: 0, fqdns: 0 },
      }),
    );

    act(() => {
      result.current.updateRequestData(mockRequestParams);
    });

    expect(result.current.jsonContextData).toBeNull();
  });

  it('should handle updateResponseData with null state', () => {
    const { result } = renderHook(() =>
      useJsonDataManager({
        falconData: null,
        availableContextOptions: [],
        contextCounts: { total: 0, domains: 0, files: 0, ips: 0, fqdns: 0 },
      }),
    );

    act(() => {
      result.current.updateResponseData(mockResponseData);
    });

    expect(result.current.jsonContextData).toBeNull();
  });
});
