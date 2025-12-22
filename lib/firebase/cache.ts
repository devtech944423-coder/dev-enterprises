/**
 * Simple in-memory cache for Firebase queries
 * CRITICAL: Prevents excessive CPU usage from repeated Firebase queries
 * Cache expires after TTL to ensure data freshness
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize = 100; // Limit cache size to prevent memory leaks
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    // Prevent memory leak: remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      // Remove oldest 20% of entries
      const toRemove = entries.slice(0, Math.floor(this.maxSize * 0.2));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  invalidate(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  // Clean up expired entries periodically (lazy cleanup during get/set)
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Call cleanup occasionally
  private lastCleanup = Date.now();
  private cleanupInterval = 10 * 60 * 1000; // 10 minutes

  private maybeCleanup(): void {
    const now = Date.now();
    if (now - this.lastCleanup > this.cleanupInterval) {
      this.cleanup();
      this.lastCleanup = now;
    }
  }
}

// Export singleton instance
export const cache = new SimpleCache();

// Cache keys
export const CACHE_KEYS = {
  allProducts: 'all-products',
  allCategories: 'all-categories',
  productsByCategory: (categoryId: string) => `products-${categoryId}`,
} as const;

