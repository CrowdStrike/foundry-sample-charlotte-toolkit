// src/hooks/__tests__/useCopyManager.test.ts

import { renderHook, act } from '@testing-library/react';
import { useCopyManager } from '../useCopyManager';
import { CopyFormat } from '../../utils/copyUtils';

// Mock the dependencies
jest.mock('../useCopyToClipboard', () => ({
  useCopyToClipboard: jest.fn(),
}));

jest.mock('../../utils/copyUtils', () => ({
  COPY_OPTIONS: [
    { value: 'raw', label: 'Raw Text' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
  ],
  formatForCopy: jest.fn(),
}));

jest.mock('../../utils/security/iocUtils', () => ({
  parseStructuredResponse: jest.fn(),
}));

import { useCopyToClipboard } from '../useCopyToClipboard';
import { formatForCopy, COPY_OPTIONS } from '../../utils/copyUtils';
import { parseStructuredResponse } from '../../utils/security/iocUtils';

const mockUseCopyToClipboard = useCopyToClipboard as jest.MockedFunction<typeof useCopyToClipboard>;
const mockFormatForCopy = formatForCopy as jest.MockedFunction<typeof formatForCopy>;
const mockParseStructuredResponse = parseStructuredResponse as jest.MockedFunction<typeof parseStructuredResponse>;

describe('useCopyManager', () => {
  const mockCopyToClipboard = jest.fn();
  const mockUseCopyToClipboardReturn = {
    copyState: 'clipboard' as const,
    isSuccess: false,
    copyToClipboard: mockCopyToClipboard,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCopyToClipboard.mockReturnValue(mockUseCopyToClipboardReturn);
    mockFormatForCopy.mockReturnValue('formatted text');
    mockParseStructuredResponse.mockReturnValue({ parsed: true });
  });

  describe('Basic Functionality', () => {
    it('should initialize with correct default values', () => {
      const responseText = 'Test response';
      const { result } = renderHook(() => 
        useCopyManager({ responseText })
      );

      expect(result.current.copyState).toBe('clipboard');
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.copyOptions).toEqual(COPY_OPTIONS);
      expect(typeof result.current.handleCopyFormat).toBe('function');
    });

    it('should pass through copyState from useCopyToClipboard', () => {
      const modifiedReturn = {
        ...mockUseCopyToClipboardReturn,
        copyState: 'check-circle' as const,
      };
      mockUseCopyToClipboard.mockReturnValue(modifiedReturn);

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test' })
      );

      expect(result.current.copyState).toBe('check-circle');
    });

    it('should pass through isSuccess from useCopyToClipboard', () => {
      const modifiedReturn = {
        ...mockUseCopyToClipboardReturn,
        isSuccess: true,
      };
      mockUseCopyToClipboard.mockReturnValue(modifiedReturn);

      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test' })
      );

      expect(result.current.isSuccess).toBe(true);
    });

    it('should provide COPY_OPTIONS as copyOptions', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test' })
      );

      expect(result.current.copyOptions).toBe(COPY_OPTIONS);
    });
  });

  describe('handleCopyFormat', () => {
    it('should handle raw format copy', async () => {
      const responseText = 'Test response text';
      const jsonContextData = { context: 'test' };
      const parsedResponse = { parsed: 'response' };
      
      mockParseStructuredResponse.mockReturnValue(parsedResponse);
      mockFormatForCopy.mockReturnValue('formatted raw text');

      const { result } = renderHook(() =>
        useCopyManager({ responseText, jsonContextData })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      expect(mockParseStructuredResponse).toHaveBeenCalledWith(responseText);
      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'raw',
        responseText,
        jsonContextData,
        parsedResponse
      );
      expect(mockCopyToClipboard).toHaveBeenCalledWith('formatted raw text');
    });

    it('should handle json format copy', async () => {
      const responseText = 'Test response';
      const jsonContextData = { test: 'data' };
      
      mockFormatForCopy.mockReturnValue('{"formatted": "json"}');

      const { result } = renderHook(() =>
        useCopyManager({ responseText, jsonContextData })
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'json',
        responseText,
        jsonContextData,
        expect.any(Object)
      );
      expect(mockCopyToClipboard).toHaveBeenCalledWith('{"formatted": "json"}');
    });

    it('should handle markdown format copy', async () => {
      const responseText = 'Test response';
      
      mockFormatForCopy.mockReturnValue('# Formatted Markdown');

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'markdown',
        responseText,
        undefined,
        expect.any(Object)
      );
      expect(mockCopyToClipboard).toHaveBeenCalledWith('# Formatted Markdown');
    });

    it('should handle custom format copy', async () => {
      const responseText = 'Test response';
      const customFormat = 'csv' as CopyFormat;
      
      mockFormatForCopy.mockReturnValue('col1,col2\nval1,val2');

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat(customFormat);
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        customFormat,
        responseText,
        undefined,
        expect.any(Object)
      );
      expect(mockCopyToClipboard).toHaveBeenCalledWith('col1,col2\nval1,val2');
    });

    it('should work without jsonContextData', async () => {
      const responseText = 'Test response without context';

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'raw',
        responseText,
        undefined,
        expect.any(Object)
      );
    });

    it('should handle multiple consecutive copy operations', async () => {
      const responseText = 'Test response';

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(mockCopyToClipboard).toHaveBeenCalledTimes(3);
      expect(mockFormatForCopy).toHaveBeenCalledTimes(3);
      expect(mockParseStructuredResponse).toHaveBeenCalledTimes(3);
    });
  });

  describe('Response Parsing', () => {
    it('should parse structured response for every copy operation', async () => {
      const responseText = '{"data": "structured"}';
      const parsedResponse = { data: 'structured' };
      
      mockParseStructuredResponse.mockReturnValue(parsedResponse);

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('json');
      });

      expect(mockParseStructuredResponse).toHaveBeenCalledWith(responseText);
      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'json',
        responseText,
        undefined,
        parsedResponse
      );
    });

    it('should handle parse errors gracefully', async () => {
      const responseText = 'invalid json';
      
      mockParseStructuredResponse.mockImplementation(() => {
        throw new Error('Parse error');
      });

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.handleCopyFormat('json');
        });
      }).rejects.toThrow('Parse error');
    });

    it('should handle null parse results', async () => {
      const responseText = 'Test response';
      
      mockParseStructuredResponse.mockReturnValue(null);

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'raw',
        responseText,
        undefined,
        null
      );
    });
  });

  describe('Callback Stability', () => {
    it('should memoize handleCopyFormat based on dependencies', () => {
      const responseText = 'Test response';
      const jsonContextData = { test: 'data' };

      const { result, rerender } = renderHook(
        ({ responseText, jsonContextData }) =>
          useCopyManager({ responseText, jsonContextData }),
        { initialProps: { responseText, jsonContextData } }
      );

      const initialCallback = result.current.handleCopyFormat;

      // Rerender with same props
      rerender({ responseText, jsonContextData });

      expect(result.current.handleCopyFormat).toBe(initialCallback);
    });

    it('should recreate handleCopyFormat when responseText changes', () => {
      const initialProps = {
        responseText: 'Initial response',
        jsonContextData: { test: 'data' }
      };

      const { result, rerender } = renderHook(
        ({ responseText, jsonContextData }) =>
          useCopyManager({ responseText, jsonContextData }),
        { initialProps }
      );

      const initialCallback = result.current.handleCopyFormat;

      // Change responseText
      rerender({
        responseText: 'Changed response',
        jsonContextData: initialProps.jsonContextData
      });

      expect(result.current.handleCopyFormat).not.toBe(initialCallback);
    });

    it('should recreate handleCopyFormat when jsonContextData changes', () => {
      const initialProps = {
        responseText: 'Test response',
        jsonContextData: { test: 'initial' }
      };

      const { result, rerender } = renderHook(
        ({ responseText, jsonContextData }) =>
          useCopyManager({ responseText, jsonContextData }),
        { initialProps }
      );

      const initialCallback = result.current.handleCopyFormat;

      // Change jsonContextData
      rerender({
        responseText: initialProps.responseText,
        jsonContextData: { test: 'changed' }
      });

      expect(result.current.handleCopyFormat).not.toBe(initialCallback);
    });

    it('should recreate handleCopyFormat when copyToClipboard changes', () => {
      const responseText = 'Test response';
      
      const { result, rerender } = renderHook(() =>
        useCopyManager({ responseText })
      );

      const initialCallback = result.current.handleCopyFormat;

      // Change the copyToClipboard function
      const newCopyToClipboard = jest.fn();
      mockUseCopyToClipboard.mockReturnValue({
        ...mockUseCopyToClipboardReturn,
        copyToClipboard: newCopyToClipboard,
      });

      rerender();

      expect(result.current.handleCopyFormat).not.toBe(initialCallback);
    });
  });

  describe('Integration Scenarios', () => {
    it('should work with complex structured response', async () => {
      const responseText = JSON.stringify({
        analysis: {
          iocs: ['192.168.1.1', 'malware.exe'],
          mitre: ['T1055', 'T1059']
        }
      });
      
      const jsonContextData = {
        incident: 'INC123',
        severity: 'high'
      };

      const parsedResponse = {
        analysis: {
          iocs: ['192.168.1.1', 'malware.exe'],
          mitre: ['T1055', 'T1059']
        }
      };

      mockParseStructuredResponse.mockReturnValue(parsedResponse);
      mockFormatForCopy.mockReturnValue('Formatted security analysis');

      const { result } = renderHook(() =>
        useCopyManager({ responseText, jsonContextData })
      );

      await act(async () => {
        await result.current.handleCopyFormat('markdown');
      });

      expect(mockParseStructuredResponse).toHaveBeenCalledWith(responseText);
      expect(mockFormatForCopy).toHaveBeenCalledWith(
        'markdown',
        responseText,
        jsonContextData,
        parsedResponse
      );
      expect(mockCopyToClipboard).toHaveBeenCalledWith('Formatted security analysis');
    });

    it('should handle empty response text', async () => {
      const responseText = '';
      
      mockParseStructuredResponse.mockReturnValue({});
      mockFormatForCopy.mockReturnValue('');

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      expect(mockParseStructuredResponse).toHaveBeenCalledWith('');
      expect(mockFormatForCopy).toHaveBeenCalledWith('raw', '', undefined, {});
      expect(mockCopyToClipboard).toHaveBeenCalledWith('');
    });

    it('should handle very large response text', async () => {
      const largeResponseText = 'x'.repeat(100000);
      
      mockParseStructuredResponse.mockReturnValue({ size: 'large' });
      mockFormatForCopy.mockReturnValue('Large formatted text');

      const { result } = renderHook(() =>
        useCopyManager({ responseText: largeResponseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat('raw');
      });

      expect(mockParseStructuredResponse).toHaveBeenCalledWith(largeResponseText);
      expect(mockCopyToClipboard).toHaveBeenCalledWith('Large formatted text');
    });
  });

  describe('Error Handling', () => {
    it('should handle formatForCopy errors', async () => {
      const responseText = 'Test response';
      
      mockFormatForCopy.mockImplementation(() => {
        throw new Error('Format error');
      });

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.handleCopyFormat('raw');
        });
      }).rejects.toThrow('Format error');

      expect(mockParseStructuredResponse).toHaveBeenCalled();
      expect(mockCopyToClipboard).not.toHaveBeenCalled();
    });

    it('should handle copyToClipboard errors', async () => {
      const responseText = 'Test response';
      
      mockCopyToClipboard.mockRejectedValue(new Error('Clipboard error'));

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await expect(async () => {
        await act(async () => {
          await result.current.handleCopyFormat('raw');
        });
      }).rejects.toThrow('Clipboard error');

      expect(mockFormatForCopy).toHaveBeenCalled();
      expect(mockCopyToClipboard).toHaveBeenCalled();
    });

    it('should handle invalid copy format gracefully', async () => {
      const responseText = 'Test response';
      const invalidFormat = 'invalid' as CopyFormat;
      
      // Reset mocks to ensure clean state
      mockCopyToClipboard.mockResolvedValue(undefined);
      mockFormatForCopy.mockReturnValue('fallback text');

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      await act(async () => {
        await result.current.handleCopyFormat(invalidFormat);
      });

      expect(mockFormatForCopy).toHaveBeenCalledWith(
        invalidFormat,
        responseText,
        undefined,
        expect.any(Object)
      );
    });
  });

  describe('Type Safety', () => {
    it('should accept valid CopyFormat types', async () => {
      const responseText = 'Test response';
      const validFormats: CopyFormat[] = ['raw', 'json', 'markdown'];

      // Reset mocks to ensure clean state
      mockCopyToClipboard.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCopyManager({ responseText })
      );

      for (const format of validFormats) {
        await act(async () => {
          await result.current.handleCopyFormat(format);
        });
      }

      expect(mockCopyToClipboard).toHaveBeenCalledTimes(validFormats.length);
    });

    it('should return correctly typed values', () => {
      const { result } = renderHook(() =>
        useCopyManager({ responseText: 'test' })
      );

      expect(typeof result.current.copyState).toBe('string');
      expect(typeof result.current.isSuccess).toBe('boolean');
      expect(typeof result.current.handleCopyFormat).toBe('function');
      expect(Array.isArray(result.current.copyOptions)).toBe(true);
    });

    it('should handle optional jsonContextData correctly', () => {
      // Test with jsonContextData
      const { result: withContext } = renderHook(() =>
        useCopyManager({ 
          responseText: 'test', 
          jsonContextData: { test: 'data' } 
        })
      );

      // Test without jsonContextData
      const { result: withoutContext } = renderHook(() =>
        useCopyManager({ responseText: 'test' })
      );

      expect(withContext.current.handleCopyFormat).toBeDefined();
      expect(withoutContext.current.handleCopyFormat).toBeDefined();
    });
  });
});
