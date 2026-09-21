'use client'

import { useFormStatus } from 'react-dom'

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-brass"
      style={{ width: '100%', justifyContent: 'center', gap: 10, opacity: pending ? 0.8 : 1, transition: 'opacity 0.2s' }}
    >
      {pending ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: 'login-spin 0.8s linear infinite', flexShrink: 0 }} aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
            <path d="M8 2 A6 6 0 0 1 14 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Wird eingeloggt…
        </>
      ) : (
        'Einloggen'
      )}
      <style>{`
        @keyframes login-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  )
}
