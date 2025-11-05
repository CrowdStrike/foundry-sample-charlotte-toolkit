import { describe, expect, it } from 'vitest';
import {
  buildMitreUrl,
  formatErrorMessage,
  generateCacheKey,
  validateQuery,
  wait,
} from '../helpers';

describe('helpers', () => {
  describe('wait', () => {
    it('should wait for specified milliseconds', async () => {
      const start = Date.now();
      await wait(100);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(90); // Allow some variance
    });

    it('should use default 1000ms when no argument provided', async () => {
      const start = Date.now();
      await wait();
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(990);
    });

    it('should wait for 0ms', async () => {
      const start = Date.now();
      await wait(0);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(50);
    });
  });

  describe('generateCacheKey', () => {
    it('should generate consistent cache key for same inputs', () => {
      const key1 = generateCacheKey('test query', 'claude-latest', 0.1, [], '', []);
      const key2 = generateCacheKey('test query', 'claude-latest', 0.1, [], '', []);
      expect(key1).toBe(key2);
    });

    it('should generate different keys for different queries', () => {
      const key1 = generateCacheKey('query 1', 'claude-latest', 0.1, [], '', []);
      const key2 = generateCacheKey('query 2', 'claude-latest', 0.1, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should generate different keys for different models', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      const key2 = generateCacheKey('test', 'gpt-4o', 0.1, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should generate different keys for different temperatures', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      const key2 = generateCacheKey('test', 'claude-latest', 0.5, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should handle stop words', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, ['stop'], '', []);
      const key2 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should handle multiple stop words', () => {
      const key = generateCacheKey('test', 'claude-latest', 0.1, ['word1', 'word2'], '', []);
      expect(key).toMatch(/^charlotte:/);
    });

    it('should handle JSON schema', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, [], '{"type":"object"}', []);
      const key2 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should handle data to include', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, [], '', ['data1']);
      const key2 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      expect(key1).not.toBe(key2);
    });

    it('should truncate long queries', () => {
      const longQuery = 'a'.repeat(200);
      const key = generateCacheKey(longQuery, 'claude-latest', 0.1, [], '', []);
      expect(key).toMatch(/^charlotte:/);
    });

    it('should return key with charlotte prefix', () => {
      const key = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      expect(key).toMatch(/^charlotte:/);
    });

    it('should handle empty arrays consistently', () => {
      const key1 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      const key2 = generateCacheKey('test', 'claude-latest', 0.1, [], '', []);
      expect(key1).toBe(key2);
    });
  });

  describe('validateQuery', () => {
    it('should validate a valid query', () => {
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

    it('should reject empty string', () => {
      const result = validateQuery('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is required');
    });

    it('should reject whitespace-only string', () => {
      const result = validateQuery('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query cannot be empty');
    });

    it('should reject query over 10,000 characters', () => {
      const longQuery = 'a'.repeat(10001);
      const result = validateQuery(longQuery);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Query is too long (max 10,000 characters)');
    });

    it('should accept query at exactly 10,000 characters', () => {
      const maxQuery = 'a'.repeat(10000);
      const result = validateQuery(maxQuery);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should trim whitespace when validating', () => {
      const result = validateQuery('  valid query  ');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should handle multiline queries', () => {
      const result = validateQuery('line 1\nline 2\nline 3');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('formatErrorMessage', () => {
    it('should format string errors', () => {
      const result = formatErrorMessage('Simple error message');
      expect(result).toBe('Simple error message');
    });

    it('should format Error objects', () => {
      const error = new Error('Test error');
      const result = formatErrorMessage(error);
      expect(result).toBe('Test error');
    });

    it('should format objects with message property', () => {
      const error = { message: 'Custom error' };
      const result = formatErrorMessage(error);
      expect(result).toBe('Custom error');
    });

    it('should handle TypeError', () => {
      const error = new TypeError('Type error');
      const result = formatErrorMessage(error);
      expect(result).toBe('Type error');
    });

    it('should handle ReferenceError', () => {
      const error = new ReferenceError('Reference error');
      const result = formatErrorMessage(error);
      expect(result).toBe('Reference error');
    });

    it('should handle unknown error types', () => {
      const result = formatErrorMessage({ unknown: 'error' });
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle null error', () => {
      const result = formatErrorMessage(null);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle undefined error', () => {
      const result = formatErrorMessage(undefined);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle number as error', () => {
      const result = formatErrorMessage(42);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle boolean as error', () => {
      const result = formatErrorMessage(true);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should handle array as error', () => {
      const result = formatErrorMessage(['error']);
      expect(result).toBe('An unexpected error occurred');
    });

    it('should convert non-string message to string', () => {
      const error = { message: 123 };
      const result = formatErrorMessage(error);
      expect(result).toBe('123');
    });
  });

  describe('buildMitreUrl', () => {
    it('should build URL for main technique', () => {
      const url = buildMitreUrl('T1027');
      expect(url).toBe('https://attack.mitre.org/techniques/T1027/');
    });

    it('should build URL for sub-technique with dot notation', () => {
      const url = buildMitreUrl('T1566.001');
      expect(url).toBe('https://attack.mitre.org/techniques/T1566/001/');
    });

    it('should build URL for sub-technique with dot notation (multiple digits)', () => {
      const url = buildMitreUrl('T1566.012');
      expect(url).toBe('https://attack.mitre.org/techniques/T1566/012/');
    });

    it('should handle technique with multiple dots', () => {
      const url = buildMitreUrl('T1566.001.002');
      // replace() only replaces first dot, so this becomes T1566/001.002/
      expect(url).toBe('https://attack.mitre.org/techniques/T1566/001.002/');
    });

    it('should handle lowercase technique ID', () => {
      const url = buildMitreUrl('t1027');
      expect(url).toBe('https://attack.mitre.org/techniques/t1027/');
    });

    it('should handle mixed case technique ID', () => {
      const url = buildMitreUrl('t1566.001');
      expect(url).toBe('https://attack.mitre.org/techniques/t1566/001/');
    });

    it('should have correct base URL', () => {
      const url = buildMitreUrl('T1027');
      expect(url).toContain('https://attack.mitre.org/techniques/');
    });

    it('should end with forward slash', () => {
      const url = buildMitreUrl('T1027');
      expect(url).toMatch(/\/$/);
    });

    it('should handle empty string', () => {
      const url = buildMitreUrl('');
      expect(url).toBe('https://attack.mitre.org/techniques//');
    });
  });
});
