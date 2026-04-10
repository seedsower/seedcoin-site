import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest } from 'next/server'

// Lazily initialise so the build doesn't fail when env vars are absent
let ratelimiter: Ratelimit | null = null

function getRateLimiter() {
  if (ratelimiter) return ratelimiter
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  ratelimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: false,
    prefix: 'seedcoin:rl',
  })
  return ratelimiter
}

export async function checkRateLimit(
  req: NextRequest,
  identifier?: string
): Promise<{ success: boolean; remaining: number }> {
  const rl = getRateLimiter()
  if (!rl) {
    // If Upstash isn't configured, allow the request (dev/preview)
    return { success: true, remaining: 99 }
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    identifier ??
    'anonymous'

  const result = await rl.limit(ip)
  return { success: result.success, remaining: result.remaining }
}
