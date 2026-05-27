import "server-only";

type Bucket = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as unknown as {
  creatorToolkitRateLimit?: Map<string, Bucket>;
};

function getBuckets() {
  if (!globalForRateLimit.creatorToolkitRateLimit) {
    globalForRateLimit.creatorToolkitRateLimit = new Map();
  }

  return globalForRateLimit.creatorToolkitRateLimit;
}

export function checkRateLimit(input: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const buckets = getBuckets();
  const now = Date.now();
  const existing = buckets.get(input.key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + input.windowMs;
    buckets.set(input.key, {
      count: 1,
      resetAt
    });

    return {
      allowed: true,
      remaining: Math.max(input.limit - 1, 0),
      resetAt
    };
  }

  if (existing.count >= input.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: Math.max(input.limit - existing.count, 0),
    resetAt: existing.resetAt
  };
}
