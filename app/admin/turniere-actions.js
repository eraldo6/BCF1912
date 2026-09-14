'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

function str(formData, key, maxLen = 500) {
  const val = formData.get(key)?.trim()
  if (!val) return null
  return val.slice(0, maxLen)
}

function validateTurnier(formData) {
  const name = str(formData, 'name', 30)
  if (!name) return 'Name ist erforderlich'
  const turnierbeginn = str(formData, 'turnierbeginn')
  if (!turnierbeginn) return 'Turnierbeginn ist erforderlich'
  const disziplin = str(formData, 'disziplin')
  if (!['Pool', 'Karambol', 'Snooker'].includes(disziplin)) return 'Ungültige Disziplin'
  const typ = str(formData, 'typ')
  if (!['offen', 'intern'].includes(typ)) return 'Ungültiger Typ'
  const href = str(formData, 'href', 1000)
  if (!href) return 'Link ist erforderlich'
  return null
}

export async function createTurnier(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const validationError = validateTurnier(formData)
  if (validationError) return { error: validationError }

  const { error } = await supabase.from('turniere').insert({
    name:            str(formData, 'name', 30),
    turnierbeginn:   str(formData, 'turnierbeginn'),
    disziplin:       str(formData, 'disziplin'),
    typ:             str(formData, 'typ'),
    href:            str(formData, 'href', 1000),
    veroeffentlicht: formData.get('veroeffentlicht') === 'true',
    erstellt_von:    user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function updateTurnier(id, formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const validationError = validateTurnier(formData)
  if (validationError) return { error: validationError }

  const { error } = await supabase.from('turniere').update({
    name:             str(formData, 'name', 30),
    turnierbeginn:    str(formData, 'turnierbeginn'),
    disziplin:        str(formData, 'disziplin'),
    typ:              str(formData, 'typ'),
    href:             str(formData, 'href', 1000),
    veroeffentlicht:  formData.get('veroeffentlicht') === 'true',
    aktualisiert_von: user.id,
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function toggleTurnierVeroeffentlicht(id, current) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('turniere')
    .update({ veroeffentlicht: !current, aktualisiert_von: user.id })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function softDeleteTurnier(id) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('turniere')
    .update({ geloescht: true })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
