import Link from 'next/link'
import { signIn } from '../actions'

// Whitelisted error codes → safe, predefined messages.
// Unknown or missing codes produce no output — prevents message injection attacks.
const ERROR_MESSAGES = {
  invalid_credentials: 'E-Mail oder Passwort falsch.',
  rate_limited: (minutes) =>
    `Zu viele Fehlversuche. Bitte warte ${minutes} Minute${minutes === 1 ? '' : 'n'}.`,
}

const SUCCESS_MESSAGES = {
  password_set: 'Passwort gesetzt. Bitte einloggen.',
}

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const code = params?.code
  const message = params?.message

  // Validate minutes: must be a positive integer ≤ 60 to prevent crafted scary values
  const rawMinutes = parseInt(params?.minutes ?? '0', 10)
  const minutes = Number.isFinite(rawMinutes) ? Math.min(Math.max(rawMinutes, 1), 60) : 1

  const errorText = code === 'rate_limited'
    ? ERROR_MESSAGES.rate_limited(minutes)
    : (ERROR_MESSAGES[code] ?? null)

  const successText = SUCCESS_MESSAGES[message] ?? null

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink-050)',
    }}>
      <Link href="/" className="admin-back-link">
        ← Zurück zur Startseite
        <span className="back-underline" />
      </Link>
      <div style={{
        background: 'var(--ink-100)',
        border: '1px solid var(--ink-300)',
        borderRadius: '12px',
        padding: '48px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--bone-100)',
          fontSize: '1.75rem',
          marginBottom: '8px',
        }}>
          Admin
        </h1>
        <p style={{ color: 'var(--bone-500)', marginBottom: '32px', fontSize: '0.875rem' }}>
          BC Frankfurt 1912 — Vorstandszugang
        </p>

        {successText && (
          <p style={{ color: '#22c55e', marginBottom: '16px', fontSize: '0.875rem' }}>
            {successText}
          </p>
        )}

        {errorText && (
          <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.875rem' }}>
            {errorText}
          </p>
        )}

        <form action={signIn}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: 'var(--bone-300)',
              fontSize: '0.85rem',
              marginBottom: '6px',
            }}>
              E-Mail
            </label>
            <input
              name="email"
              type="email"
              required
              style={{
                width: '100%',
                background: 'var(--ink-300)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '10px 14px',
                color: 'var(--bone-100)',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: 'var(--bone-300)',
              fontSize: '0.85rem',
              marginBottom: '6px',
            }}>
              Passwort
            </label>
            <input
              name="password"
              type="password"
              required
              style={{
                width: '100%',
                background: 'var(--ink-300)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                padding: '10px 14px',
                color: 'var(--bone-100)',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-brass"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Einloggen
          </button>
        </form>
      </div>
    </main>
  )
}
