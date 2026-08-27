import { signIn } from '../actions'

export default async function LoginPage({ searchParams }) {
  const params = await searchParams
  const error = params?.error

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink-050)',
    }}>
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

        {error && (
          <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.875rem' }}>
            {decodeURIComponent(error)}
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
