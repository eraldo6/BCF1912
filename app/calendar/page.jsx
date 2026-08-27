'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const AVAILABLE_SEASONS = [
  { id: "5", name: "2024/2025" },
  { id: "4", name: "2023/2024" },
  { id: "3", name: "2022/2023" },
]

// ─── DATA SOURCE ──────────────────────────────────────────────────────────────
// Currently reads from public/data/bcf_season_X.json (static JSON files).
// To switch to Supabase: replace the fetch below with a Supabase query.
// The shape expected: { teams: [{ team_name, league, matches: [{ date, home_team, away_team, home_score, away_score }] }] }
// ─────────────────────────────────────────────────────────────────────────────
async function loadSeasonData(seasonId) {
  const res = await fetch(`/data/bcf_season_${seasonId}.json`)
  if (!res.ok) throw new Error('Spieldaten konnten nicht geladen werden')
  return res.json()
}

export default function SpielePage() {
  const [selectedSeason, setSelectedSeason] = useState('5')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showSeasonPicker, setShowSeasonPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    setLoading(true)
    setError(null)
    loadSeasonData(selectedSeason)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [selectedSeason])

  const getMatchesByDate = () => {
    if (!data) return {}
    const byDate = {}
    data.teams.forEach(team => {
      (team.matches || []).forEach(match => {
        if (!byDate[match.date]) byDate[match.date] = []
        byDate[match.date].push({ ...match, teamName: team.team_name, league: team.league })
      })
    })
    return byDate
  }

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
    return days
  }

  const getMatchResult = (match) => {
    if (match.home_score === null || match.away_score === null) return 'scheduled'
    const isHome = match.home_team.includes('BC Frankfurt')
    const scored = isHome ? match.home_score : match.away_score
    const conceded = isHome ? match.away_score : match.home_score
    if (scored > conceded) return 'win'
    if (scored < conceded) return 'loss'
    return 'draw'
  }

  const matchesByDate = getMatchesByDate()
  const calendarDays = generateCalendarDays()
  const currentSeasonName = AVAILABLE_SEASONS.find(s => s.id === selectedSeason)?.name

  const hasMatchesOnDate = (date) => {
    if (!date) return false
    return !!matchesByDate[date.toISOString().split('T')[0]]
  }

  const getMatchesForSelectedDate = () => {
    if (!selectedDate) return []
    return matchesByDate[selectedDate.toISOString().split('T')[0]] || []
  }

  const changeMonth = (offset) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1))
    setSelectedDate(null)
  }

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
            <span className="eyebrow">Kalender & Tabellen</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 8vw, 120px)', color: 'var(--bone-100)', maxWidth: 1000 }}>
            Lebe die <em style={{ fontStyle: 'italic', color: 'var(--brass-500)' }}>Saison</em><br />mit unseren Teams.
          </h1>
          <p style={{ color: 'var(--bone-300)', fontSize: 17, maxWidth: 560, marginTop: 28, lineHeight: 1.6 }}>
            Spielpläne und Ergebnisse für BCF I, II und III — von der Pool Bundesliga bis zur Hessen-Liga.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">

          {/* Season selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowSeasonPicker(!showSeasonPicker)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 20px',
                  background: 'var(--ink-100)',
                  border: '1px solid var(--ink-300)',
                  borderRadius: 999,
                  color: 'var(--bone-100)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                }}
              >
                Saison: {currentSeasonName} <span>{showSeasonPicker ? '▲' : '▼'}</span>
              </button>
              {showSeasonPicker && (
                <div style={{
                  position: 'absolute', top: '110%', left: 0, zIndex: 10,
                  background: 'var(--ink-100)',
                  border: '1px solid var(--ink-300)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  minWidth: 180,
                }}>
                  {AVAILABLE_SEASONS.map(s => (
                    <button key={s.id}
                      onClick={() => { setSelectedSeason(s.id); setShowSeasonPicker(false) }}
                      style={{
                        display: 'block', width: '100%',
                        padding: '12px 20px', textAlign: 'left',
                        background: s.id === selectedSeason ? 'var(--brass-500)' : 'transparent',
                        color: s.id === selectedSeason ? 'var(--ink-000)' : 'var(--bone-200)',
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        letterSpacing: '0.06em', cursor: 'pointer',
                        border: 'none',
                      }}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loading && (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--bone-400)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              Lade Spieldaten…
            </div>
          )}

          {error && (
            <div style={{ padding: 40, textAlign: 'center', color: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              ❌ {error}
            </div>
          )}

          {!loading && !error && data && (
            <>
              {/* Month navigation */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 24, padding: '16px 24px',
                background: 'var(--ink-100)', borderRadius: 12,
                border: '1px solid var(--ink-300)',
              }}>
                <button onClick={() => changeMonth(-1)} style={{ background: 'transparent', border: '1px solid var(--ink-300)', color: 'var(--brass-500)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  ← Vorher
                </button>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--bone-100)', margin: 0 }}>
                  {currentMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => changeMonth(1)} style={{ background: 'transparent', border: '1px solid var(--ink-300)', color: 'var(--brass-500)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  Nächste →
                </button>
              </div>

              {/* Calendar grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 32 }}>
                {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map(d => (
                  <div key={d} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bone-500)', padding: 8 }}>
                    {d}
                  </div>
                ))}
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={`e-${i}`} />
                  const hasMatches = hasMatchesOnDate(date)
                  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
                  const isToday = date.toDateString() === new Date().toDateString()
                  return (
                    <button key={i} onClick={() => hasMatches && setSelectedDate(date)} disabled={!hasMatches}
                      style={{
                        aspectRatio: '1',
                        background: isSelected ? 'var(--brass-500)' : hasMatches ? 'var(--felt-900)' : 'var(--ink-100)',
                        border: isToday ? '2px solid var(--brass-500)' : '1px solid var(--ink-300)',
                        borderRadius: 8,
                        color: isSelected ? 'var(--ink-000)' : hasMatches ? 'var(--felt-300)' : 'var(--bone-400)',
                        cursor: hasMatches ? 'pointer' : 'default',
                        fontFamily: 'var(--font-sans)', fontSize: 14,
                        fontWeight: hasMatches ? 600 : 400,
                        transition: 'all 0.2s',
                        position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {date.getDate()}
                      {hasMatches && (
                        <div style={{ position: 'absolute', bottom: 4, width: 4, height: 4, borderRadius: '50%', background: isSelected ? 'var(--ink-000)' : 'var(--brass-500)' }} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Matches for selected date */}
              {selectedDate && (
                <div style={{ background: 'var(--ink-100)', border: '1px solid var(--brass-500)', borderRadius: 14, padding: 32, marginTop: 24 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--bone-100)', marginBottom: 24 }}>
                    Spiele am {selectedDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </h3>
                  <div style={{ display: 'grid', gap: 16 }}>
                    {getMatchesForSelectedDate().map((match, i) => {
                      const result = getMatchResult(match)
                      return (
                        <div key={i} style={{ background: 'var(--ink-050)', border: '1px solid var(--ink-300)', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
                          <div style={{ padding: '12px 16px', background: 'var(--felt-900)', borderRadius: 8, minWidth: 100, textAlign: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--bone-500)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{match.teamName}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--felt-300)', letterSpacing: '0.08em' }}>{match.league}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
                            <div style={{ textAlign: 'right', flex: 1 }}>
                              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--bone-100)', fontWeight: match.home_team.includes('BC Frankfurt') ? 600 : 400 }}>{match.home_team}</div>
                            </div>
                            <div style={{ padding: '8px 16px', background: 'var(--ink-200)', borderRadius: 8, minWidth: 80, textAlign: 'center' }}>
                              {match.home_score !== null && match.away_score !== null ? (
                                <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--bone-100)', fontWeight: 500 }}>{match.home_score} : {match.away_score}</span>
                              ) : (
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--brass-500)', letterSpacing: '0.1em' }}>vs</span>
                              )}
                            </div>
                            <div style={{ textAlign: 'left', flex: 1 }}>
                              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--bone-100)', fontWeight: match.away_team.includes('BC Frankfurt') ? 600 : 400 }}>{match.away_team}</div>
                            </div>
                          </div>
                          {result !== 'scheduled' && (
                            <div style={{
                              padding: '8px 16px', borderRadius: 999,
                              background: result === 'win' ? 'oklch(0.35 0.08 145)' : result === 'loss' ? 'oklch(0.35 0.08 25)' : 'var(--ink-200)',
                              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                              color: result === 'win' ? 'oklch(0.65 0.15 145)' : result === 'loss' ? 'oklch(0.7 0.18 25)' : 'var(--bone-300)',
                              whiteSpace: 'nowrap',
                            }}>
                              {result === 'win' ? 'Sieg' : result === 'loss' ? 'Niederlage' : 'Unentschieden'}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {!selectedDate && (
                <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--bone-400)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em' }}>
                  Klicken Sie auf ein markiertes Datum, um die Spiele anzuzeigen
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
