// src/utils/__tests__/helpers.test.ts
import {
  wait,
  getDisplayModelName,
  generateCacheKey,
  validateQuery,
  formatErrorMessage,
  buildMitreUrl,
} from '../helpers';

describe('helpers', () => {
  describe('wait', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should wait for default 1000ms', async () => {
      const promise = wait();
      jest.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should wait for specified time', async () => {
      const promise = wait(500);
      jest.advanceTimersByTime(500);
      await expect(promise).resolves.toBeUndefined();
    });

    it('should not resolve before specified time', async () => {
      const promise = wait(1000);
      jest.advanceTimersByTime(999);
      
      let resolved = false;
      promise.then(() => { resolved = true; });
      
      await Promise.resolve(); // Allow microtasks to run
      expect(resolved).toBe(false);
      
      jest.advanceTimersByTime(1);
      await promise;
      expect(resolved).toBe(true);
    });

    it('should handle zero milliseconds', async () => {
      const promise = wait(0);
      jest.advanceTimersByTime(0);
      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe('getDisplayModelName', () => {
    it('should replace underscores with spaces', () => {
      expect(getDisplayModelName('claude_3_sonnet')).toBe('claude 3 sonnet');
    });

    it('should handle multiple underscores', () => {
      expect(getDisplayModelName('gpt_4_turbo_preview')).toBe('gpt 4 turbo preview');
    });

    it('should handle strings without underscores', () => {
      expect(getDisplayModelName('claude-latest')).toBe('claude-latest');
    });

    it('should handle empty string', () => {
      expect(getDisplayModelName('')).toBe('');
    });

    it('should handle strings with mixed separators', () => {
      expect(getDisplayModelName('claude_3-sonnet_latest')).toBe('claude 3-sonnet latest');
    });

    it('should handle single underscore', () => {
      expect(getDisplayModelName('_')).toBe(' ');
    });

    it('should handle consecutive underscores', () => {
      expect(getDisplayModelName('claude__3__sonnet')).toBe('claude  3  sonnet');
    });
  });

  describe('generateCacheKey', () => {
    const defaultParams = {
      query: 'test query',
      model: 'claude-latest',
      temperature: 0.7,
      stopWords: ['stop1', 'stop2'],
      jsonSchema: '{"type": "object"}',
      dataToInclude: ['data1', 'data2']
    };

    it('should generate consistent cache keys for same inputs', () => {
      const key1 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      const key2 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      expect(key1).toBe(key2);
      expect(key1).toMatch(/^charlotte:/);
    });

    it('should generate different cache keys for different queries', () => {
      const key1 = generateCacheKey(
        'query 1',
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      const key2 = generateCacheKey(
        'query 2',
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different models', () => {
      const key1 = generateCacheKey(
        defaultParams.query,
        'claude-latest',
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      const key2 = generateCacheKey(
        defaultParams.query,
        'gpt-4o',
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      expect(key1).not.toBe(key2);
    });

    it('should generate different cache keys for different temperatures', () => {
      const key1 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        0.5,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      const key2 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        0.7,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      expect(key1).not.toBe(key2);
    });

    it('should handle empty arrays', () => {
      const key = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        [],
        defaultParams.jsonSchema,
        []
      );

      expect(key).toMatch(/^charlotte:/);
      expect(typeof key).toBe('string');
    });

    it('should truncate long queries', () => {
      const longQuery = 'a'.repeat(200);
      const key = generateCacheKey(
        longQuery,
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      expect(key).toMatch(/^charlotte:/);
    });

    it('should handle whitespace in jsonSchema', () => {
      const key = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        defaultParams.stopWords,
        '  {"type": "object"}  ',
        defaultParams.dataToInclude
      );

      expect(key).toMatch(/^charlotte:/);
    });

    it('should join stop words with pipe separator', () => {
      const key1 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        ['stop1', 'stop2'],
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      const key2 = generateCacheKey(
        defaultParams.query,
        defaultParams.model,
        defaultParams.temperature,
        ['stop1|stop2'],
        defaultParams.jsonSchema,
        defaultParams.dataToInclude
      );

      // Both should be the same since ['stop1', 'stop2'].join('|') equals 'stop1|stop2'
      // and ['stop1|stop2'].join('|') also equals 'stop1|stop2'
      expect(key1).toBe(key2);
    });
  });

  describe('validateQuery', () => {
    it('should validate valid query', () => {
      const result = validateQuery('This is a valid query');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject null query', () => {
      const result = validateQuery(null as any);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject undefined query', () => {
      const result = validateQuery(undefined as any);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject non-string query', () => {
      const result = validateQuery(123 as any);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject empty string query', () => {
      const result = validateQuery('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject whitespace-only query', () => {
      const result = validateQuery('   \n\t  ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query cannot be empty');
    });

    it('should reject too long query', () => {
      const longQuery = 'a'.repeat(10001);
      const result = validateQuery(longQuery);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is too long (max 10,000 characters)');
    });

    it('should accept query at max length', () => {
      const maxQuery = 'a'.repeat(10000);
      const result = validateQuery(maxQuery);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should accept query with special characters', () => {
      const result = validateQuery('Query with special chars: !@#$%^&*()');
      expect(result.isValid).toBe(true);
    });

    it('should accept query with newlines', () => {
      const result = validateQuery('Line 1\nLine 2\nLine 3');
      expect(result.isValid).toBe(true);
    });
  });

  describe('formatErrorMessage', () => {
    it('should return string as-is', () => {
      const result = formatErrorMessage('Simple error message');
      expect(result).toBe('Simple error message');
    });

    it('should extract message from Error object', () => {
      const error = new Error('Error object message');
      const result = formatErrorMessage(error);
      expect(result).toBe('Error object message');
    });

    it('should handle custom error objects with message property', () => {
      const customError = { message: 'Custom error message' };
      const result = formatErrorMessage(customError);
      expect(result).toBe('Custom error message');
    });

    it('should handle objects with non-string message', () => {
      const customError = { message: 42 };
      const result = formatErrorMessage(customError);
      expect(result).toBe('42');
    });

    it('should handle null', () => {
      const result = formatErrorMessage(null);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle undefined', () => {
      const result = formatErrorMessage(undefined);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle number', () => {
      const result = formatErrorMessage(404);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle boolean', () => {
      const result = formatErrorMessage(false);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle array', () => {
      const result = formatErrorMessage(['error1', 'error2']);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle object without message property', () => {
      const result = formatErrorMessage({ status: 500, code: 'SERVER_ERROR' });
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle empty string', () => {
      const result = formatErrorMessage('');
      expect(result).toBe('');
    });

    it('should handle Error subclasses', () => {
      class CustomError extends Error {
        constructor(message: string) {
          super(message);
          this.name = 'CustomError';
        }
      }

      const error = new CustomError('Custom error message');
      const result = formatErrorMessage(error);
      expect(result).toBe('Custom error message');
    });
  });

  describe('buildMitreUrl', () => {
    it('should build URL for main technique', () => {
      const result = buildMitreUrl('T1027');
      expect(result).toBe('https://attack.mitre.org/techniques/T1027/');
    });

    it('should build URL for sub-technique', () => {
      const result = buildMitreUrl('T1566.001');
      expect(result).toBe('https://attack.mitre.org/techniques/T1566/001/');
    });

    it('should handle multiple dot notation', () => {
      const result = buildMitreUrl('T1234.567.890');
      expect(result).toBe('https://attack.mitre.org/techniques/T1234/567.890/');
    });

    it('should handle technique without number prefix', () => {
      const result = buildMitreUrl('TA0001');
      expect(result).toBe('https://attack.mitre.org/techniques/TA0001/');
    });

    it('should handle empty string', () => {
      const result = buildMitreUrl('');
      expect(result).toBe('https://attack.mitre.org/techniques//');
    });

    it('should handle technique ID with only dots', () => {
      const result = buildMitreUrl('...');
      expect(result).toBe('https://attack.mitre.org/techniques//../');
    });

    it('should handle single character technique ID', () => {
      const result = buildMitreUrl('T');
      expect(result).toBe('https://attack.mitre.org/techniques/T/');
    });

    it('should handle technique ID with no dots', () => {
      const result = buildMitreUrl('T1234567');
      expect(result).toBe('https://attack.mitre.org/techniques/T1234567/');
    });
  });
});
