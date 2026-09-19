'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

const MESSAGES = {
  token_invalid:  'Dieser Link ist abgelaufen oder ungültig. Bitte fordere einen neuen an.',
  update_failed:  'Passwort konnte nicht gesetzt werden. Bitte versuche es erneut.',
  too_weak:       'Passwort erfüllt nicht alle Sicherheitsanforderungen.',
  mismatch:       'Passwörter stimmen nicht überein.',
}

const REQUIREMENTS = [
  { key: 'length',    test: p => p.length >= 12,          label: 'Mindestens 12 Zeichen' },
  { key: 'uppercase', test: p => /[A-Z]/.test(p),         label: 'Großbuchstabe (A–Z)' },
  { key: 'number',    test: p => /[0-9]/.test(p),         label: 'Zahl (0–9)' },
  { key: 'special',   test: p => /[^A-Za-z0-9]/.test(p), label: 'Sonderzeichen (!@#…)' },
]

function checkStrength(password) {
  return REQUIREMENTS.map(r => ({ ...r, passed: r.test(password) }))
}

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errorCode, setErrorCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  const checks = checkStrength(password)
  const strengthPassed = checks.every(c => c.passed)

  useEffect(() => {
    const supabase = createClient()
    const params = new URLSearchParams(window.location.search)
    const tokenHash = params.get('token_hash')
    const type = params.get('type')

    const validTypes = ['invite', 'recovery']
    if (tokenHash && validTypes.includes(type)) {
      supabase.auth.verifyOtp({ token_hash: tokenHash, type })
        .then(({ error }) => {
          if (error) setErrorCode('token_invalid')
          else setReady(true)
        })
    } else {
      const hash = window.location.hash
      if (!hash || (!hash.includes('type=invite') && !hash.includes('type=recovery'))) return
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true)
      })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorCode(null)

    if (!strengthPassed) { setErrorCode('too_weak'); return }
    if (password !== confirm) { setErrorCode('mismatch'); return }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setErrorCode('update_failed')
      setLoading(false)
      return
    }

    await supabase.auth.signOut()
    router.push('/admin/login?message=password_set')
  }

  const errorText = errorCode ? (MESSAGES[errorCode] ?? null) : null

  if (errorCode === 'token_invalid') {
    return (
      <main style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--ink-050)',
      }}>
        <p style={{ color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
          {MESSAGES.token_invalid}
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
              minLength={12}
              style={{
                width: '100%', background: 'var(--ink-300)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
                padding: '10px 14px', color: 'var(--bone-100)', fontSize: '1rem', boxSizing: 'border-box',
              }}
            />
            {password.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {checks.map(({ key, label, passed }) => (
                  <span key={key} style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    fontSize: '0.75rem', color: passed ? '#22c55e' : 'var(--bone-500)',
                    transition: 'color 0.15s',
                  }}>
                    <span style={{ fontSize: '0.65rem', width: '10px', textAlign: 'center' }}>
                      {passed ? '✓' : '○'}
                    </span>
                    {label}
                  </span>
                ))}
              </div>
            )}
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

          {errorText && (
            <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.875rem' }}>{errorText}</p>
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
