'use client'

import { useState, useRef, useTransition, useEffect } from 'react'
import { createTurnier, updateTurnier, toggleTurnierVeroeffentlicht, softDeleteTurnier } from './turniere-actions'

const COLUMNS = [
  { key: 'veroeffentlicht', label: 'Status' },
  { key: 'name',            label: 'Name' },
  { key: 'turnierbeginn',   label: 'Turnierbeginn' },
  { key: 'disziplin',       label: 'Disziplin' },
  { key: 'typ',             label: 'Typ' },
  { key: 'href',            label: 'Link' },
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', maxWidth: '420px', width: '100%', margin: '0 16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-100)', fontSize: '1.25rem', marginBottom: '16px' }}>
          Turnier wirklich löschen?
        </h3>
        <p style={{ color: 'var(--bone-300)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', background: 'var(--ink-200)', padding: '10px 12px', borderRadius: '6px', marginBottom: '24px' }}>
          {row.name}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>Abbrechen</button>
          <button onClick={onConfirm} disabled={isPending} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.6 : 1, fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
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

function TurnierModal({ row, onClose, onSuccess, onError, isPending, startTransition }) {
  const isEdit = row != null
  const [saveError, setSaveError] = useState(null)
  const [nameLen, setNameLen] = useState(row?.name?.length ?? 0)
  const [terminValue, setTerminValue] = useState(toDatetimeLocal(row?.turnierbeginn) ?? '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setSaveError(null)
    startTransition(async () => {
      const result = isEdit
        ? await updateTurnier(row.id, formData)
        : await createTurnier(formData)
      if (result?.error) {
        setSaveError(result.error)
        onError()
      } else {
        onSuccess()
      }
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: '24px 16px' }}>
      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '520px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-100)', fontSize: '1.25rem', marginBottom: '24px' }}>
          {isEdit ? 'Turnier bearbeiten' : 'Neues Turnier anlegen'}
        </h3>

        <form onSubmit={handleSubmit} key={row?.id ?? 'create'}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>
                Name * <span style={{ float: 'right', color: nameLen > 26 ? '#f87171' : 'var(--bone-500)' }}>{nameLen}/30</span>
              </label>
              <input
                name="name" type="text" required maxLength={30} style={inputStyle}
                placeholder="z.B. BCF Vereinsmeisterschaft 2026"
                defaultValue={row?.name ?? ''}
                onChange={e => setNameLen(e.target.value.length)}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Turnierbeginn *</label>
              <input name="turnierbeginn" type="datetime-local" required style={inputStyle}
                value={terminValue}
                onChange={e => setTerminValue(e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Disziplin *</label>
              <select name="disziplin" required style={inputStyle} defaultValue={row?.disziplin ?? ''}>
                <option value="" disabled>— wählen —</option>
                <option value="Pool">Pool</option>
                <option value="Karambol">Karambol</option>
                <option value="Snooker">Snooker</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Typ *</label>
              <select name="typ" required style={inputStyle} defaultValue={row?.typ ?? ''}>
                <option value="" disabled>— wählen —</option>
                <option value="offen">Öffentlich</option>
                <option value="intern">Intern</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>CueScore-Link *</label>
              <input name="href" type="url" required style={inputStyle}
                placeholder="https://cuescore.com/…"
                defaultValue={row?.href ?? ''} />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select name="veroeffentlicht" style={inputStyle} defaultValue={row?.veroeffentlicht === true ? 'true' : 'false'}>
                <option value="false">Entwurf</option>
                <option value="true">Veröffentlicht</option>
              </select>
            </div>

          </div>

          {saveError && (
            <p style={{ color: '#f87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '12px' }}>
              Fehler: {saveError}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>Abbrechen</button>
            <button type="submit" disabled={isPending} className="btn btn-brass" style={{ fontSize: '0.875rem', opacity: isPending ? 0.6 : 1 }}>
              {isPending ? 'Wird gespeichert…' : isEdit ? 'Änderungen speichern' : 'Turnier anlegen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function TurniereTable({ rows: initialRows }) {
  const [rows, setRows] = useState(initialRows)
  useEffect(() => { setRows(initialRows) }, [initialRows])
  const [sortCol, setSortCol] = useState('turnierbeginn')
  const [sortDir, setSortDir] = useState('desc')
  const [deleteRow, setDeleteRow] = useState(null)
  const [editRow, setEditRow] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [toast, setToast] = useState(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const sorted = [...rows].sort((a, b) => {
    const av = a[sortCol], bv = b[sortCol]
    if (av === null) return 1
    if (bv === null) return -1
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const handleConfirmDelete = () => {
    const id = deleteRow.id
    startTransition(async () => {
      const result = await softDeleteTurnier(id)
      if (result?.error) {
        setToast({ type: 'error', text: 'Löschen fehlgeschlagen.' })
      } else {
        setRows(prev => prev.filter(r => r.id !== id))
        setToast({ type: 'success', text: 'Turnier gelöscht' })
      }
      setDeleteRow(null)
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-200)', fontSize: '1.4rem', margin: 0 }}>Turniere</h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone-500)' }}>
            {rows.length} {rows.length === 1 ? 'Eintrag' : 'Einträge'}
          </span>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn btn-brass" style={{ fontSize: '0.875rem' }}>
          + Neues Turnier
        </button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, borderRadius: '8px', padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,0.5)', background: toast.type === 'error' ? 'rgba(220,38,38,0.95)' : 'rgba(22,163,74,0.95)', color: '#fff', border: toast.type === 'error' ? '1px solid #ef4444' : '1px solid #4ade80' }}>
          {toast.text}
        </div>
      )}

      {showCreate && (
        <TurnierModal row={null} onClose={() => setShowCreate(false)}
          onSuccess={() => { setShowCreate(false); setToast({ type: 'success', text: 'Turnier angelegt' }) }}
          onError={() => {}} isPending={isPending} startTransition={startTransition} />
      )}
      {editRow && (
        <TurnierModal row={editRow} onClose={() => setEditRow(null)}
          onSuccess={() => { setEditRow(null); setToast({ type: 'success', text: 'Änderungen gespeichert' }) }}
          onError={() => {}} isPending={isPending} startTransition={startTransition} />
      )}
      {deleteRow && (
        <DeleteModal row={deleteRow} onConfirm={handleConfirmDelete} onCancel={() => setDeleteRow(null)} isPending={isPending} />
      )}

      {rows.length === 0 ? (
        <p style={{ color: 'var(--bone-500)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Keine Turniere gefunden.</p>
      ) : (
        <div className="admin-scroll" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--bone-300)' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px 12px', borderBottom: '1px solid var(--ink-300)' }} />
                {COLUMNS.map(({ key, label }) => (
                  <th key={key} onClick={() => handleSort(key)} style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid var(--ink-300)', color: sortCol === key ? 'var(--bone-200)' : 'var(--bone-500)', whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none' }}>
                    {label} {sortCol === key ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--ink-200)' }}>
                  <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => setEditRow(row)} title="Bearbeiten" style={{ color: 'var(--bone-500)', background: 'var(--ink-200)', border: '1px solid var(--ink-300)', borderRadius: '6px', cursor: 'pointer', padding: '5px 8px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button onClick={() => setDeleteRow(row)} title="Löschen" style={{ color: 'var(--bone-500)', background: 'var(--ink-200)', border: '1px solid var(--ink-300)', borderRadius: '6px', cursor: 'pointer', padding: '5px 8px', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </td>
                  {COLUMNS.map(({ key }) => (
                    <td key={key} style={{ padding: '10px 12px', whiteSpace: 'nowrap', maxWidth: key === 'name' ? 200 : key === 'href' ? 180 : 'none', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {key === 'veroeffentlicht'
                        ? <button onClick={() => {
                            const next = !row.veroeffentlicht
                            setRows(prev => prev.map(r => r.id === row.id ? { ...r, veroeffentlicht: next } : r))
                            startTransition(async () => {
                              const result = await toggleTurnierVeroeffentlicht(row.id, row.veroeffentlicht)
                              if (result?.error) {
                                setRows(prev => prev.map(r => r.id === row.id ? { ...r, veroeffentlicht: row.veroeffentlicht } : r))
                                setToast({ type: 'error', text: 'Fehler beim Ändern des Status.' })
                              } else {
                                setToast({ type: 'success', text: next ? 'Veröffentlicht' : 'Als Entwurf gespeichert' })
                              }
                            })
                          }} style={{ background: row.veroeffentlicht ? 'rgba(22,163,74,0.15)' : 'rgba(255,255,255,0.06)', color: row.veroeffentlicht ? '#4ade80' : 'var(--bone-500)', border: `1px solid ${row.veroeffentlicht ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '4px', padding: '2px 6px', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', cursor: 'pointer', lineHeight: 1.4 }}>
                            {row.veroeffentlicht ? 'Veröffentlicht' : 'Entwurf'}
                          </button>
                        : key === 'turnierbeginn'
                          ? formatTermin(row[key])
                        : key === 'disziplin'
                          ? <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, ...(row[key] === 'Pool' ? { background: 'rgba(60,120,200,0.2)', color: '#6fa3e0', border: '1px solid rgba(60,120,200,0.3)' } : row[key] === 'Snooker' ? { background: 'rgba(60,180,100,0.2)', color: '#6dc98a', border: '1px solid rgba(60,180,100,0.3)' } : { background: 'rgba(200,70,70,0.2)', color: '#e08080', border: '1px solid rgba(200,70,70,0.3)' }) }}>
                            {row[key]}
                          </span>
                        : key === 'typ'
                          ? <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', background: row[key] === 'intern' ? 'rgba(248,113,113,0.1)' : 'rgba(134,239,172,0.1)', color: row[key] === 'intern' ? '#f87171' : '#86efac', border: `1px solid ${row[key] === 'intern' ? 'rgba(248,113,113,0.25)' : 'rgba(134,239,172,0.25)'}` }}>
                            {row[key] === 'intern' ? 'Intern' : 'Öffentlich'}
                          </span>
                        : key === 'href'
                          ? <a href={row[key]} target="_blank" rel="noopener" style={{ color: 'var(--brass-500)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>↗ Link</a>
                        : row[key] ?? <span style={{ color: 'var(--bone-600)' }}>—</span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
