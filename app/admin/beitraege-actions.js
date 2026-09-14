'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

const ALLOWED_VEROEFFENTLICHT = new Set(['true', 'false'])

function str(formData, key, maxLen = 500) {
  const val = formData.get(key)?.trim()
  if (!val) return null
  return val.slice(0, maxLen)
}

function validateBeitrag(formData) {
  const titel = str(formData, 'titel', 55)
  if (!titel) return 'Titel ist erforderlich'
  const subtitel = str(formData, 'subtitel', 80)
  if (!subtitel) return 'Subtitel ist erforderlich'
  const datum = str(formData, 'datum')
  if (!datum) return 'Datum ist erforderlich'
  const inhaltRaw = formData.get('inhalt') ?? ''
  if (inhaltRaw.length > 0 && !inhaltRaw.trim()) return 'Inhalt darf nicht nur aus Leerzeichen bestehen'
  return null
}

export async function createBeitrag(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const validationError = validateBeitrag(formData)
  if (validationError) return { error: validationError }

  const { error } = await supabase.from('beitraege').insert({
    titel:           str(formData, 'titel'),
    subtitel:        str(formData, 'subtitel'),
    inhalt:          str(formData, 'inhalt', 500),
    bild_url:        str(formData, 'bild_url', 1000),
    datum:           str(formData, 'datum') || null,
    veroeffentlicht: formData.get('veroeffentlicht') === 'true',
    erstellt_von:    user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function updateBeitrag(id, formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const validationError = validateBeitrag(formData)
  if (validationError) return { error: validationError }

  const { error } = await supabase.from('beitraege').update({
    titel:            str(formData, 'titel'),
    subtitel:         str(formData, 'subtitel'),
    inhalt:           str(formData, 'inhalt', 500),
    bild_url:         str(formData, 'bild_url', 1000),
    datum:            str(formData, 'datum') || null,
    veroeffentlicht:  formData.get('veroeffentlicht') === 'true',
    aktualisiert_von: user.id,
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function toggleBeitragVeroeffentlicht(id, current) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('beitraege')
    .update({ veroeffentlicht: !current, aktualisiert_von: user.id })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function softDeleteBeitrag(id) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('beitraege')
    .update({ geloescht: true })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  return { success: true }
}
