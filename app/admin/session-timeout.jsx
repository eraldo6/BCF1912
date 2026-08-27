'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

const TIMEOUT_MS = 5 * 60 * 1000

export function SessionTimeout() {
  const router = useRouter()
  const timerRef = useRef(null)
  const lastActivityRef = useRef(Date.now())
  const [remaining, setRemaining] = useState(TIMEOUT_MS)

  useEffect(() => {
    const supabase = createClient()

    const resetTimer = () => {
      lastActivityRef.current = Date.now()
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(async () => {
        await supabase.auth.signOut()
        router.push('/admin/login?error=' + encodeURIComponent('Sitzung abgelaufen'))
      }, TIMEOUT_MS)
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current
      setRemaining(Math.max(0, TIMEOUT_MS - elapsed))
    }, 1000)

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    events.forEach(e => window.addEventListener(e, resetTimer))
    resetTimer()

    return () => {
      clearTimeout(timerRef.current)
      clearInterval(interval)
      events.forEach(e => window.removeEventListener(e, resetTimer))
    }
  }, [router])

  const minutes = Math.floor(remaining / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  const isCountdown = remaining < 4 * 60 * 1000
  const isWarning = remaining < 60 * 1000

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      color: isCountdown ? (isWarning ? '#ef4444' : 'var(--bone-300)') : '#22c55e',
      opacity: 0.8,
      userSelect: 'none',
    }}>
      {isCountdown
        ? `Sitzung: ${minutes}:${seconds.toString().padStart(2, '0')}`
        : 'Sitzung aktiv'}
    </div>
  )
}
