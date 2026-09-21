/**
 * IP-based login rate limiter.
 *
 * Best-effort for serverless: state lives in module scope and persists
 * across requests on a warm Lambda instance. A cold start resets the state,
 * but rapid brute-force attacks (the most common threat) hit the same warm
 * instance and are reliably caught. Supabase Auth's own server-side rate
 * limits act as an independent second layer.
 *
 * Thresholds:
 *   – 5 failed attempts within 10 minutes → 15-minute lockout
 *   – 500 ms artificial delay on every failed attempt (slows automated attacks)
 */

const WINDOW_MS       = 10 * 60 * 1000   // sliding window: 10 minutes
const MAX_ATTEMPTS    = 5                 // failures allowed before lockout
const LOCK_DURATION_MS = 15 * 60 * 1000  // lockout duration: 15 minutes

// ip -> { count: number, windowStart: number, lockedUntil?: number }
const store = new Map()

function cleanup() {
  const now = Date.now()
  for (const [ip, record] of store.entries()) {
    const expired = record.lockedUntil
      ? now > record.lockedUntil
      : now - record.windowStart > WINDOW_MS
    if (expired) store.delete(ip)
  }
}

/**
 * Returns { allowed: true } or { allowed: false, remainingMinutes: number }.
 * Call this before attempting authentication.
 */
export function checkLoginRateLimit(ip) {
  cleanup()
  const now = Date.now()
  const record = store.get(ip)

  if (!record) return { allowed: true }

  if (record.lockedUntil) {
    if (now < record.lockedUntil) {
      const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60_000)
      return { allowed: false, remainingMinutes }
    }
    store.delete(ip)
    return { allowed: true }
  }

  if (now - record.windowStart > WINDOW_MS) {
    store.delete(ip)
    return { allowed: true }
  }

  return { allowed: true }
}

/**
 * Record a failed login attempt for the given IP.
 * Returns the current failure count.
 */
export function recordFailedLogin(ip) {
  cleanup()
  const now = Date.now()
  const record = store.get(ip) ?? { count: 0, windowStart: now }

  record.count++

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCK_DURATION_MS
  }

  store.set(ip, record)
  return record.count
}

/** Clear all recorded failures for an IP (call on successful login). */
export function clearLoginAttempts(ip) {
  store.delete(ip)
}

/** Returns remaining attempts before lockout (0 if already locked). */
export function getRemainingAttempts(ip) {
  const record = store.get(ip)
  if (!record || record.lockedUntil) return 0
  return Math.max(0, MAX_ATTEMPTS - record.count)
}
