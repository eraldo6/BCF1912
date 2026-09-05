import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'

// Realtime wird nicht gebraucht — Dummy verhindert den Fehler in Node <22
if (!globalThis.WebSocket) {
  globalThis.WebSocket = class WebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Fehlende Env-Variablen. Starte mit: node --env-file=.env.local scripts/upload-galerie.mjs')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const GALLERY_DIR = new URL('../public/images/gallery', import.meta.url).pathname
const files = readdirSync(GALLERY_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))

console.log(`\n${files.length} Bilder gefunden:\n`)

let created = 0
let skipped = 0

for (const file of files) {
  const filePath = join(GALLERY_DIR, file)
  const storage_path = `galerie/${file}`
  const bild_url = `${SUPABASE_URL}/storage/v1/object/public/media/${storage_path}`

  // Prüfen ob schon in DB vorhanden
  const { data: existing } = await supabase
    .from('galerie')
    .select('id')
    .eq('storage_path', storage_path)
    .maybeSingle()

  if (existing) {
    console.log(`  ⟳  ${file} — bereits vorhanden, übersprungen`)
    skipped++
    continue
  }

  // Upload zu Storage
  const buffer = readFileSync(filePath)
  const ext = extname(file).slice(1).toLowerCase()
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/webp'

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(storage_path, buffer, { contentType: mimeType, upsert: false })

  if (uploadError) {
    console.error(`  ✗  ${file} — Upload-Fehler: ${uploadError.message}`)
    continue
  }

  // DB-Eintrag anlegen
  const { error: dbError } = await supabase.from('galerie').insert({
    bild_url,
    storage_path,
    titel: null,
  })

  if (dbError) {
    console.error(`  ✗  ${file} — DB-Fehler: ${dbError.message}`)
    continue
  }

  console.log(`  ✓  ${file}`)
  created++
}

console.log(`\nFertig: ${created} hochgeladen, ${skipped} übersprungen.\n`)
