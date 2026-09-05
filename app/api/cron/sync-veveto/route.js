import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const VEVETO_POOL_URL =
  'https://hpbv-veveto.de/api/1/season/9/club/26/home/game/list?draw=1&start=0&length=10000'
const VEVETO_SNOOKER_URL =
  'https://hpbv-veveto.de/api/1/season/10/club/26/home/game/list?draw=1&start=0&length=10000'

const STAFFEL_NAMEN = {
  LL: 'Landesliga',
  BL: 'Bezirksliga',
  VL: 'Verbandsliga',
  OL: 'Oberliga',
}

function buildTitel(game, spielart) {
  const staffel = STAFFEL_NAMEN[game.league_name] ?? game.league_name
  return `${spielart} Heimspiel ${staffel} | ${game.day}. Spieltag: ${game.homeTeamName} vs. ${game.guestTeamName}`
}

// Parst deutsches Datumsformat "DD.MM.YYYY HH:mm" zu ISO 8601 mit korrektem
// deutschen Timezone-Offset (CEST Apr–Okt = UTC+2, CET Nov–Mär = UTC+1)
function parseGermanDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ')
  const [day, month, year] = datePart.split('.').map(Number)
  const offset = month >= 4 && month <= 10 ? '+02:00' : '+01:00'
  return (
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` +
    `T${timePart}:00${offset}`
  )
}

async function fetchGames(url) {
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`VeVeTo HTTP ${res.status} (${url})`)
  const json = await res.json()
  if (!Array.isArray(json?.data)) throw new Error(`Unerwartetes Antwortformat (${url})`)
  return json.data
}

function mapGames(games, spielart) {
  return games.map(game => ({
    veveto_id:      game.id,
    titel:          buildTitel(game, spielart),
    spielart,
    kategorie:      'Heimspiel',
    termin:         parseGermanDate(game.date),
    spieltag:       game.day,
    staffel:        game.league_name,
    staffel_nr:     game.league_number,
    heimmannschaft: game.homeTeamName,
    gastmannschaft: game.guestTeamName,
    austragungsort: game.venue_1_club_name,
    quelle:         'VeVeTo Import',
    erstellt_von:   null,
  }))
}

export async function GET(request) {
  // CRON_SECRET prüfen — Vercel setzt es in Production automatisch
  // In Entwicklung ohne CRON_SECRET in .env.local wird der Endpunkt ohne Auth akzeptiert
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // Pool und Snooker parallel fetchen
  let poolGames, snookerGames
  try {
    ;[poolGames, snookerGames] = await Promise.all([
      fetchGames(VEVETO_POOL_URL),
      fetchGames(VEVETO_SNOOKER_URL),
    ])
  } catch (err) {
    return NextResponse.json({ error: `VeVeTo fetch fehlgeschlagen: ${err.message}` }, { status: 502 })
  }

  const rows = [
    ...mapGames(poolGames, 'Pool'),
    ...mapGames(snookerGames, 'Snooker'),
  ]

  // ?dry=true → nur Vorschau, nichts in die Datenbank schreiben
  const dry = new URL(request.url).searchParams.get('dry') === 'true'
  if (dry) {
    return NextResponse.json({ dry: true, pool: poolGames.length, snooker: snookerGames.length, total: rows.length, rows })
  }

  // Service-Role-Client für Schreibzugriff (umgeht RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Bestehende veveto_ids abfragen um neu vs. aktualisiert zu unterscheiden
  const { data: existing } = await supabase
    .from('veranstaltungen')
    .select('veveto_id')
    .not('veveto_id', 'is', null)

  const existingIds = new Set((existing || []).map(r => r.veveto_id))
  const incomingIds = rows.map(r => r.veveto_id)
  const created = incomingIds.filter(id => !existingIds.has(id)).length
  const updated = incomingIds.filter(id => existingIds.has(id)).length

  const { error } = await supabase
    .from('veranstaltungen')
    .upsert(rows, { onConflict: 'veveto_id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    created,
    updated,
    total: rows.length,
    pool: poolGames.length,
    snooker: snookerGames.length,
  })
}
