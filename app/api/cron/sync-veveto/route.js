import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import {
  fetchActiveSeason,
  fetchLeagues,
  fetchLeagueTeams,
  fetchHomeGames,
} from '../../../../lib/veveto/api'
import { CONTESTS, BCF_CLUB_ID } from '../../../../lib/veveto/constants'
import { mapGameRow, mapStandingRow } from '../../../../lib/veveto/map'

/* Fetches matches + standings for one contest and builds the insert rows. */
async function collectContest(contest) {
  const season = await fetchActiveSeason(contest.id)
  const leagues = await fetchLeagues(contest.id, season.id)

  const leagueTeamPairs = await Promise.all(
    leagues.map(async lg => ({ league: lg, teams: await fetchLeagueTeams(contest.id, season.id, lg.id) }))
  )
  const bcfLeagues = leagueTeamPairs.filter(pair =>
    pair.teams.some(t => t.club_id === BCF_CLUB_ID)
  )

  const games = await fetchHomeGames(contest.id, season.id)
  const matchRows = games.map(g => mapGameRow(g, contest.spielart))

  const standingRows = bcfLeagues.flatMap(({ league, teams }) =>
    teams.map((team, idx) => mapStandingRow(team, idx + 1, league, contest))
  )

  return { season, matchRows, standingRows, leaguesTotal: leagues.length, bcfLeaguesTotal: bcfLeagues.length }
}

export async function GET(request) {
  // CRON_SECRET prüfen — Vercel setzt es in Production automatisch
  // In Entwicklung ohne CRON_SECRET in .env.local wird der Endpunkt ohne Auth akzeptiert
  const cronSecret = process.env.CRON_SECRET
  const isProd = process.env.NODE_ENV === 'production'
  if (isProd && !cronSecret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  }
  if (cronSecret) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const dry = new URL(request.url).searchParams.get('dry') === 'true'

  // Per-contest try/catch: eine kaputte Disziplin lässt die andere unangetastet
  const results = await Promise.all(CONTESTS.map(async contest => {
    try {
      const data = await collectContest(contest)
      return { contest, ok: true, ...data }
    } catch (err) {
      return { contest, ok: false, error: err.message }
    }
  }))

  const warnings = results
    .filter(r => !r.ok)
    .map(r => `${r.contest.spielart}: ${r.error}`)

  const okResults = results.filter(r => r.ok)
  if (okResults.length === 0) {
    return NextResponse.json({ error: 'Alle Disziplinen fehlgeschlagen', warnings }, { status: 502 })
  }

  const allMatchRows = okResults.flatMap(r => r.matchRows)
  const allStandingRows = okResults.flatMap(r => r.standingRows)

  if (dry) {
    return NextResponse.json({
      dry: true,
      seasons: Object.fromEntries(okResults.map(r => [r.contest.spielart, { id: r.season.id, from: r.season.from, to: r.season.to }])),
      counts: {
        matchRows: allMatchRows.length,
        standingRows: allStandingRows.length,
        byContest: Object.fromEntries(okResults.map(r => [r.contest.spielart, { matches: r.matchRows.length, leagues: r.leaguesTotal, bcfLeagues: r.bcfLeaguesTotal, standings: r.standingRows.length }])),
      },
      warnings,
      matchRows: allMatchRows,
      standingRows: allStandingRows,
    })
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
  const incomingIds = allMatchRows.map(r => r.veveto_id)
  const created = incomingIds.filter(id => !existingIds.has(id)).length
  const updated = incomingIds.filter(id => existingIds.has(id)).length

  const { error: matchErr } = await supabase
    .from('veranstaltungen')
    .upsert(allMatchRows, { onConflict: 'veveto_id' })

  if (matchErr) {
    return NextResponse.json({ error: `Match upsert: ${matchErr.message}`, warnings }, { status: 500 })
  }

  // Standings-Replace pro Disziplin: Delete-then-insert, gescopt auf (season_id, spielart)
  const standingErrors = []
  for (const r of okResults) {
    if (r.standingRows.length === 0) continue
    const { error: delErr } = await supabase
      .from('veveto_tabellen')
      .delete()
      .eq('season_id', r.season.id)
      .eq('spielart', r.contest.spielart)
    if (delErr) { standingErrors.push(`${r.contest.spielart} delete: ${delErr.message}`); continue }
    const { error: insErr } = await supabase
      .from('veveto_tabellen')
      .insert(r.standingRows)
    if (insErr) standingErrors.push(`${r.contest.spielart} insert: ${insErr.message}`)
  }

  if (standingErrors.length === 0) {
    revalidatePath('/spiele')
  } else {
    warnings.push(...standingErrors)
  }

  return NextResponse.json({
    success: standingErrors.length === 0,
    created,
    updated,
    total: allMatchRows.length,
    seasons: Object.fromEntries(okResults.map(r => [r.contest.spielart, { id: r.season.id, from: r.season.from, to: r.season.to }])),
    byContest: Object.fromEntries(okResults.map(r => [r.contest.spielart, { matches: r.matchRows.length, leagues: r.leaguesTotal, bcfLeagues: r.bcfLeaguesTotal, standings: r.standingRows.length }])),
    warnings,
  })
}
