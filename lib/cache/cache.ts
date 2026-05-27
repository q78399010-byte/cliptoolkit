import "server-only";

type CacheEntry = {
  value: unknown;
  expiresAt: number | null;
};

export interface CacheStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

class MemoryCacheStore implements CacheStore {
  private entries = new Map<string, CacheEntry>();

  async get<T>(key: string) {
    const entry = this.entries.get(key);

    if (!entry) {
      return null;
    }

    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.entries.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number) {
    this.entries.set(key, {
      value,
      expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
    });
  }

  async delete(key: string) {
    this.entries.delete(key);
  }
}

const globalForCache = globalThis as unknown as {
  creatorToolkitCache?: CacheStore;
};

export function getCacheStore() {
  if (!globalForCache.creatorToolkitCache) {
    globalForCache.creatorToolkitCache = new MemoryCacheStore();
  }

  return globalForCache.creatorToolkitCache;
}
