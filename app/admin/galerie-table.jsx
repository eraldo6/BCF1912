'use client'

import { useState, useTransition, useEffect } from 'react'
import { createClient } from '../../lib/supabase/client'
import { createGalerieBild, deleteGalerieBild, toggleGalerieVeroeffentlicht } from './galerie-actions'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const inputStyle = {
  width: '100%', background: 'var(--ink-300)',
  border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
  padding: '8px 12px', color: 'var(--bone-100)', fontSize: '0.875rem',
  boxSizing: 'border-box', fontFamily: 'inherit',
}
const labelStyle = {
  display: 'block', color: 'var(--bone-300)', fontSize: '0.8rem', marginBottom: '4px',
}

function DeleteModal({ row, onConfirm, onCancel, isPending }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', maxWidth: '420px', width: '100%', margin: '0 16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-100)', fontSize: '1.25rem', marginBottom: '16px' }}>
          Bild wirklich löschen?
        </h3>
        <p style={{ color: 'var(--bone-400)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '16px' }}>
          Das Bild wird unwiderruflich aus der Galerie und dem Speicher gelöscht.
        </p>
        {row.bild_url && (
          <img src={row.bild_url} alt="" style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '6px', marginBottom: '24px' }} />
        )}
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

function UploadModal({ onClose, onSuccess, onError, isPending, startTransition }) {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saveError, setSaveError] = useState(null)

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_FILE_SIZE) {
      setSaveError('Maximale Dateigröße: 10 MB. Bei größeren Dateien bitte den Administrator kontaktieren.')
      e.target.value = ''
      return
    }
    setSaveError(null)
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!imageFile) { setSaveError('Bitte ein Bild auswählen.'); return }

    setSaveError(null)
    setUploading(true)

    const supabase = createClient()
    const ext = imageFile.name.split('.').pop()
    const storage_path = `galerie/${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(storage_path, imageFile)

    if (uploadError) {
      console.error('[Galerie upload error]', uploadError)
      setSaveError('Bild-Upload fehlgeschlagen. Bitte Administrator kontaktieren.')
      setUploading(false)
      onError()
      return
    }

    const bild_url = `${SUPABASE_URL}/storage/v1/object/public/media/${storage_path}`
    setUploading(false)

    const formData = new FormData(e.target)
    formData.set('bild_url', bild_url)
    formData.set('storage_path', storage_path)
    formData.set('file_size', imageFile.size)

    const { w, h } = await new Promise(resolve => {
      const img = new Image()
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
      img.onerror = () => resolve({ w: null, h: null })
      img.src = URL.createObjectURL(imageFile)
    })
    if (w) formData.set('width', w)
    if (h) formData.set('height', h)

    startTransition(async () => {
      const result = await createGalerieBild(formData)
      if (result?.error) {
        console.error('[Galerie save error]', result.error)
        setSaveError('Speichern fehlgeschlagen. Bitte Administrator kontaktieren.')
        onError()
      } else {
        onSuccess()
      }
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ background: 'var(--ink-100)', border: '1px solid var(--ink-300)', borderRadius: '12px', padding: '32px', width: '100%', maxWidth: '480px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-100)', fontSize: '1.25rem', marginBottom: '24px' }}>
          Bild zur Galerie hinzufügen
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Bild *</label>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ color: 'var(--bone-300)', fontSize: '0.875rem' }} />
              <p style={{ color: 'var(--bone-600)', fontSize: '0.75rem', marginTop: '4px' }}>Maximale Dateigröße: 10 MB</p>
              {imagePreview && (
                <img src={imagePreview} alt="Vorschau" style={{ marginTop: '8px', width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px' }} />
              )}
            </div>
            <div>
              <label style={labelStyle}>Beschriftung</label>
              <input name="titel" type="text" style={inputStyle} placeholder="z.B. Vereinsmeisterschaft 2026" />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="veroeffentlicht" style={inputStyle} defaultValue="false">
                <option value="false">Entwurf</option>
                <option value="true">Veröffentlicht</option>
              </select>
            </div>
          </div>

          {saveError && (
            <p style={{ color: '#f87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '12px' }}>
              {saveError}
            </p>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>Abbrechen</button>
            <button type="submit" disabled={isPending || uploading} className="btn btn-brass" style={{ fontSize: '0.875rem', opacity: (isPending || uploading) ? 0.6 : 1 }}>
              {uploading ? 'Wird hochgeladen…' : isPending ? 'Wird gespeichert…' : 'Hochladen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function formatSize(bytes) {
  if (!bytes) return null
  return bytes < 1024 * 1024
    ? (bytes / 1024).toFixed(1) + ' KB'
    : (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function GalerieTable({ rows: initialRows, userMap = {} }) {
  const [rows, setRows] = useState(initialRows)
  useEffect(() => { setRows(initialRows) }, [initialRows])
  const [deleteRow, setDeleteRow] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [toast, setToast] = useState(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  const handleConfirmDelete = () => {
    startTransition(async () => {
      const result = await deleteGalerieBild(deleteRow.id, deleteRow.storage_path)
      if (result?.error) {
        console.error('[Galerie delete error]', result.error)
        setToast({ type: 'error', text: 'Löschen fehlgeschlagen. Bitte Administrator kontaktieren.' })
      } else {
        setToast({ type: 'success', text: 'Bild gelöscht' })
      }
      setDeleteRow(null)
    })
  }

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, borderRadius: '8px', padding: '12px 28px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,0.5)', background: toast.type === 'error' ? 'rgba(220,38,38,0.95)' : 'rgba(22,163,74,0.95)', color: '#fff', border: toast.type === 'error' ? '1px solid #ef4444' : '1px solid #4ade80' }}>
          {toast.text}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--bone-200)', fontSize: '1.4rem', margin: 0 }}>Galerie</h2>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone-500)' }}>
            {rows.length} / 15 Bilder
          </span>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          disabled={rows.length >= 15}
          className="btn btn-brass"
          style={{ fontSize: '0.875rem', opacity: rows.length >= 15 ? 0.4 : 1, cursor: rows.length >= 15 ? 'not-allowed' : 'pointer' }}
          title={rows.length >= 15 ? 'Maximum von 15 Bildern erreicht' : undefined}
        >
          + Bild hochladen
        </button>
      </div>

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onSuccess={() => { setShowUpload(false); setToast({ type: 'success', text: 'Bild erfolgreich hochgeladen' }) }}
          onError={() => setToast({ type: 'error', text: 'Hochladen fehlgeschlagen. Bitte Administrator kontaktieren.' })}
          isPending={isPending}
          startTransition={startTransition}
        />
      )}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'zoom-out' }}
        >
          <img src={lightbox.bild_url} alt={lightbox.titel ?? ''} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 8px 48px rgba(0,0,0,0.6)' }} />
        </div>
      )}

      {deleteRow && (
        <DeleteModal
          row={deleteRow}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteRow(null)}
          isPending={isPending}
        />
      )}

      {rows.length === 0 ? (
        <p style={{ color: 'var(--bone-500)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Noch keine Bilder in der Galerie.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
          {rows.map(row => (
            <div key={row.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--ink-300)', background: 'var(--ink-200)' }}>
              <img src={row.bild_url} alt={row.titel ?? ''} onClick={() => setLightbox(row)} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', cursor: 'zoom-in' }} />
              <div style={{ padding: '8px 10px' }}>
                {row.titel && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone-300)', margin: 0, marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.titel}
                  </p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <button
                    onClick={() => {
                      const next = !row.veroeffentlicht
                      setRows(prev => prev.map(r => r.id === row.id ? { ...r, veroeffentlicht: next } : r))
                      startTransition(async () => {
                        const result = await toggleGalerieVeroeffentlicht(row.id, row.veroeffentlicht)
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
                  <button onClick={() => setDeleteRow(row)} title="Löschen" style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--bone-600)' }}>
                  {new Date(row.created_at).toLocaleDateString('de-DE')}
                  {formatSize(row.file_size) && ` · ${formatSize(row.file_size)}`}
                  {row.width && row.height && ` · ${row.width}×${row.height}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
