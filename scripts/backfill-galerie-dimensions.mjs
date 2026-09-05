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

function getJpegDimensions(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xFF) break
    const marker = buf[i + 1]
    const len = buf.readUInt16BE(i + 2)
    if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) ||
        (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + len
  }
  return null
}

function getPngDimensions(buf) {
  if (buf.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

const { data: rows } = await supabase
  .from('galerie')
  .select('id, bild_url, storage_path')
  .or('width.is.null,height.is.null')

if (!rows?.length) {
  console.log('\nAlle Bilder haben bereits Abmessungen.\n')
  process.exit(0)
}

console.log(`\n${rows.length} Bilder ohne Abmessungen:\n`)

for (const row of rows) {
  const res = await fetch(row.bild_url)
  const buf = Buffer.from(await res.arrayBuffer())

  const ext = row.storage_path.split('.').pop().toLowerCase()
  const dims = ext === 'png' ? getPngDimensions(buf) : getJpegDimensions(buf)

  if (!dims) {
    console.error(`  ✗  ${row.storage_path} — Dimensionen nicht lesbar`)
    continue
  }

  const { error } = await supabase
    .from('galerie')
    .update({ width: dims.width, height: dims.height })
    .eq('id', row.id)

  if (error) {
    console.error(`  ✗  ${row.storage_path} — ${error.message}`)
  } else {
    console.log(`  ✓  ${row.storage_path} — ${dims.width}×${dims.height}`)
  }
}

console.log('\nFertig.\n')
