import { LIMITS } from "./limits";

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

function prune(bucket: Bucket, windowMs: number, now: number) {
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
}

export function assertRateLimit(
  key: string,
  max: number,
  windowMs: number
): void {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  prune(bucket, windowMs, now);
  if (bucket.timestamps.length >= max) {
    throw new Error("Too many requests. Wait a moment and try again.");
  }
  bucket.timestamps.push(now);
  buckets.set(key, bucket);
}

export function assertSolveRateLimit(): void {
  assertRateLimit("solve", LIMITS.maxSolvePerMinute, 60_000);
}

export function assertCatalogRateLimit(): void {
  assertRateLimit("catalog", LIMITS.maxCatalogRefreshPerHour, 60 * 60_000);
}
