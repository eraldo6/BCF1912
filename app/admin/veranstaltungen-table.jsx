'use client'

import { useState, useRef, useTransition, useEffect } from 'react'
import { softDeleteVeranstaltung, createVeranstaltung, updateVeranstaltung, toggleVeranstaltungVeroeffentlicht } from './actions'

const COLUMNS = [
  { key: 'veroeffentlicht', label: 'Status' },
  { key: 'quelle',          label: 'Quelle' },
  { key: 'erstellt_von',     label: 'Erstellt von' },
  { key: 'created_at',       label: 'Erstellt am' },
  { key: 'aktualisiert_von', label: 'Bearbeitet von' },
  { key: 'updated_at',       label: 'Aktualisiert am' },
  { key: 'termin',         label: 'Termin' },
  { key: 'titel',          label: 'Titel' },
  { key: 'spielart',       label: 'Spielart' },
  { key: 'kategorie',      label: 'Kategorie' },
  { key: 'staffel',        label: 'Staffel' },
  { key: 'spieltag',       label: 'Spieltag' },
  { key: 'heimmannschaft', label: 'Heim' },
  { key: 'gastmannschaft', label: 'Gast' },
  { key: 'austragungsort', label: 'Ort' },
]

function toDatetimeLocal(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function formatTermin(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    + ', ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
}

function DeleteModal({ row, onConfirm, onCancel, isPending }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--ink-100)',
        border: '1px solid var(--ink-300)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '420px',
        width: '100%',
        margin: '0 16px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--bone-100)',
          fontSize: '1.25rem',
          marginBottom: '16px',
        }}>
          Eintrag wirklich löschen?
        </h3>
        <p style={{
          color: 'var(--bone-300)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          background: 'var(--ink-200)',
          padding: '10px 12px',
          borderRadius: '6px',
          marginBottom: '24px',
        }}>
          {row.titel ?? row.id}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            className="btn btn-ghost"
            style={{ fontSize: '0.875rem' }}
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.6 : 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
            }}
          >
            {isPending ? 'Wird gelöscht…' : 'Ja, löschen'}
          </button>
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'var(--ink-300)',
  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
  padding: '8px 12px', color: 'var(--bone-100)', fontSize: '0.875rem',
  boxSizing: 'border-box', fontFamily: 'inherit',
}
const labelStyle = {
  display: 'block', color: 'var(--bone-300)', fontSize: '0.8rem', marginBottom: '4px',
}

function VeranstaltungModal({ row, onClose, onSuccess, onError, isPending, startTransition }) {
  const isEdit = row != null
  const [saveError, setSaveError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setSaveError(null)
    startTransition(async () => {
      const result = isEdit
        ? await updateVeranstaltung(row.id, formData)
        : await createVeranstaltung(formData)
      if (result?.error) {
        console.error('[Veranstaltung save error]', result.error)
        setSaveError('Speichern fehlgeschlagen. Bitte wende dich an den Administrator.')
        onError()
      } else {
        onSuccess()
      }
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflowY: 'auto', padding: '24px 16px',
    }}>
      <div style={{
        background: 'var(--ink-100)', border: '1px solid var(--ink-300)',
        borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '520px',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-100)', fontSize: '1.25rem', marginBottom: '24px' }}>
          {isEdit ? 'Termin bearbeiten' : 'Neuen Termin anlegen'}
        </h3>

        <form onSubmit={handleSubmit} key={row?.id ?? 'create'}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Titel *</label>
              <input name="titel" type="text" required style={inputStyle}
                placeholder="z.B. Pool Heimspiel Landesliga | 1. Spieltag: BC Frankfurt 1912 e.V. 1 vs. Gegnerverein"
                defaultValue={row?.titel ?? ''} />
              <p style={{ color: 'var(--bone-500)', fontSize: '0.75rem', marginTop: '4px' }}>
                Heimspiele folgen diesem Muster:<br />
                <span style={{ color: 'var(--bone-400)' }}>&lt;Spielart&gt; &lt;Kategorie&gt; &lt;Staffel&gt; | &lt;x&gt;. Spieltag: &lt;Heim&gt; vs. &lt;Gast&gt;</span><br />
                <span style={{ color: 'var(--bone-600)' }}>Pool Heimspiel Landesliga | 1. Spieltag: BC Frankfurt 1912 e.V. 1 vs. Gegnerverein</span>
              </p>
            </div>

            <div>
              <label style={labelStyle}>Spielart</label>
              <select name="spielart" style={inputStyle} defaultValue={row?.spielart ?? ''}>
                <option value="">— keine —</option>
                <option value="Pool">Pool</option>
                <option value="Snooker">Snooker</option>
                <option value="Karambol">Karambol</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Kategorie *</label>
              <select name="kategorie" required style={inputStyle} defaultValue={row?.kategorie ?? ''}>
                <option value="" disabled>— keine —</option>
                <option value="Heimspiel">Heimspiel</option>
                <option value="Internes Turnier">Internes Turnier</option>
                <option value="Externes Turnier">Externes Turnier</option>
                <option value="Mitgliederversammlung">Mitgliederversammlung</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Termin *</label>
              <input name="termin" type="datetime-local" required style={inputStyle}
                defaultValue={toDatetimeLocal(row?.termin)} />
            </div>

            <div>
              <label style={labelStyle}>Staffel</label>
              <select name="staffel" style={inputStyle} defaultValue={row?.staffel ?? ''}>
                <option value="">— keine —</option>
                <option value="LL">LL — Landesliga</option>
                <option value="BL">BL — Bezirksliga</option>
                <option value="VL">VL — Verbandsliga</option>
                <option value="OL">OL — Oberliga</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Spieltag</label>
              <input name="spieltag" type="number" min="1" style={inputStyle}
                placeholder="z.B. 5" defaultValue={row?.spieltag ?? ''} />
            </div>

            <div>
              <label style={labelStyle}>Heimmannschaft</label>
              <input name="heimmannschaft" type="text" style={inputStyle}
                defaultValue={row?.heimmannschaft ?? ''} />
            </div>

            <div>
              <label style={labelStyle}>Gastmannschaft</label>
              <input name="gastmannschaft" type="text" style={inputStyle}
                defaultValue={row?.gastmannschaft ?? ''} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Austragungsort *</label>
              <input name="austragungsort" type="text" required style={inputStyle}
                defaultValue={row?.austragungsort ?? 'BC Frankfurt 1912 e.V.'} />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select name="veroeffentlicht" style={inputStyle} defaultValue={row?.veroeffentlicht === true ? 'true' : 'false'}>
                <option value="true">Veröffentlicht</option>
                <option value="false">Entwurf</option>
              </select>
            </div>

          </div>

          {saveError && (
            <p style={{
              color: '#f87171', background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '6px', padding: '10px 12px',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '12px',
            }}>
              Fehler: {saveError}
            </p>
          )}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-brass"
              style={{ fontSize: '0.875rem', opacity: isPending ? 0.6 : 1 }}
            >
              {isPending ? 'Wird gespeichert…' : isEdit ? 'Änderungen speichern' : 'Termin anlegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function VeranstaltungenTable({ rows: initialRows, userMap = {}, attributeCount = 0 }) {
  const [rows, setRows] = useState(initialRows)
  useEffect(() => { setRows(initialRows) }, [initialRows])
  const [sortCol, setSortCol] = useState('termin')
  const [sortDir, setSortDir] = useState('asc')
  const [deleteRow, setDeleteRow] = useState(null)
  const [editRow, setEditRow] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])
  const [isPending, startTransition] = useTransition()
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const tableRef = useRef(null)

  if (rows.length === 0) {
    return (
      <p style={{ color: 'var(--bone-500)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
        Keine Einträge gefunden.
      </p>
    )
  }

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortCol]
    const bv = b[sortCol]
    if (av === null) return 1
    if (bv === null) return -1
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  const handleConfirmDelete = () => {
    const id = deleteRow.id
    startTransition(async () => {
      const result = await softDeleteVeranstaltung(id)
      if (result?.error) {
        console.error('[Delete error]', result.error)
        setToast({ type: 'error', text: 'Löschen fehlgeschlagen. Bitte Administrator kontaktieren.' })
      } else {
        setRows(prev => prev.filter(r => r.id !== id))
        setToast({ type: 'success', text: 'Eintrag gelöscht' })
      }
      setDeleteRow(null)
    })
  }

  const syncTop = () => {
    if (bottomRef.current) bottomRef.current.scrollLeft = topRef.current.scrollLeft
  }
  const syncBottom = () => {
    if (topRef.current) topRef.current.scrollLeft = bottomRef.current.scrollLeft
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-200)', fontSize: '1.4rem', margin: 0 }}>
            Veranstaltungen
          </h2>
          {rows.length > 0 && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone-500)' }}>
              {rows.length} {rows.length === 1 ? 'Eintrag' : 'Einträge'} · {attributeCount} Attribute
            </span>
          )}
        </div>
        <button onClick={() => setShowCreate(true)} className="btn btn-brass" style={{ fontSize: '0.875rem' }}>
          + Neuer Termin
        </button>
      </div>

      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, borderRadius: '8px', padding: '12px 28px',
          fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600,
          boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
          background: toast.type === 'error' ? 'rgba(220,38,38,0.95)' : 'rgba(22,163,74,0.95)',
          color: '#fff',
          border: toast.type === 'error' ? '1px solid #ef4444' : '1px solid #4ade80',
        }}>
          {toast.text}
        </div>
      )}

      {showCreate && (
        <VeranstaltungModal
          row={null}
          onClose={() => setShowCreate(false)}
          onSuccess={() => { setShowCreate(false); setToast({ type: 'success', text: 'Termin erfolgreich angelegt' }) }}
          onError={() => setToast({ type: 'error', text: 'Speichern fehlgeschlagen. Bitte Administrator kontaktieren.' })}
          isPending={isPending}
          startTransition={startTransition}
        />
      )}

      {editRow && (
        <VeranstaltungModal
          row={editRow}
          onClose={() => setEditRow(null)}
          onSuccess={() => { setEditRow(null); setToast({ type: 'success', text: 'Änderungen gespeichert' }) }}
          onError={() => setToast({ type: 'error', text: 'Speichern fehlgeschlagen. Bitte Administrator kontaktieren.' })}
          isPending={isPending}
          startTransition={startTransition}
        />
      )}

      {deleteRow && (
        <DeleteModal
          row={deleteRow}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteRow(null)}
          isPending={isPending}
        />
      )}

      {/* Obere Scrollbar */}
      <div ref={topRef} onScroll={syncTop} className="admin-scroll" style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '4px' }}>
        <div ref={tableRef} style={{ height: '1px' }} />
      </div>

      {/* Tabelle */}
      <div ref={bottomRef} onScroll={syncBottom} className="admin-scroll" style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--bone-300)',
          }}
          ref={el => {
            if (el && tableRef.current) {
              tableRef.current.style.width = el.scrollWidth + 'px'
            }
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--ink-300)' }} />
              {COLUMNS.map(({ key, label }) => {
                const active = sortCol === key
                return (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      borderBottom: '1px solid var(--ink-300)',
                      color: active ? 'var(--bone-200)' : 'var(--bone-500)',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {label} {active ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--ink-200)' }}>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setEditRow(row)}
                      title="Bearbeiten"
                      style={{
                        color: 'var(--bone-500)',
                        background: 'var(--ink-200)',
                        border: '1px solid var(--ink-300)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '5px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 1,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteRow(row)}
                      title="Löschen"
                      style={{
                        color: 'var(--bone-500)',
                        background: 'var(--ink-200)',
                        border: '1px solid var(--ink-300)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        padding: '5px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: 1,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </td>
                {COLUMNS.map(({ key }) => (
                  <td key={key} style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    {key === 'veroeffentlicht'
                      ? <button
                          onClick={() => {
                            const next = !row.veroeffentlicht
                            setRows(prev => prev.map(r => r.id === row.id ? { ...r, veroeffentlicht: next } : r))
                            startTransition(async () => {
                              const result = await toggleVeranstaltungVeroeffentlicht(row.id, row.veroeffentlicht)
                              if (result?.error) {
                                setRows(prev => prev.map(r => r.id === row.id ? { ...r, veroeffentlicht: row.veroeffentlicht } : r))
                                setToast({ type: 'error', text: 'Fehler beim Ändern des Status.' })
                              } else {
                                setToast({ type: 'success', text: next ? 'Veröffentlicht' : 'Als Entwurf gespeichert' })
                              }
                            })
                          }}
                          style={{ background: row.veroeffentlicht ? 'rgba(22,163,74,0.15)' : 'rgba(255,255,255,0.06)', color: row.veroeffentlicht ? '#4ade80' : 'var(--bone-500)', border: `1px solid ${row.veroeffentlicht ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', lineHeight: 1.4 }}
                        >
                          {row.veroeffentlicht ? 'Veröffentlicht' : 'Entwurf'}
                        </button>
                      : key === 'termin' || key === 'created_at' || key === 'updated_at'
                      ? key === 'updated_at' && row.updated_at !== row.created_at
                        ? <span style={{
                            background: 'rgba(255,255,255,0.10)',
                            color: 'var(--bone-300)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}>{formatTermin(row.updated_at)}</span>
                        : formatTermin(row[key])
                      : key === 'aktualisiert_von'
                        ? row.aktualisiert_von == null
                          ? <span style={{ color: 'var(--bone-600)' }}>—</span>
                          : row.aktualisiert_von !== row.erstellt_von
                            ? <span style={{ background: 'rgba(255,255,255,0.10)', color: 'var(--bone-300)', padding: '2px 6px', borderRadius: '4px' }}>{userMap[row.aktualisiert_von] ?? row.aktualisiert_von}</span>
                            : <span style={{ color: 'var(--bone-400)' }}>{userMap[row.aktualisiert_von] ?? row.aktualisiert_von}</span>
                      : key === 'erstellt_von'
                        ? <span>{userMap[row[key]] ?? row[key] ?? <span style={{ color: 'var(--bone-600)' }}>—</span>}</span>
                      : key === 'spielart' && row[key]
                        ? <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            ...(row[key] === 'Pool'     ? { background: 'rgba(60,120,200,0.2)',  color: '#6fa3e0', border: '1px solid rgba(60,120,200,0.3)' }  :
                                row[key] === 'Snooker'  ? { background: 'rgba(60,180,100,0.2)',  color: '#6dc98a', border: '1px solid rgba(60,180,100,0.3)' }  :
                                                          { background: 'rgba(200,70,70,0.2)',   color: '#e08080', border: '1px solid rgba(200,70,70,0.3)' }),
                          }}>{row[key]}</span>
                      : key === 'quelle'
                        ? <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: row[key] === 'Manuell' ? 'rgba(180,140,60,0.2)' : 'rgba(60,120,200,0.2)',
                            color: row[key] === 'Manuell' ? '#c8a84b' : '#6fa3e0',
                            border: `1px solid ${row[key] === 'Manuell' ? 'rgba(180,140,60,0.3)' : 'rgba(60,120,200,0.3)'}`,
                          }}>{row[key]}</span>
                      : row[key] === null
                        ? <span style={{ color: 'var(--bone-600)' }}>—</span>
                        : String(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
