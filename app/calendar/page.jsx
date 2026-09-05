'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

function generateCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
  return days
}

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const days = generateCalendarDays(year, month)

  const changeMonth = (offset) =>
    setCurrentMonth(new Date(year, month + offset, 1))

  const monthLabel = currentMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink-000)' }}>

      {/* Header */}
      <section style={{
        padding: '160px 0 64px',
        borderBottom: '1px solid var(--ink-300)',
        background: 'radial-gradient(ellipse at 60% 20%, var(--felt-700) 0%, var(--ink-050) 60%, var(--ink-000) 100%)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <Link href="/" style={{ color: 'var(--bone-300)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              ← Zurück
            </Link>
            <span style={{ color: 'var(--ink-500)' }}>/</span>
            <span className="eyebrow">Kalender</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--bone-100)', maxWidth: 1000 }}>
            Spielplan &amp; <em style={{ fontStyle: 'italic', color: 'var(--brass-500)' }}>Termine</em>
          </h1>
          <p style={{ color: 'var(--bone-300)', fontSize: 17, maxWidth: 560, marginTop: 28, lineHeight: 1.6 }}>
            Ligaspiele und interne Termine des BC Frankfurt 1912.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 780 }}>

          {/* Month navigation */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 24, padding: '16px 24px',
            background: 'var(--ink-100)', borderRadius: 12,
            border: '1px solid var(--ink-300)',
          }}>
            <button
              onClick={() => changeMonth(-1)}
              style={{ background: 'transparent', border: '1px solid var(--ink-300)', color: 'var(--brass-500)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12 }}
            >
              ← Zurück
            </button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--bone-100)', margin: 0 }}>
              {monthLabel}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              style={{ background: 'transparent', border: '1px solid var(--ink-300)', color: 'var(--brass-500)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12 }}
            >
              Weiter →
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 4 }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 10,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--bone-500)', padding: 8,
              }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {days.map((date, i) => {
              if (!date) return <div key={`e-${i}`} />
              const isToday = date.toDateString() === today.toDateString()
              return (
                <div key={i} style={{
                  aspectRatio: '1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--ink-100)',
                  border: isToday ? '2px solid var(--brass-500)' : '1px solid var(--ink-300)',
                  borderRadius: 8,
                  color: isToday ? 'var(--brass-500)' : 'var(--bone-300)',
                  fontFamily: 'var(--font-sans)', fontSize: 14,
                  fontWeight: isToday ? 700 : 400,
                }}>
                  {date.getDate()}
                </div>
              )
            })}
          </div>

          {/* Placeholder hint */}
          <div style={{ marginTop: 48, textAlign: 'center', color: 'var(--bone-500)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
            Spieldaten werden bald hier angezeigt.
          </div>

        </div>
      </section>
    </div>
  )
}
