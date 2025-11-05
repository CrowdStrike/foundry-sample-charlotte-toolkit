import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useFalconApi } from '../useFalconApi';

// Mock the FalconApi
vi.mock('@crowdstrike/foundry-js', () => {
  return {
    default: vi.fn(() => ({
      connect: vi.fn(),
    })),
  };
});

describe('useFalconApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Clear console.error mock
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useFalconApi());

      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.falcon).toBeDefined();
      expect(typeof result.current.retry).toBe('function');
    });

    it('should create a single falcon instance', () => {
      const { result, rerender } = renderHook(() => useFalconApi());

      const firstFalcon = result.current.falcon;
      rerender();
      const secondFalcon = result.current.falcon;

      expect(firstFalcon).toBe(secondFalcon);
    });
  });

  describe('successful initialization', () => {
    it('should automatically initialize on mount', async () => {
      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.error).toBeNull();
    });

    it('should call falcon.connect during initialization', async () => {
      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.falcon.connect).toHaveBeenCalledTimes(1);
    });

    it('should set isInitialized to true after successful connection', async () => {
      const { result } = renderHook(() => useFalconApi());

      expect(result.current.isInitialized).toBe(false);

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });
    });
  });

  describe('error handling', () => {
    it('should handle connection errors', async () => {
      const errorMessage = 'Connection failed';
      const mockError = new Error(errorMessage);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: vi.fn().mockRejectedValueOnce(mockError),
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should handle non-Error exceptions', async () => {
      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: vi.fn().mockRejectedValueOnce('String error'),
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to initialize Falcon API');
      });

      expect(result.current.isInitialized).toBe(false);
    });

    it('should log errors to console', async () => {
      const mockError = new Error('Test error');
      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: vi.fn().mockRejectedValueOnce(mockError),
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to initialize Falcon API:', mockError);
      });
    });

    it('should reset error state before retry', async () => {
      const mockError = new Error('Initial error');
      const connectMock = vi.fn().mockRejectedValueOnce(mockError).mockResolvedValueOnce(undefined);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: connectMock,
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      // Wait for initial error
      await waitFor(() => {
        expect(result.current.error).toBe('Initial error');
      });

      // Retry
      await result.current.retry();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('retry functionality', () => {
    it('should successfully retry after initial failure', async () => {
      const connectMock = vi
        .fn()
        .mockRejectedValueOnce(new Error('First attempt failed'))
        .mockResolvedValueOnce(undefined);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: connectMock,
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      // Wait for initial failure
      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });

      expect(result.current.isInitialized).toBe(false);

      // Retry connection
      await result.current.retry();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
        expect(result.current.error).toBeNull();
      });
    });

    it('should be able to retry multiple times', async () => {
      const connectMock = vi
        .fn()
        .mockRejectedValueOnce(new Error('First attempt'))
        .mockRejectedValueOnce(new Error('Second attempt'))
        .mockResolvedValueOnce(undefined);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: connectMock,
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      // Wait for initial failure
      await waitFor(() => {
        expect(result.current.error).toBe('First attempt');
      });

      // First retry
      await result.current.retry();
      await waitFor(() => {
        expect(result.current.error).toBe('Second attempt');
      });

      // Second retry
      await result.current.retry();
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
        expect(result.current.error).toBeNull();
      });
    });
  });

  describe('state management', () => {
    it('should maintain state consistency during initialization', async () => {
      const { result } = renderHook(() => useFalconApi());

      // Initially not initialized, no error
      expect(result.current.isInitialized).toBe(false);
      expect(result.current.error).toBeNull();

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // After successful init, should be initialized with no error
      expect(result.current.error).toBeNull();
    });

    it('should maintain falcon instance reference across state updates', async () => {
      const { result } = renderHook(() => useFalconApi());

      const initialFalcon = result.current.falcon;

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.falcon).toBe(initialFalcon);
    });

    it('should preserve retry function reference', async () => {
      const { result } = renderHook(() => useFalconApi());

      const initialRetry = result.current.retry;

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.retry).toBe(initialRetry);
    });
  });

  describe('edge cases', () => {
    it('should handle rapid retry calls', async () => {
      const connectMock = vi.fn().mockResolvedValue(undefined);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: connectMock,
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Call retry multiple times rapidly
      const retries = [result.current.retry(), result.current.retry(), result.current.retry()];

      await Promise.all(retries);

      // Should still be initialized
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });
    });

    it('should handle empty error message', async () => {
      const mockError = new Error('');

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: vi.fn().mockRejectedValueOnce(mockError),
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe('');
      });
    });

    it('should handle very long error messages', async () => {
      const longMessage = 'Error: '.repeat(1000);
      const mockError = new Error(longMessage);

      vi.mocked(await import('@crowdstrike/foundry-js')).default = vi.fn(() => ({
        connect: vi.fn().mockRejectedValueOnce(mockError),
      })) as unknown as typeof import('@crowdstrike/foundry-js').default;

      const { result } = renderHook(() => useFalconApi());

      await waitFor(() => {
        expect(result.current.error).toBe(longMessage);
      });
    });
  });

  describe('return value structure', () => {
    it('should return all required properties', async () => {
      const { result } = renderHook(() => useFalconApi());

      expect(result.current).toHaveProperty('falcon');
      expect(result.current).toHaveProperty('isInitialized');
      expect(result.current).toHaveProperty('error');
      expect(result.current).toHaveProperty('retry');
    });

    it('should have correct types for return values', async () => {
      const { result } = renderHook(() => useFalconApi());

      expect(typeof result.current.isInitialized).toBe('boolean');
      expect(result.current.error === null || typeof result.current.error === 'string').toBe(true);
      expect(typeof result.current.retry).toBe('function');
      expect(result.current.falcon).toBeDefined();
    });
  });
});
