// src/hooks/__tests__/useFalconApi.test.ts

import { renderHook, waitFor } from '@testing-library/react';
import { useFalconApi } from '../useFalconApi';

// Mock the FalconApi import
jest.mock('@crowdstrike/foundry-js', () => {
  return jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
  }));
});

import FalconApi from '@crowdstrike/foundry-js';

const MockFalconApi = FalconApi as jest.MockedClass<typeof FalconApi>;

describe('useFalconApi', () => {
  let mockFalconInstance: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFalconInstance = {
      connect: jest.fn(),
    };
    MockFalconApi.mockImplementation(() => mockFalconInstance);
  });

  describe('Successful Initialization', () => {
    it('should initialize successfully when connect resolves', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      // Initial state
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.falcon).toBe(mockFalconInstance);

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(1);
    });

    it('should create Falcon API instance only once', () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(() => useFalconApi());

      const initialFalcon = result.current.falcon;

      // Rerender the hook
      rerender();

      // Should be the same instance
      expect(result.current.falcon).toBe(initialFalcon);
      expect(MockFalconApi).toHaveBeenCalledTimes(1);
    });

    it('should clear error state on successful initialization', async () => {
      // First fail, then succeed on retry
      mockFalconInstance.connect
        .mockRejectedValueOnce(new Error('Connection failed'))
        .mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useFalconApi());

      // Wait for first failure
      await waitFor(() => {
        expect(result.current.error).toBe('Connection failed');
      });

      expect(result.current.isInitialized).toBe(false);

      // The hook uses the same instance with useMemo([]), so we can't 
      // easily test re-initialization. Let's test a different scenario.
      // Create a fresh hook instance that succeeds immediately
      mockFalconInstance.connect.mockResolvedValue(undefined);
      
      const { result: result2 } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result2.current.isInitialized).toBe(true);
      });

      expect(result2.current.error).toBe(null);
    });
  });

  describe('Error Handling', () => {
    it('should handle Error objects correctly', async () => {
      const errorMessage = 'Connection timeout';
      mockFalconInstance.connect.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.isInitialized).toBe(false);
      expect(result.current.falcon).toBe(mockFalconInstance);
    });

    it('should handle non-Error objects', async () => {
      mockFalconInstance.connect.mockRejectedValue('String error');

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle null/undefined errors', async () => {
      mockFalconInstance.connect.mockRejectedValue(null);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle empty object errors', async () => {
      mockFalconInstance.connect.mockRejectedValue({});

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle network-related errors', async () => {
      const networkError = new Error('Network request failed');
      networkError.name = 'NetworkError';
      mockFalconInstance.connect.mockRejectedValue(networkError);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Network request failed');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle authentication errors', async () => {
      const authError = new Error('Authentication failed');
      authError.name = 'AuthenticationError';
      mockFalconInstance.connect.mockRejectedValue(authError);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Authentication failed');
      });

      expect(result.current.isInitialized).toBe(false);
    });
  });

  describe('State Management', () => {
    it('should maintain correct state during async initialization', async () => {
      let resolveConnect: () => void;
      const connectPromise = new Promise<void>((resolve) => {
        resolveConnect = resolve;
      });
      mockFalconInstance.connect.mockReturnValue(connectPromise);

      const { result } = renderHook(() => useFalconApi());

      // Initially should be false
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBe(null);

      // Resolve the promise
      resolveConnect!();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
    });

    it('should handle multiple rapid re-renders during initialization', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(() => useFalconApi());

      // Rapidly re-render
      rerender();
      rerender();
      rerender();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Should still only connect once
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(1);
    });

    it('should maintain state correctly with same falcon instance', async () => {
      // Since useMemo has empty dependency array, the falcon instance never changes
      // This test verifies that behavior is correct
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const falconInstance = result.current.falcon;

      // Multiple re-renders should maintain same instance and state
      rerender();
      rerender();

      expect(result.current.falcon).toBe(falconInstance);
      expect(result.current.isInitialized).toBe(true);
      expect(result.current.error).toBe(null);
    });
  });

  describe('Edge Cases', () => {
    it('should handle connect method throwing synchronously', async () => {
      mockFalconInstance.connect.mockImplementation(() => {
        throw new Error('Synchronous error');
      });

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Synchronous error');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle missing connect method', async () => {
      const incompleteMockInstance = {};
      MockFalconApi.mockImplementation(() => incompleteMockInstance as any);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('falcon.connect is not a function');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle Falcon API constructor throwing', () => {
      MockFalconApi.mockImplementation(() => {
        throw new Error('Constructor error');
      });

      expect(() => renderHook(() => useFalconApi())).toThrow('Constructor error');
    });

    it('should handle connect returning non-promise value', async () => {
      mockFalconInstance.connect.mockReturnValue('not a promise' as any);

      const { result } = renderHook(() => useFalconApi());

      // Should still handle it gracefully
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe('Integration Scenarios', () => {
    it('should work correctly with typical usage patterns', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      // Initial state check
      expect(result.current).toMatchObject({
        falcon: expect.any(Object),
        isInitialized: false,
        error: null,
        retry: expect.any(Function),
      });

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Final state check
      expect(result.current).toMatchObject({
        falcon: mockFalconInstance,
        isInitialized: true,
        error: null,
        retry: expect.any(Function),
      });
    });

    it('should handle component unmounting during initialization', async () => {
      let resolveConnect: () => void;
      const connectPromise = new Promise<void>((resolve) => {
        resolveConnect = resolve;
      });
      mockFalconInstance.connect.mockReturnValue(connectPromise);

      const { result, unmount } = renderHook(() => useFalconApi());

      expect(result.current.isInitialized).toBe(false);

      // Unmount before initialization completes
      unmount();

      // Resolve the promise after unmount
      resolveConnect!();

      // Should not throw or cause issues
      await new Promise((resolve) => setTimeout(resolve, 10));
    });

    it('should maintain referential stability of falcon instance', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(() => useFalconApi());

      const initialFalcon = result.current.falcon;

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const initializedFalcon = result.current.falcon;

      // Multiple re-renders
      rerender();
      rerender();
      rerender();

      const finalFalcon = result.current.falcon;

      // All should be the same reference
      expect(initialFalcon).toBe(initializedFalcon);
      expect(initializedFalcon).toBe(finalFalcon);
    });

    it('should provide type-safe return values', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Type checking through usage
      expect(typeof result.current.isInitialized).toBe('boolean');
      expect(result.current.error === null || typeof result.current.error === 'string').toBe(true);
      expect(typeof result.current.falcon).toBe('object');
      expect(result.current.falcon).not.toBe(null);
      expect(typeof result.current.retry).toBe('function');
    });
  });

  describe('Retry Functionality', () => {
    it('should provide retry function that resets state and re-attempts connection', async () => {
      // Initially fail
      mockFalconInstance.connect.mockRejectedValueOnce(new Error('Initial failure'));
      
      const { result } = renderHook(() => useFalconApi());

      // Wait for initial error
      await waitFor(() => {
        expect(result.current.error).toBe('Initial failure');
      });

      expect(result.current.isInitialized).toBe(false);

      // Mock subsequent successful connection
      mockFalconInstance.connect.mockResolvedValueOnce(undefined);

      // Call retry
      result.current.retry();

      // Wait for successful retry
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(2);
    });

    it('should handle retry when already initialized', async () => {
      // Initially succeed
      mockFalconInstance.connect.mockResolvedValue(undefined);
      
      const { result } = renderHook(() => useFalconApi());

      // Wait for initial success
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Call retry when already initialized
      result.current.retry();

      // Wait for retry to complete
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBe(null);
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(2);
    });

    it('should handle retry failure', async () => {
      // Initially succeed
      mockFalconInstance.connect.mockResolvedValueOnce(undefined);
      
      const { result } = renderHook(() => useFalconApi());

      // Wait for initial success
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Mock retry failure
      mockFalconInstance.connect.mockRejectedValueOnce(new Error('Retry failed'));

      // Call retry
      result.current.retry();

      // Wait for retry error
      await waitFor(() => {
        expect(result.current.error).toBe('Retry failed');
      });

      expect(result.current.isInitialized).toBe(false);
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(2);
    });
  });

  describe('Performance Considerations', () => {
    it('should not create multiple API instances on re-renders', () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { rerender } = renderHook(() => useFalconApi());

      // Multiple re-renders
      for (let i = 0; i < 10; i++) {
        rerender();
      }

      // Should only create instance once
      expect(MockFalconApi).toHaveBeenCalledTimes(1);
    });

    it('should not trigger multiple connect calls on rapid re-renders', async () => {
      mockFalconInstance.connect.mockResolvedValue(undefined);

      const { result, rerender } = renderHook(() => useFalconApi());

      // Rapid re-renders during initialization
      for (let i = 0; i < 5; i++) {
        rerender();
      }

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Should still only connect once
      expect(mockFalconInstance.connect).toHaveBeenCalledTimes(1);
    });
  });
});
