import { beforeEach, describe, expect, it } from 'vitest';
import type { LLMResponse } from '../../types';
import { responseCache } from '../cache';

describe('LRUResponseCache', () => {
  // Create mock LLM response
  const createMockResponse = (id: string): LLMResponse => ({
    content: `Response ${id}`,
    model: 'claude-latest',
    usage: {
      prompt_tokens: 100,
      completion_tokens: 50,
      total_tokens: 150,
    },
  });

  beforeEach(() => {
    // Clear cache before each test
    responseCache.clear();
  });

  describe('basic operations', () => {
    it('should store and retrieve values', () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response);

      const retrieved = responseCache.get('key1');
      expect(retrieved).toEqual(response);
    });

    it('should return null for non-existent keys', () => {
      const retrieved = responseCache.get('nonexistent');
      expect(retrieved).toBeNull();
    });

    it('should overwrite existing keys', () => {
      const response1 = createMockResponse('1');
      const response2 = createMockResponse('2');

      responseCache.set('key1', response1);
      responseCache.set('key1', response2);

      const retrieved = responseCache.get('key1');
      expect(retrieved).toEqual(response2);
    });

    it('should handle multiple keys', () => {
      const response1 = createMockResponse('1');
      const response2 = createMockResponse('2');
      const response3 = createMockResponse('3');

      responseCache.set('key1', response1);
      responseCache.set('key2', response2);
      responseCache.set('key3', response3);

      expect(responseCache.get('key1')).toEqual(response1);
      expect(responseCache.get('key2')).toEqual(response2);
      expect(responseCache.get('key3')).toEqual(response3);
    });

    it('should return correct size', () => {
      expect(responseCache.size()).toBe(0);

      responseCache.set('key1', createMockResponse('1'));
      expect(responseCache.size()).toBe(1);

      responseCache.set('key2', createMockResponse('2'));
      expect(responseCache.size()).toBe(2);

      responseCache.set('key3', createMockResponse('3'));
      expect(responseCache.size()).toBe(3);
    });

    it('should clear all entries', () => {
      responseCache.set('key1', createMockResponse('1'));
      responseCache.set('key2', createMockResponse('2'));
      responseCache.set('key3', createMockResponse('3'));

      expect(responseCache.size()).toBe(3);

      responseCache.clear();

      expect(responseCache.size()).toBe(0);
      expect(responseCache.get('key1')).toBeNull();
      expect(responseCache.get('key2')).toBeNull();
      expect(responseCache.get('key3')).toBeNull();
    });
  });

  describe('TTL (time-to-live)', () => {
    it('should expire entries after TTL', async () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response, 100); // 100ms TTL

      // Should exist immediately
      expect(responseCache.get('key1')).toEqual(response);

      // Wait for expiration
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Should be expired
      expect(responseCache.get('key1')).toBeNull();
    });

    it('should not expire before TTL', async () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response, 200); // 200ms TTL

      // Wait less than TTL
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Should still exist
      expect(responseCache.get('key1')).toEqual(response);
    });

    it('should use custom TTL when provided', async () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response, 50); // Short TTL

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(responseCache.get('key1')).toBeNull();
    });

    it('should handle zero TTL', async () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response, 0);

      // Wait a tiny bit for timestamp to advance
      await new Promise((resolve) => setTimeout(resolve, 10));

      // Should be expired now
      expect(responseCache.get('key1')).toBeNull();
    });

    it('should remove expired entry on get', async () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response, 50);

      expect(responseCache.size()).toBe(1);

      await new Promise((resolve) => setTimeout(resolve, 100));

      responseCache.get('key1'); // This should remove the expired entry

      expect(responseCache.size()).toBe(0);
    });
  });

  describe('LRU eviction', () => {
    it('should evict least recently used when at capacity', () => {
      // Note: Default max size is 100, we need to fill it up
      // For testing purposes, let's add items up to capacity
      for (let i = 0; i < 100; i++) {
        responseCache.set(`key${i}`, createMockResponse(`${i}`));
      }

      expect(responseCache.size()).toBe(100);

      // Add one more - should evict key0 (oldest)
      responseCache.set('key100', createMockResponse('100'));

      expect(responseCache.size()).toBe(100);
      expect(responseCache.get('key0')).toBeNull(); // Evicted
      expect(responseCache.get('key100')).not.toBeNull(); // New item exists
    });

    it('should move accessed items to end (most recent)', () => {
      // Fill cache
      for (let i = 0; i < 100; i++) {
        responseCache.set(`key${i}`, createMockResponse(`${i}`));
      }

      // Access key1 - moves it to end
      responseCache.get('key1');

      // Add new item - should evict key0, not key1
      responseCache.set('key100', createMockResponse('100'));

      expect(responseCache.get('key0')).toBeNull(); // Evicted
      expect(responseCache.get('key1')).not.toBeNull(); // Still exists
      expect(responseCache.get('key100')).not.toBeNull(); // New item exists
    });

    it('should update position when setting existing key', () => {
      // Fill cache
      for (let i = 0; i < 100; i++) {
        responseCache.set(`key${i}`, createMockResponse(`${i}`));
      }

      // Update key1 - moves it to end
      responseCache.set('key1', createMockResponse('1-updated'));

      // Add new item - should evict key0, not key1
      responseCache.set('key100', createMockResponse('100'));

      expect(responseCache.get('key0')).toBeNull(); // Evicted
      expect(responseCache.get('key1')).not.toBeNull(); // Still exists
      expect(responseCache.get('key1')?.content).toBe('Response 1-updated');
    });

    it('should not exceed max size', () => {
      // Add more than max size
      for (let i = 0; i < 150; i++) {
        responseCache.set(`key${i}`, createMockResponse(`${i}`));
      }

      // Should maintain max size
      expect(responseCache.size()).toBe(100);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string key', () => {
      const response = createMockResponse('1');
      responseCache.set('', response);

      expect(responseCache.get('')).toEqual(response);
    });

    it('should handle special characters in key', () => {
      const response = createMockResponse('1');
      const specialKey = 'key!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`';

      responseCache.set(specialKey, response);
      expect(responseCache.get(specialKey)).toEqual(response);
    });

    it('should handle unicode keys', () => {
      const response = createMockResponse('1');
      const unicodeKey = '键🔑clé';

      responseCache.set(unicodeKey, response);
      expect(responseCache.get(unicodeKey)).toEqual(response);
    });

    it('should handle very long keys', () => {
      const response = createMockResponse('1');
      const longKey = 'a'.repeat(10000);

      responseCache.set(longKey, response);
      expect(responseCache.get(longKey)).toEqual(response);
    });

    it('should handle null in content', () => {
      const response = {
        content: null as any,
        model: 'claude-latest',
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      };

      responseCache.set('key1', response);
      expect(responseCache.get('key1')).toEqual(response);
    });

    it('should handle undefined in response fields', () => {
      const response = {
        content: 'test',
        model: undefined as any,
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      };

      responseCache.set('key1', response);
      expect(responseCache.get('key1')).toEqual(response);
    });

    it('should handle response with extra fields', () => {
      const response = {
        content: 'test',
        model: 'claude-latest',
        usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
        extra: 'field',
        another: { nested: 'data' },
      } as any;

      responseCache.set('key1', response);
      expect(responseCache.get('key1')).toEqual(response);
    });
  });

  describe('concurrent operations', () => {
    it('should handle multiple sets to same key', () => {
      const response1 = createMockResponse('1');
      const response2 = createMockResponse('2');
      const response3 = createMockResponse('3');

      responseCache.set('key1', response1);
      responseCache.set('key1', response2);
      responseCache.set('key1', response3);

      expect(responseCache.get('key1')).toEqual(response3);
      expect(responseCache.size()).toBe(1);
    });

    it('should handle multiple gets', () => {
      const response = createMockResponse('1');
      responseCache.set('key1', response);

      expect(responseCache.get('key1')).toEqual(response);
      expect(responseCache.get('key1')).toEqual(response);
      expect(responseCache.get('key1')).toEqual(response);
      expect(responseCache.size()).toBe(1);
    });

    it('should handle clear during iteration', () => {
      for (let i = 0; i < 10; i++) {
        responseCache.set(`key${i}`, createMockResponse(`${i}`));
      }

      expect(responseCache.size()).toBe(10);
      responseCache.clear();
      expect(responseCache.size()).toBe(0);
    });
  });

  describe('cache behavior after operations', () => {
    it('should maintain order after get operations', () => {
      responseCache.set('key1', createMockResponse('1'));
      responseCache.set('key2', createMockResponse('2'));
      responseCache.set('key3', createMockResponse('3'));

      // Access key1, moving it to end
      responseCache.get('key1');

      expect(responseCache.size()).toBe(3);
      expect(responseCache.get('key1')).not.toBeNull();
      expect(responseCache.get('key2')).not.toBeNull();
      expect(responseCache.get('key3')).not.toBeNull();
    });

    it('should handle set after clear', () => {
      responseCache.set('key1', createMockResponse('1'));
      responseCache.clear();
      responseCache.set('key2', createMockResponse('2'));

      expect(responseCache.size()).toBe(1);
      expect(responseCache.get('key1')).toBeNull();
      expect(responseCache.get('key2')).not.toBeNull();
    });

    it('should handle get after clear', () => {
      responseCache.set('key1', createMockResponse('1'));
      responseCache.clear();

      expect(responseCache.get('key1')).toBeNull();
      expect(responseCache.size()).toBe(0);
    });
  });
});
