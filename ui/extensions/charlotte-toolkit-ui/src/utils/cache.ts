// src/utils/cache.ts

import type { LLMResponse, CacheEntry, ResponseCache } from '../types';

import { CACHE_TTL, MAX_CACHE_SIZE } from './constants';

/**
 * LRU Cache implementation for LLM responses
 * Provides efficient caching with automatic expiration and size-based eviction
 */
export class LRUResponseCache implements ResponseCache {
  private cache = new Map<string, CacheEntry<LLMResponse>>();
  private maxSize: number;
  private defaultTtl: number;

  /**
   * Create a new LRU cache instance
   * @param maxSize - Maximum number of entries to store (default: MAX_CACHE_SIZE)
   * @param defaultTtl - Default time-to-live for entries in milliseconds (default: CACHE_TTL)
   */
  constructor(maxSize: number = MAX_CACHE_SIZE, defaultTtl: number = CACHE_TTL) {
    this.maxSize = maxSize;
    this.defaultTtl = defaultTtl;
  }

  /**
   * Retrieve a cached response by key
   * @param key - Cache key to lookup
   * @returns Cached LLM response or null if not found or expired
   */
  get(key: string): LLMResponse | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Move to end (most recently used) by deleting and re-setting
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.data;
  }

  /**
   * Store a response in the cache
   * @param key - Cache key for the response
   * @param value - LLM response to cache
   * @param ttl - Time-to-live in milliseconds (default: instance default TTL)
   */
  set(key: string, value: LLMResponse, ttl: number = this.defaultTtl): void {
    // Remove oldest entries if at capacity
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const entry: CacheEntry<LLMResponse> = {
      data: value,
      timestamp: Date.now(),
      ttl,
    };

    // Delete and re-add to ensure it's at the end (most recent)
    this.cache.delete(key);
    this.cache.set(key, entry);
  }

  /**
   * Clear all cached entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get current number of cached entries
   * @returns Number of entries in cache
   */
  size(): number {
    return this.cache.size;
  }
}

// Export a singleton instance
export const responseCache = new LRUResponseCache();
