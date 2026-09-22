import { VEVETO_BASE } from './constants'

/* Wraps fetch with a consistent error surface for VeVeTo endpoints. */
async function httpGet(url) {
  const res = await fetch(url, { next: { revalidate: 0 } })
  if (!res.ok) throw new Error(`VeVeTo HTTP ${res.status} (${url})`)
  const json = await res.json()
  if (!Array.isArray(json?.data)) throw new Error(`Unerwartetes Antwortformat (${url})`)
  return json.data
}

/* Returns every season for the given contest. */
export function fetchSeasons(contestId) {
  return httpGet(`${VEVETO_BASE}/api/${contestId}/public/seasons?draw=1&start=0&length=500`)
}

/* Returns the single row with active === 1; throws if none or several. */
export async function fetchActiveSeason(contestId) {
  const seasons = await fetchSeasons(contestId)
  const active = seasons.filter(s => s.active === 1)
  if (active.length === 0) throw new Error(`Keine aktive Saison für contest ${contestId}`)
  if (active.length > 1) throw new Error(`${active.length} aktive Saisons für contest ${contestId}`)
  return active[0]
}

/* Returns the league rows for a season. */
export function fetchLeagues(contestId, seasonId) {
  return httpGet(`${VEVETO_BASE}/api/${contestId}/season/${seasonId}/leagues/public?draw=1&start=0&length=500`)
}

/* Returns the pre-sorted team standings for one league. */
export function fetchLeagueTeams(contestId, seasonId, leagueId) {
  return httpGet(`${VEVETO_BASE}/api/${contestId}/season/${seasonId}/league/${leagueId}/teams?draw=1&start=0&length=500`)
}

/* Returns BCF home games for a season. */
export function fetchHomeGames(contestId, seasonId) {
  return httpGet(`${VEVETO_BASE}/api/${contestId}/season/${seasonId}/club/26/home/game/list?draw=1&start=0&length=10000`)
}
