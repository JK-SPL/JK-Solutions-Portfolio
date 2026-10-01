/**
 * Shared in-memory rate limiter.
 *
 * Fixed-window limiting with two ceilings:
 *  - per-IP:   max N requests from one client IP per window
 *  - per-process: max M requests across ALL IPs per window
 *
 * The process-wide ceiling is what makes this robust against trivial
 * X-Forwarded-For rotation: an attacker cycling fake client IPs still hits
 * the shared budget. `clientIp()` additionally trusts only the leftmost
 * X-Forwarded-For entry (proxies append to the right, so anything further
 * right is client-controlled).
 *
 * PROCESS-LOCAL LIMITATION (explicit): state lives in this Node process's
 * memory. It does not survive restarts/redeploys and is not shared across
 * multiple server instances or edge regions. For a single-instance deployment
 * this is sufficient; a multi-instance deployment needs a shared store
 * (Redis, etc.) instead. Ephemeral by design — consistent with the other
 * in-memory guards in this codebase.
 */

const MAX_KEYS = 5000;

interface Bucket {
  count: number;
  reset: number;
}

export interface RateLimitOptions {
  /** Max requests from a single client IP per window. */
  perIp: number;
  /** Max requests from all IPs combined per window. */
  perProcess: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/**
 * Creates an isolated limiter. Call once at module scope per route that
 * needs limiting, then call the returned function per request:
 *
 *   const briefLimit = createRateLimit({ perIp: 5, perProcess: 50, windowMs: 60 * 60 * 1000 });
 *   if (briefLimit(clientIp(req.headers))) return new Response("Too many requests", { status: 429 });
 *
 * Returns true when the request is over the limit.
 */
export function createRateLimit({ perIp, perProcess, windowMs }: RateLimitOptions) {
  const perIpBuckets = new Map<string, Bucket>();
  let processCount = 0;
  let processReset = Date.now() + windowMs;

  function evictIfFull(now: number) {
    if (perIpBuckets.size < MAX_KEYS) return;
    // Drop expired buckets first; if still full, drop the oldest-inserted
    // key (Maps preserve insertion order) to keep memory bounded.
    for (const [ip, b] of perIpBuckets) {
      if (b.reset < now) perIpBuckets.delete(ip);
      if (perIpBuckets.size < MAX_KEYS) return;
    }
    const oldest = perIpBuckets.keys().next();
    if (!oldest.done) perIpBuckets.delete(oldest.value);
  }

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();

    if (processReset < now) {
      processCount = 0;
      processReset = now + windowMs;
    }
    processCount += 1;
    if (processCount > perProcess) return true;

    const cur = perIpBuckets.get(ip);
    if (!cur || cur.reset < now) {
      evictIfFull(now);
      perIpBuckets.set(ip, { count: 1, reset: now + windowMs });
      return false;
    }
    cur.count += 1;
    return cur.count > perIp;
  };
}

/**
 * Best-effort client IP for rate limiting. Trusts only the leftmost
 * X-Forwarded-For entry — each proxy appends the address it saw to the
 * right, so entries further right are client-controlled and must not be
 * trusted for identity. Falls back to "local" for direct connections.
 */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return "local";
}
