import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'
import { signOut } from './actions'
import { AdminTable } from './admin-table'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: rows, error } = await supabase.from('auto').select('*').order('id')

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--ink-050)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '48px',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--bone-100)',
              fontSize: '2rem',
              marginBottom: '4px',
            }}>
              Admin
            </h1>
            <p style={{ color: 'var(--bone-500)', fontSize: '0.875rem' }}>
              Eingeloggt als {user.email}
            </p>
          </div>
          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">
              Ausloggen
            </button>
          </form>
        </div>

        <div style={{
          background: 'var(--ink-100)',
          border: '1px solid var(--ink-300)',
          borderRadius: '12px',
          padding: '32px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '24px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--bone-200)',
              fontSize: '1.125rem',
            }}>
              Tabelle: auto
            </h2>
            {rows && rows.length > 0 && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone-500)' }}>
                {rows.length} {rows.length === 1 ? 'Datensatz' : 'Datensätze'} · {Object.keys(rows[0]).length} Attribute
              </span>
            )}
          </div>

          {error ? (
            <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              Fehler: {error.message}
            </p>
          ) : (
            <AdminTable rows={rows} />
          )}
        </div>
      </div>
    </main>
  )
}
