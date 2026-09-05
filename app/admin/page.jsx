import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { signOut } from './actions'
import { VeranstaltungenTable } from './veranstaltungen-table'
import { BeitraegeTable } from './beitraege-table'
import { GalerieTable } from './galerie-table'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
  const { data: { users } } = await serviceClient.auth.admin.listUsers()
  const userMap = Object.fromEntries((users ?? []).map(u => [u.id, u.email]))

  const { data: galerie, error: galerieError } = await supabase
    .from('galerie')
    .select('id, titel, bild_url, storage_path, file_size, width, height, veroeffentlicht, erstellt_von, created_at')
    .order('created_at', { ascending: false })

  const { data: beitraege, error: beitraegeError } = await supabase
    .from('beitraege')
    .select('id, titel, subtitel, inhalt, bild_url, veroeffentlicht, erstellt_von, aktualisiert_von, created_at, updated_at')
    .eq('geloescht', false)
    .order('created_at', { ascending: false })

  const { data: rows, error } = await supabase
    .from('veranstaltungen')
    .select('id, titel, kategorie, spielart, staffel, spieltag, heimmannschaft, gastmannschaft, austragungsort, termin, quelle, veroeffentlicht, erstellt_von, aktualisiert_von, created_at, updated_at, veveto_id')
    .eq('geloescht', false)
    .order('termin', { ascending: true })

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--ink-050)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--bone-100)',
              fontSize: '2rem',
              marginBottom: '4px',
            }}>
              Admin Dashboard
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
      </div>

      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
        {galerieError ? (
          <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Fehler: {galerieError.message}</p>
        ) : (
          <GalerieTable rows={galerie ?? []} userMap={userMap} />
        )}
      </div>

      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', marginBottom: '32px' }}>
        {beitraegeError ? (
          <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Fehler: {beitraegeError.message}</p>
        ) : (
          <BeitraegeTable rows={beitraege ?? []} userMap={userMap} />
        )}
      </div>

      <div style={{
        background: 'var(--ink-100)',
        border: '1px solid var(--ink-300)',
        borderRadius: '12px',
        padding: '32px',
      }}>
          {error ? (
            <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              Fehler: {error.message}
            </p>
          ) : (
            <VeranstaltungenTable
              rows={rows ?? []}
              userMap={userMap}
              attributeCount={rows?.[0] ? Object.keys(rows[0]).length : 0}
            />
          )}
      </div>
    </main>
  )
}
