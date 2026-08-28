'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const params = new URLSearchParams(window.location.search)
    const tokenHash = params.get('token_hash')
    const type = params.get('type')

    const validTypes = ['invite', 'recovery']
    if (tokenHash && validTypes.includes(type)) {
      supabase.auth.verifyOtp({ token_hash: tokenHash, type })
        .then(({ error }) => {
          if (error) setError(error.message)
          else setReady(true)
        })
    } else {
      // Fallback: Hash-Flow für ältere Links
      const hash = window.location.hash
      if (!hash || (!hash.includes('type=invite') && !hash.includes('type=recovery'))) return
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true)
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen lang sein.')
      return
    }
    if (password !== confirm) {
      setError('Passwörter stimmen nicht überein.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    router.push('/admin/login?message=' + encodeURIComponent('Passwort gesetzt. Bitte einloggen.'))
  }

  if (error && !ready) {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--ink-050)',
      }}>
        <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
          {error}
        </p>
      </main>
    )
  }

  if (!ready) {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--ink-050)',
      }}>
        <p style={{ color: 'var(--bone-400)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
          Token wird geprüft…
        </p>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--ink-050)',
    }}>
      <div style={{
        background: 'var(--ink-100)', border: '1px solid var(--ink-300)',
        borderRadius: '12px', padding: '48px', width: '100%', maxWidth: '400px',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', color: 'var(--bone-100)',
          fontSize: '1.75rem', marginBottom: '8px',
        }}>
          Passwort festlegen
        </h1>
        <p style={{ color: 'var(--bone-500)', marginBottom: '32px', fontSize: '0.875rem' }}>
          BC Frankfurt 1912 — Vorstandszugang
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: 'var(--bone-300)', fontSize: '0.85rem', marginBottom: '6px' }}>
              Neues Passwort
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: '100%', background: 'var(--ink-300)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
                padding: '10px 14px', color: 'var(--bone-100)', fontSize: '1rem', boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--bone-300)', fontSize: '0.85rem', marginBottom: '6px' }}>
              Passwort bestätigen
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              style={{
                width: '100%', background: 'var(--ink-300)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
                padding: '10px 14px', color: 'var(--bone-100)', fontSize: '1rem', boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.875rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-brass"
            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Wird gespeichert…' : 'Passwort speichern'}
          </button>
        </form>
      </div>
    </main>
  )
}
