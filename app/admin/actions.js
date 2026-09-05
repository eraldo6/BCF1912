'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'

export async function signIn(formData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent('Ungültige Anmeldedaten'))
  }

  redirect('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function toggleVeranstaltungVeroeffentlicht(id, current) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }
  const { error } = await supabase
    .from('veranstaltungen')
    .update({ veroeffentlicht: !current, aktualisiert_von: user.id })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function softDeleteVeranstaltung(id) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }
  const { error } = await supabase
    .from('veranstaltungen')
    .update({ geloescht: true })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

const ALLOWED_SPIELART  = new Set(['Pool', 'Snooker', 'Karambol'])
const ALLOWED_KATEGORIE = new Set(['Heimspiel', 'Internes Turnier', 'Externes Turnier', 'Mitgliederversammlung', 'Sonstiges'])
const ALLOWED_STAFFEL   = new Set(['LL', 'BL', 'VL', 'OL'])

function str(formData, key, maxLen = 500) {
  const val = formData.get(key)?.trim()
  if (!val) return null
  return val.slice(0, maxLen)
}

function validateVeranstaltung(formData) {
  const titel         = str(formData, 'titel')
  const kategorie     = str(formData, 'kategorie')
  const termin        = str(formData, 'termin')
  const austragungsort = str(formData, 'austragungsort')
  const spielart      = str(formData, 'spielart')
  const staffel       = str(formData, 'staffel')

  if (!titel)                                          return 'Titel ist erforderlich'
  if (!kategorie || !ALLOWED_KATEGORIE.has(kategorie)) return 'Ungültige Kategorie'
  if (!termin || isNaN(new Date(termin).getTime()))    return 'Ungültiger Termin'
  if (!austragungsort)                                 return 'Austragungsort ist erforderlich'
  if (spielart && !ALLOWED_SPIELART.has(spielart))     return 'Ungültige Spielart'
  if (staffel  && !ALLOWED_STAFFEL.has(staffel))       return 'Ungültige Staffel'

  return null
}

export async function updateVeranstaltung(id, formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }
  const validationError = validateVeranstaltung(formData)
  if (validationError) return { error: validationError }

  const spieltag = formData.get('spieltag')
  const staffel_nr = formData.get('staffel_nr')

  const { error } = await supabase.from('veranstaltungen').update({
    titel:          str(formData, 'titel'),
    spielart:       str(formData, 'spielart'),
    kategorie:      str(formData, 'kategorie'),
    termin:         str(formData, 'termin'),
    spieltag:       spieltag ? parseInt(spieltag) : null,
    staffel:        str(formData, 'staffel'),
    staffel_nr:     staffel_nr ? parseInt(staffel_nr) : null,
    heimmannschaft:   str(formData, 'heimmannschaft'),
    gastmannschaft:   str(formData, 'gastmannschaft'),
    austragungsort:   str(formData, 'austragungsort'),
    veroeffentlicht:  formData.get('veroeffentlicht') !== 'false',
    aktualisiert_von: user.id,
  }).eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function createVeranstaltung(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }
  const validationError = validateVeranstaltung(formData)
  if (validationError) return { error: validationError }

  const spieltag = formData.get('spieltag')
  const staffel_nr = formData.get('staffel_nr')

  const { error } = await supabase.from('veranstaltungen').insert({
    titel:          str(formData, 'titel'),
    spielart:       str(formData, 'spielart'),
    kategorie:      str(formData, 'kategorie'),
    termin:         str(formData, 'termin'),
    spieltag:       spieltag ? parseInt(spieltag) : null,
    staffel:        str(formData, 'staffel'),
    staffel_nr:     staffel_nr ? parseInt(staffel_nr) : null,
    heimmannschaft:  str(formData, 'heimmannschaft'),
    gastmannschaft:  str(formData, 'gastmannschaft'),
    austragungsort:  str(formData, 'austragungsort'),
    veroeffentlicht: formData.get('veroeffentlicht') !== 'false',
    quelle:          'Manuell',
    erstellt_von:    user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
