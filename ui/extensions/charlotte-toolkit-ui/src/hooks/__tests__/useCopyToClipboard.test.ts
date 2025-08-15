// src/hooks/__tests__/useCopyToClipboard.test.ts
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

// Mock navigator.clipboard
const mockWriteText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Initial State', () => {
    it('should return initial state correctly', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
      expect(typeof result.current.copyToClipboard).toBe('function');
    });
  });

  describe('Successful Copy Operations', () => {
    it('should handle successful copy operation', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(result.current.copyState).toBe('check-circle');
      expect(result.current.isSuccess).toBe(true);
    });

    it('should reset state after default timeout', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(result.current.copyState).toBe('check-circle');

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should reset state after custom timeout', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text', 5000);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Should not reset after default timeout
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(result.current.copyState).toBe('check-circle');

      // Should reset after custom timeout
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(result.current.copyState).toBe('clipboard');
    });
  });

  describe('Failed Copy Operations', () => {
    it('should handle copy failure gracefully', async () => {
      mockWriteText.mockRejectedValueOnce(new Error('Copy failed'));
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(mockWriteText).toHaveBeenCalledWith('test text');
      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should handle clipboard API not being available', async () => {
      // Temporarily remove clipboard
      const originalClipboard = navigator.clipboard;
      Object.assign(navigator, { clipboard: undefined });

      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);

      // Restore clipboard
      Object.assign(navigator, { clipboard: originalClipboard });
    });
  });

  describe('Multiple Copy Operations', () => {
    it('should handle multiple sequential copy operations', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      // First copy
      await act(async () => {
        await result.current.copyToClipboard('first text');
      });
      expect(result.current.copyState).toBe('check-circle');

      // Second copy before first timeout
      await act(async () => {
        await result.current.copyToClipboard('second text');
      });
      expect(result.current.copyState).toBe('check-circle');
      expect(mockWriteText).toHaveBeenCalledTimes(2);
      expect(mockWriteText).toHaveBeenLastCalledWith('second text');
    });

    it('should handle overlapping timeouts when multiple copies are triggered', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      // First copy with short timeout
      await act(async () => {
        await result.current.copyToClipboard('first text', 1000);
      });

      // Second copy with longer timeout before first expires
      await act(async () => {
        await result.current.copyToClipboard('second text', 3000);
      });

      // Advance past first timeout (will reset to clipboard due to first timeout)
      act(() => {
        jest.advanceTimersByTime(1500);
      });
      expect(result.current.copyState).toBe('clipboard');

      // State should remain clipboard even after second timeout duration
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(result.current.copyState).toBe('clipboard');
    });
  });

  describe('Text Content Handling', () => {
    it('should handle empty string', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('');
      });

      expect(mockWriteText).toHaveBeenCalledWith('');
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle multiline text', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      const multilineText = 'line 1\nline 2\nline 3';

      await act(async () => {
        await result.current.copyToClipboard(multilineText);
      });

      expect(mockWriteText).toHaveBeenCalledWith(multilineText);
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle special characters', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      const specialText = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./"';

      await act(async () => {
        await result.current.copyToClipboard(specialText);
      });

      expect(mockWriteText).toHaveBeenCalledWith(specialText);
      expect(result.current.copyState).toBe('check-circle');
    });
  });

  describe('Component Unmount', () => {
    it('should handle component unmount with pending timeout', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result, unmount } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(result.current.copyState).toBe('check-circle');

      // Unmount before timeout
      unmount();

      // This should not cause any errors
      act(() => {
        jest.advanceTimersByTime(2000);
      });
    });
  });

  describe('State Consistency', () => {
    it('should maintain consistent state relationship between copyState and isSuccess', async () => {
      mockWriteText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      // Initial state
      expect(result.current.copyState === 'clipboard' && !result.current.isSuccess).toBe(true);

      // After successful copy
      await act(async () => {
        await result.current.copyToClipboard('test');
      });
      expect(result.current.copyState === 'check-circle' && result.current.isSuccess).toBe(true);

      // After timeout
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(result.current.copyState === 'clipboard' && !result.current.isSuccess).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero timeout', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text', 0);
      });

      expect(result.current.copyState).toBe('check-circle');

      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(result.current.copyState).toBe('clipboard');
    });

    it('should handle negative timeout (should use default)', async () => {
      mockWriteText.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text', -1000);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Should still reset (setTimeout with negative value behaves like setTimeout(fn, 0))
      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(result.current.copyState).toBe('clipboard');
    });
  });
});
