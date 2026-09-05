'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '../../lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function createGalerieBild(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { count } = await supabase.from('galerie').select('*', { count: 'exact', head: true })
  if (count >= 15) return { error: 'Maximale Anzahl von 15 Bildern erreicht. Bitte zuerst ein Bild löschen.' }

  const bild_url = formData.get('bild_url')?.trim()
  const storage_path = formData.get('storage_path')?.trim()
  if (!bild_url || !storage_path) return { error: 'Kein Bild hochgeladen' }

  const titel = formData.get('titel')?.trim() || null
  const file_size = formData.get('file_size') ? parseInt(formData.get('file_size')) : null
  const width    = formData.get('width')     ? parseInt(formData.get('width'))     : null
  const height   = formData.get('height')    ? parseInt(formData.get('height'))    : null

  const { error } = await supabase.from('galerie').insert({
    titel,
    bild_url,
    storage_path,
    file_size,
    width,
    height,
    veroeffentlicht: formData.get('veroeffentlicht') === 'true',
    erstellt_von: user.id,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function toggleGalerieVeroeffentlicht(id, current) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('galerie')
    .update({ veroeffentlicht: !current })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function updateGalerieDimensions(id, width, height) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const { error } = await supabase
    .from('galerie')
    .update({ width, height })
    .eq('id', id)

  if (error) return { error: error.message }
  return { success: true }
}

export async function deleteGalerieBild(id, storage_path) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Nicht eingeloggt' }

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { error: storageError } = await serviceClient.storage
    .from('media')
    .remove([storage_path])

  if (storageError) return { error: storageError.message }

  const { error } = await supabase.from('galerie').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
