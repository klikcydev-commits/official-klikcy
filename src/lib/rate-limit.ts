/**
 * Best-effort in-memory sliding-window rate limiter for serverless instances.
 * Each instance tracks its own counters — not a global guarantee across Vercel workers.
 *
 * Optional Redis-backed limiter (install @upstash/ratelimit when wired):
 * ```
 * if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
 *   const { Ratelimit } = await import("@upstash/ratelimit");
 *   const { Redis } = await import("@upstash/redis");
 *   const redis = Redis.fromEnv();
 *   const limiter = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "10 m") });
 *   const { success } = await limiter.limit(ip);
 * }
 * ```
 */

type Window = { timestamps: number[] };

const ipWindows = new Map<string, Window>();
const globalWindow: Window = { timestamps: [] };

const IP_MAX = 3;
const IP_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX = 20;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;

function prune(window: Window, now: number, windowMs: number): number[] {
  const kept = window.timestamps.filter((t) => now - t < windowMs);
  window.timestamps = kept;
  return kept;
}

export type RateLimitResult = {
  ok: boolean;
  retryAfterSeconds?: number;
};

export function checkContactRateLimit(ip: string, now = Date.now()): RateLimitResult {
  const ipEntry = ipWindows.get(ip) ?? { timestamps: [] };
  ipWindows.set(ip, ipEntry);

  const ipHits = prune(ipEntry, now, IP_WINDOW_MS);
  if (ipHits.length >= IP_MAX) {
    const oldest = ipHits[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + IP_WINDOW_MS - now) / 1000));
    return { ok: false, retryAfterSeconds };
  }

  const globalHits = prune(globalWindow, now, GLOBAL_WINDOW_MS);
  if (globalHits.length >= GLOBAL_MAX) {
    const oldest = globalHits[0] ?? now;
    const retryAfterSeconds = Math.max(1, Math.ceil((oldest + GLOBAL_WINDOW_MS - now) / 1000));
    return { ok: false, retryAfterSeconds };
  }

  ipEntry.timestamps.push(now);
  globalWindow.timestamps.push(now);
  return { ok: true };
}
