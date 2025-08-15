// src/utils/__tests__/cache.test.ts

import { LRUResponseCache, responseCache } from '../cache';
import { CACHE_TTL, MAX_CACHE_SIZE } from '../constants';
import type { LLMResponse } from '../../types';

// Mock Date.now for time-based tests
const mockDate = (timestamp: number) => {
  const spy = jest.spyOn(Date, 'now');
  spy.mockReturnValue(timestamp);
  return spy;
};

describe('LRUResponseCache', () => {
  let cache: LRUResponseCache;
  
  const mockResponse: LLMResponse = {
    content: 'Test response',
    model: 'claude-latest',
    usage: {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30,
    },
    finish_reason: 'stop',
  };

  const mockResponse2: LLMResponse = {
    content: 'Another response',
    model: 'gpt-4o',
    usage: {
      prompt_tokens: 15,
      completion_tokens: 25,
      total_tokens: 40,
    },
    finish_reason: 'length',
  };

  beforeEach(() => {
    cache = new LRUResponseCache();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('should use default values when no parameters provided', () => {
      const defaultCache = new LRUResponseCache();
      expect(defaultCache.size()).toBe(0);
      
      // Test with default MAX_CACHE_SIZE by filling the cache
      for (let i = 0; i < MAX_CACHE_SIZE + 5; i++) {
        defaultCache.set(`key-${i}`, mockResponse);
      }
      expect(defaultCache.size()).toBe(MAX_CACHE_SIZE);
    });

    it('should accept custom max size and TTL', () => {
      const customCache = new LRUResponseCache(5, 1000);
      
      // Fill beyond custom max size
      for (let i = 0; i < 10; i++) {
        customCache.set(`key-${i}`, mockResponse);
      }
      expect(customCache.size()).toBe(5);
    });

    it('should handle zero max size', () => {
      const zeroCache = new LRUResponseCache(0);
      zeroCache.set('key', mockResponse);
      expect(zeroCache.size()).toBe(0);
    });

    it('should handle negative max size', () => {
      const negativeCache = new LRUResponseCache(-1);
      negativeCache.set('key', mockResponse);
      expect(negativeCache.size()).toBe(0);
    });
  });

  describe('Basic Operations', () => {
    it('should store and retrieve values', () => {
      cache.set('key1', mockResponse);
      const retrieved = cache.get('key1');
      
      expect(retrieved).toEqual(mockResponse);
      expect(cache.size()).toBe(1);
    });

    it('should return null for non-existent keys', () => {
      expect(cache.get('nonexistent')).toBeNull();
    });

    it('should handle multiple key-value pairs', () => {
      cache.set('key1', mockResponse);
      cache.set('key2', mockResponse2);
      
      expect(cache.get('key1')).toEqual(mockResponse);
      expect(cache.get('key2')).toEqual(mockResponse2);
      expect(cache.size()).toBe(2);
    });

    it('should overwrite existing keys', () => {
      cache.set('key1', mockResponse);
      cache.set('key1', mockResponse2);
      
      expect(cache.get('key1')).toEqual(mockResponse2);
      expect(cache.size()).toBe(1);
    });

    it('should handle empty keys', () => {
      cache.set('', mockResponse);
      expect(cache.get('')).toEqual(mockResponse);
      expect(cache.size()).toBe(1);
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should respect default TTL', () => {
      const now = 1000000;
      const dateNowSpy = mockDate(now);
      
      cache.set('key1', mockResponse);
      
      // Before expiration
      dateNowSpy.mockReturnValue(now + CACHE_TTL - 1);
      expect(cache.get('key1')).toEqual(mockResponse);
      
      // After expiration
      dateNowSpy.mockReturnValue(now + CACHE_TTL + 1);
      expect(cache.get('key1')).toBeNull();
      expect(cache.size()).toBe(0); // Should be removed after expiration check
    });

    it('should respect custom TTL', () => {
      const now = 1000000;
      const customTtl = 2000;
      const dateNowSpy = mockDate(now);
      
      cache.set('key1', mockResponse, customTtl);
      
      // Before expiration
      dateNowSpy.mockReturnValue(now + customTtl - 1);
      expect(cache.get('key1')).toEqual(mockResponse);
      
      // After expiration
      dateNowSpy.mockReturnValue(now + customTtl + 1);
      expect(cache.get('key1')).toBeNull();
    });

    it('should handle zero TTL', () => {
      const now = 1000000;
      const dateNowSpy = mockDate(now);
      
      cache.set('key1', mockResponse, 0);
      
      // Should expire immediately
      dateNowSpy.mockReturnValue(now + 1);
      expect(cache.get('key1')).toBeNull();
    });

    it('should handle negative TTL', () => {
      const now = 1000000;
      const dateNowSpy = mockDate(now);
      
      cache.set('key1', mockResponse, -1000);
      
      // Should be expired immediately
      expect(cache.get('key1')).toBeNull();
    });

    it('should handle mixed TTLs', () => {
      const now = 1000000;
      const dateNowSpy = mockDate(now);
      
      cache.set('short', mockResponse, 1000);
      cache.set('long', mockResponse2, 5000);
      
      // After short TTL expires but before long TTL
      dateNowSpy.mockReturnValue(now + 2000);
      expect(cache.get('short')).toBeNull();
      expect(cache.get('long')).toEqual(mockResponse2);
      
      // After both expire
      dateNowSpy.mockReturnValue(now + 6000);
      expect(cache.get('long')).toBeNull();
    });
  });

  describe('LRU Behavior', () => {
    it('should evict least recently used item when at capacity', () => {
      const smallCache = new LRUResponseCache(3);
      
      smallCache.set('key1', mockResponse);
      smallCache.set('key2', mockResponse2);
      smallCache.set('key3', mockResponse);
      
      expect(smallCache.size()).toBe(3);
      
      // key1 should be evicted when key4 is added
      smallCache.set('key4', mockResponse2);
      
      expect(smallCache.size()).toBe(3);
      expect(smallCache.get('key1')).toBeNull(); // evicted
      expect(smallCache.get('key2')).toEqual(mockResponse2);
      expect(smallCache.get('key3')).toEqual(mockResponse);
      expect(smallCache.get('key4')).toEqual(mockResponse2);
    });

    it('should update access order on get', () => {
      const smallCache = new LRUResponseCache(3);
      
      smallCache.set('key1', mockResponse);
      smallCache.set('key2', mockResponse2);
      smallCache.set('key3', mockResponse);
      
      // Access key1 to make it most recently used
      smallCache.get('key1');
      
      // Now key2 should be least recently used and get evicted
      smallCache.set('key4', mockResponse2);
      
      expect(smallCache.get('key1')).toEqual(mockResponse); // still there
      expect(smallCache.get('key2')).toBeNull(); // evicted
      expect(smallCache.get('key3')).toEqual(mockResponse);
      expect(smallCache.get('key4')).toEqual(mockResponse2);
    });

    it('should handle updating existing keys without affecting capacity', () => {
      const smallCache = new LRUResponseCache(2);
      
      smallCache.set('key1', mockResponse);
      smallCache.set('key2', mockResponse2);
      
      expect(smallCache.size()).toBe(2);
      
      // Update existing key - should not evict anything
      smallCache.set('key1', mockResponse2);
      
      expect(smallCache.size()).toBe(2);
      expect(smallCache.get('key1')).toEqual(mockResponse2);
      expect(smallCache.get('key2')).toEqual(mockResponse2);
    });

    it('should maintain correct order with multiple operations', () => {
      const smallCache = new LRUResponseCache(3);
      
      // Fill cache
      smallCache.set('a', mockResponse);
      smallCache.set('b', mockResponse2);
      smallCache.set('c', mockResponse);
      
      // Access 'a' to move it to end
      smallCache.get('a');
      
      // Update 'b' to move it to end
      smallCache.set('b', mockResponse);
      
      // Now 'c' should be least recently used
      smallCache.set('d', mockResponse2);
      
      expect(smallCache.get('a')).toEqual(mockResponse);
      expect(smallCache.get('b')).toEqual(mockResponse);
      expect(smallCache.get('c')).toBeNull(); // evicted
      expect(smallCache.get('d')).toEqual(mockResponse2);
    });
  });

  describe('Clear and Size', () => {
    it('should clear all entries', () => {
      cache.set('key1', mockResponse);
      cache.set('key2', mockResponse2);
      
      expect(cache.size()).toBe(2);
      
      cache.clear();
      
      expect(cache.size()).toBe(0);
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
    });

    it('should report correct size', () => {
      expect(cache.size()).toBe(0);
      
      cache.set('key1', mockResponse);
      expect(cache.size()).toBe(1);
      
      cache.set('key2', mockResponse2);
      expect(cache.size()).toBe(2);
      
      cache.set('key1', mockResponse2); // overwrite
      expect(cache.size()).toBe(2);
      
      cache.get('nonexistent');
      expect(cache.size()).toBe(2);
      
      cache.clear();
      expect(cache.size()).toBe(0);
    });

    it('should update size when items expire', () => {
      const now = 1000000;
      const dateNowSpy = mockDate(now);
      
      cache.set('key1', mockResponse, 1000);
      cache.set('key2', mockResponse2, 2000);
      
      expect(cache.size()).toBe(2);
      
      // After first item expires
      dateNowSpy.mockReturnValue(now + 1500);
      cache.get('key1'); // This should remove expired item
      expect(cache.size()).toBe(1);
      
      // After second item expires
      dateNowSpy.mockReturnValue(now + 2500);
      cache.get('key2'); // This should remove expired item
      expect(cache.size()).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large number of operations', () => {
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        cache.set(`key-${i}`, { ...mockResponse, content: `Response ${i}` });
      }
      
      // Should be capped at MAX_CACHE_SIZE
      expect(cache.size()).toBe(MAX_CACHE_SIZE);
      
      // Should still function correctly
      const lastKey = `key-${iterations - 1}`;
      expect(cache.get(lastKey)).toBeTruthy();
    });

    it('should handle special characters in keys', () => {
      const specialKeys = ['key with spaces', 'key\nwith\nnewlines', 'key\twith\ttabs', '🔑emoji-key', ''];
      
      specialKeys.forEach((key, index) => {
        cache.set(key, { ...mockResponse, content: `Response ${index}` });
      });
      
      specialKeys.forEach((key, index) => {
        const result = cache.get(key);
        expect(result?.content).toBe(`Response ${index}`);
      });
    });

    it('should handle concurrent-like operations', () => {
      const keys = Array.from({ length: 50 }, (_, i) => `key-${i}`);
      
      // Set all keys
      keys.forEach(key => cache.set(key, mockResponse));
      
      // Get all keys in reverse order
      keys.reverse().forEach(key => {
        expect(cache.get(key)).toBeTruthy();
      });
      
      // Should maintain consistent state
      expect(cache.size()).toBeLessThanOrEqual(MAX_CACHE_SIZE);
    });

    it('should handle undefined and null in response data', () => {
      const responseWithUndefined: LLMResponse = {
        content: 'Test',
        model: 'test-model',
        usage: undefined,
        finish_reason: undefined,
      };
      
      cache.set('test-key', responseWithUndefined);
      const retrieved = cache.get('test-key');
      
      expect(retrieved).toEqual(responseWithUndefined);
      expect(retrieved?.usage).toBeUndefined();
    });
  });

  describe('Performance Characteristics', () => {
    it('should maintain constant time operations for reasonable sizes', () => {
      const startTime = Date.now();
      
      // Fill cache to capacity
      for (let i = 0; i < MAX_CACHE_SIZE; i++) {
        cache.set(`key-${i}`, mockResponse);
      }
      
      const fillTime = Date.now() - startTime;
      
      // Perform operations on full cache
      const opStartTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        cache.get(`key-${i % MAX_CACHE_SIZE}`);
        cache.set(`new-key-${i}`, mockResponse2);
      }
      
      const opTime = Date.now() - opStartTime;
      
      // These are loose checks - mainly ensuring it doesn't hang
      expect(fillTime).toBeLessThan(1000); // Should fill quickly
      expect(opTime).toBeLessThan(1000); // Should operate quickly
    });
  });
});

describe('Singleton Cache Instance', () => {
  it('should export a singleton cache instance', () => {
    expect(responseCache).toBeInstanceOf(LRUResponseCache);
  });

  it('should maintain state across imports', () => {
    responseCache.set('singleton-test', {
      content: 'Singleton test',
      model: 'test-model',
    });
    
    expect(responseCache.get('singleton-test')).toBeTruthy();
    expect(responseCache.size()).toBeGreaterThan(0);
  });

  it('should use default configuration', () => {
    // Clear any existing data
    responseCache.clear();
    
    // Fill beyond default max to test capacity
    for (let i = 0; i < MAX_CACHE_SIZE + 10; i++) {
      responseCache.set(`test-${i}`, {
        content: `Test ${i}`,
        model: 'test-model',
      });
    }
    
    expect(responseCache.size()).toBe(MAX_CACHE_SIZE);
  });
});
