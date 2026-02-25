/**
 * Rate limit placeholder. Returns true (allowed) for now.
 * Replace with Redis-backed limiter (e.g. check key by IP or identifier, increment, compare to max).
 */

export async function checkRateLimit(_identifier: string): Promise<boolean> {
  return true;
}
