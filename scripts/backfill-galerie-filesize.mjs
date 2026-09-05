import { createClient } from '@supabase/supabase-js'

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
  console.error('Fehlende Env-Variablen.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const { data: files } = await supabase.storage.from('media').list('galerie')

if (!files?.length) {
  console.log('Keine Dateien im Storage gefunden.')
  process.exit(0)
}

console.log(`\n${files.length} Dateien gefunden:\n`)

for (const file of files) {
  const storage_path = `galerie/${file.name}`
  const { error } = await supabase
    .from('galerie')
    .update({ file_size: file.metadata?.size ?? null })
    .eq('storage_path', storage_path)

  if (error) {
    console.error(`  ✗  ${file.name} — ${error.message}`)
  } else {
    const kb = file.metadata?.size ? (file.metadata.size / 1024).toFixed(1) + ' KB' : '?'
    console.log(`  ✓  ${file.name} — ${kb}`)
  }
}

console.log('\nFertig.\n')
