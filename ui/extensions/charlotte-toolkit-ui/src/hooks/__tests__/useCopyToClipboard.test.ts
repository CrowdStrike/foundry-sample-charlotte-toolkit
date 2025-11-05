import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  let mockClipboard: { writeText: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Mock navigator.clipboard
    mockClipboard = {
      writeText: vi.fn(),
    };
    Object.assign(navigator, { clipboard: mockClipboard });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('should initialize with clipboard icon state', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should provide copyToClipboard function', () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.copyToClipboard).toBeDefined();
      expect(typeof result.current.copyToClipboard).toBe('function');
    });
  });

  describe('copyToClipboard function', () => {
    it('should copy text to clipboard successfully', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const testText = 'test content to copy';

      await act(async () => {
        await result.current.copyToClipboard(testText);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith(testText);
      expect(mockClipboard.writeText).toHaveBeenCalledTimes(1);
    });

    it('should change state to check-circle after successful copy', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test');
      });

      expect(result.current.copyState).toBe('check-circle');
      expect(result.current.isSuccess).toBe(true);
    });

    it('should revert to clipboard icon after default duration (2000ms)', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test');
      });

      expect(result.current.copyState).toBe('check-circle');

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should revert to clipboard icon after custom duration', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const customDuration = 5000;

      await act(async () => {
        await result.current.copyToClipboard('test', customDuration);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Should still be check-circle before custom duration
      await act(async () => {
        vi.advanceTimersByTime(4999);
      });
      expect(result.current.copyState).toBe('check-circle');

      // Should revert after custom duration
      await act(async () => {
        vi.advanceTimersByTime(1);
      });

      expect(result.current.copyState).toBe('clipboard');
    });

    it('should handle clipboard write failure silently', async () => {
      mockClipboard.writeText.mockRejectedValue(new Error('Clipboard write failed'));
      const { result } = renderHook(() => useCopyToClipboard());

      // Should not throw error
      await act(async () => {
        await result.current.copyToClipboard('test');
      });

      // Should remain in initial state after failure
      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should handle empty string copy', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('');
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith('');
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle multiple consecutive copy operations', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      // First copy
      await act(async () => {
        await result.current.copyToClipboard('first');
      });
      expect(result.current.copyState).toBe('check-circle');

      // Second copy before timeout
      await act(async () => {
        await result.current.copyToClipboard('second');
      });
      expect(result.current.copyState).toBe('check-circle');
      expect(mockClipboard.writeText).toHaveBeenCalledTimes(2);

      // Wait for timeout
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.copyState).toBe('clipboard');
    });

    it('should handle long text copy', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const longText = 'a'.repeat(10000);

      await act(async () => {
        await result.current.copyToClipboard(longText);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith(longText);
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle special characters in text', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const specialText = '!@#$%^&*()_+{}|:"<>?[]\\;\',./`~\n\t\r';

      await act(async () => {
        await result.current.copyToClipboard(specialText);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith(specialText);
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle Unicode text', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const unicodeText = '你好世界 🌍 مرحبا بالعالم';

      await act(async () => {
        await result.current.copyToClipboard(unicodeText);
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith(unicodeText);
      expect(result.current.copyState).toBe('check-circle');
    });
  });

  describe('isSuccess derived state', () => {
    it('should correctly reflect isSuccess based on copyState', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      // Initial state
      expect(result.current.isSuccess).toBe(false);

      // After successful copy
      await act(async () => {
        await result.current.copyToClipboard('test');
      });
      expect(result.current.isSuccess).toBe(true);

      // After timeout
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current.isSuccess).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero duration', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test', 0);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Should immediately revert with 0 duration
      await act(async () => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current.copyState).toBe('clipboard');
    });

    it('should handle very long duration', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());
      const longDuration = 999999999;

      await act(async () => {
        await result.current.copyToClipboard('test', longDuration);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Should still be check-circle after a reasonable time
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(result.current.copyState).toBe('check-circle');
    });

    it('should handle negative duration as positive', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test', -1000);
      });

      expect(result.current.copyState).toBe('check-circle');

      // Negative duration might behave like 0 or be ignored
      await act(async () => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current.copyState).toBe('clipboard');
    });
  });
});
