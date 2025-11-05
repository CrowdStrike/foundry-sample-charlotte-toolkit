import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCopyManager } from '../useCopyManager';

// Mock the useCopyToClipboard hook
vi.mock('../useCopyToClipboard', () => ({
  useCopyToClipboard: vi.fn(),
}));

// Mock the copyUtils and iocUtils
vi.mock('../../utils/copyUtils', async () => {
  const actual = await vi.importActual('../../utils/copyUtils');
  return {
    ...actual,
    formatForCopy: vi.fn(),
  };
});

vi.mock('../../utils/security/iocUtils', () => ({
  parseStructuredResponse: vi.fn(),
}));

import { COPY_OPTIONS, formatForCopy } from '../../utils/copyUtils';
import { parseStructuredResponse } from '../../utils/security/iocUtils';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyManager', () => {
  let mockCopyToClipboard: ReturnType<typeof vi.fn>;
  let mockUseCopyToClipboard: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCopyToClipboard = vi.fn();
    mockUseCopyToClipboard = vi.fn().mockReturnValue({
      copyState: 'clipboard',
      isSuccess: false,
      copyToClipboard: mockCopyToClipboard,
    });
    (useCopyToClipboard as ReturnType<typeof vi.fn>).mockImplementation(mockUseCopyToClipboard);
    vi.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with clipboard state', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
    });

    it('should provide handleCopyFormat function', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current.handleCopyFormat).toBeDefined();
      expect(typeof result.current.handleCopyFormat).toBe('function');
    });

    it('should provide copyOptions', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current.copyOptions).toBe(COPY_OPTIONS);
      expect(Array.isArray(result.current.copyOptions)).toBe(true);
    });
  });

  describe('handleCopyFormat function', () => {
    it('should parse structured response', async () => {
      const responseText = '{"key": "value"}';
      const mockParsedResponse = { key: 'value' };
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(mockParsedResponse);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted text');

      const { result } = renderHook(() => useCopyManager({ responseText, jsonContextData: {} }));

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(parseStructuredResponse).toHaveBeenCalledWith(responseText);
    });

    it('should call formatForCopy with correct parameters for json format', async () => {
      const responseText = 'test response';
      const jsonContextData = { some: 'data' };
      const mockParsedResponse = { parsed: 'data' };

      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(mockParsedResponse);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted json');

      const { result } = renderHook(() => useCopyManager({ responseText, jsonContextData }));

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(formatForCopy).toHaveBeenCalledWith(
        'json',
        responseText,
        jsonContextData,
        mockParsedResponse,
      );
    });

    it('should call formatForCopy with correct parameters for markdown format', async () => {
      const responseText = 'test response';
      const mockParsedResponse = { parsed: 'data' };

      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(mockParsedResponse);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted markdown');

      const { result } = renderHook(() =>
        useCopyManager({ responseText, jsonContextData: undefined }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(formatForCopy).toHaveBeenCalledWith(
        'markdown',
        responseText,
        undefined,
        mockParsedResponse,
      );
    });

    it('should call formatForCopy with correct parameters for plaintext format', async () => {
      const responseText = 'test response';
      const mockParsedResponse = null;

      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(mockParsedResponse);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted plaintext');

      const { result } = renderHook(() => useCopyManager({ responseText, jsonContextData: {} }));

      await act(async () => {
        await result.current.handleCopyFormat('plaintext');
      });

      expect(formatForCopy).toHaveBeenCalledWith('plaintext', responseText, {}, mockParsedResponse);
    });

    it('should call copyToClipboard with formatted text', async () => {
      const formattedText = 'formatted output';
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue(formattedText);

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(formattedText);
    });

    it('should handle empty response text', async () => {
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: '', jsonContextData: {} }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith('');
    });

    it('should handle null parsed response', async () => {
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted text');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(formatForCopy).toHaveBeenCalledWith('markdown', 'test', {}, null);
    });
  });

  describe('copy state management', () => {
    it('should reflect copy state from useCopyToClipboard', () => {
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        isSuccess: true,
        copyToClipboard: mockCopyToClipboard,
      });

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current.copyState).toBe('check-circle');
      expect(result.current.isSuccess).toBe(true);
    });

    it('should update state when useCopyToClipboard state changes', () => {
      const { result, rerender } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current.copyState).toBe('clipboard');

      // Simulate state change
      mockUseCopyToClipboard.mockReturnValue({
        copyState: 'check-circle',
        isSuccess: true,
        copyToClipboard: mockCopyToClipboard,
      });

      rerender();

      expect(result.current.copyState).toBe('check-circle');
      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe('memoization and dependencies', () => {
    it('should memoize handleCopyFormat with same dependencies', () => {
      const props = { responseText: 'test', jsonContextData: {} };
      const { result, rerender } = renderHook((p) => useCopyManager(p), { initialProps: props });

      const firstHandler = result.current.handleCopyFormat;

      rerender(props);

      expect(result.current.handleCopyFormat).toBe(firstHandler);
    });

    it('should create new handleCopyFormat when responseText changes', () => {
      const { result, rerender } = renderHook((props) => useCopyManager(props), {
        initialProps: { responseText: 'test1', jsonContextData: {} },
      });

      const firstHandler = result.current.handleCopyFormat;

      rerender({ responseText: 'test2', jsonContextData: {} });

      expect(result.current.handleCopyFormat).not.toBe(firstHandler);
    });

    it('should create new handleCopyFormat when jsonContextData changes', () => {
      const { result, rerender } = renderHook((props) => useCopyManager(props), {
        initialProps: { responseText: 'test', jsonContextData: { key: 'value1' } },
      });

      const firstHandler = result.current.handleCopyFormat;

      rerender({ responseText: 'test', jsonContextData: { key: 'value2' } });

      expect(result.current.handleCopyFormat).not.toBe(firstHandler);
    });
  });

  describe('integration with formatForCopy', () => {
    it('should handle all copy format options', async () => {
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue({ data: 'parsed' });
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      // Test each format
      for (const format of ['json', 'markdown', 'plaintext'] as const) {
        await act(async () => {
          await result.current.handleCopyFormat(format);
        });

        expect(formatForCopy).toHaveBeenCalledWith(format, 'test', {}, { data: 'parsed' });
      }

      expect(formatForCopy).toHaveBeenCalledTimes(3);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined jsonContextData', async () => {
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('text');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: undefined }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(formatForCopy).toHaveBeenCalledWith('json', 'test', undefined, null);
    });

    it('should handle complex jsonContextData', async () => {
      const complexData = {
        nested: {
          deep: {
            structure: ['with', 'arrays'],
          },
        },
        numbers: 123,
        booleans: true,
      };

      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue({ parsed: 'data' });
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue('formatted');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: complexData }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(formatForCopy).toHaveBeenCalledWith('json', 'test', complexData, { parsed: 'data' });
    });

    it('should handle very long response text', async () => {
      const longText = 'a'.repeat(100000);
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue(longText);

      const { result } = renderHook(() =>
        useCopyManager({ responseText: longText, jsonContextData: {} }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('plaintext');
      });

      expect(mockCopyToClipboard).toHaveBeenCalledWith(longText);
    });

    it('should handle special characters in response', async () => {
      const specialText = '```javascript\nconst x = "test";\n```\n**Bold** _italic_';
      (parseStructuredResponse as ReturnType<typeof vi.fn>).mockReturnValue(null);
      (formatForCopy as ReturnType<typeof vi.fn>).mockReturnValue(specialText);

      const { result } = renderHook(() =>
        useCopyManager({ responseText: specialText, jsonContextData: {} }),
      );

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(formatForCopy).toHaveBeenCalledWith('markdown', specialText, {}, null);
    });
  });

  describe('return value structure', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(result.current).toHaveProperty('copyState');
      expect(result.current).toHaveProperty('isSuccess');
      expect(result.current).toHaveProperty('handleCopyFormat');
      expect(result.current).toHaveProperty('copyOptions');
    });

    it('should return copyOptions as array', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(Array.isArray(result.current.copyOptions)).toBe(true);
      expect(result.current.copyOptions.length).toBeGreaterThan(0);
    });

    it('should return copyState as valid icon name', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(['clipboard', 'check-circle']).toContain(result.current.copyState);
    });

    it('should return isSuccess as boolean', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test', jsonContextData: {} }),
      );

      expect(typeof result.current.isSuccess).toBe('boolean');
    });
  });
});
