import { STAFFEL_NAMEN } from './constants'

/* Parst deutsches Datumsformat "DD.MM.YYYY HH:mm" zu ISO 8601 mit korrektem
   deutschen Timezone-Offset (CEST Apr–Okt = UTC+2, CET Nov–Mär = UTC+1). */
export function parseGermanDate(dateStr) {
  const [datePart, timePart] = dateStr.split(' ')
  const [day, month, year] = datePart.split('.').map(Number)
  const offset = month >= 4 && month <= 10 ? '+02:00' : '+01:00'
  return (
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` +
    `T${timePart}:00${offset}`
  )
}

/* Builds the human-readable Titel for a fixture row. */
export function buildTitel(game, spielart) {
  const staffel = STAFFEL_NAMEN[game.league_name] ?? game.league_name
  return `${spielart} Heimspiel ${staffel} | ${game.day}. Spieltag: ${game.homeTeamName} vs. ${game.guestTeamName}`
}

/* Maps a VeVeTo game row to a veranstaltungen insert row. */
export function mapGameRow(game, spielart) {
  return {
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
    dauer_stunden:  3,
    quelle:         'VeVeTo Import',
    erstellt_von:   null,
  }
}

/* Maps a VeVeTo team row (pre-sorted by rank) to a veveto_tabellen insert row.
   `league` must have { id, name, number } from the leagues endpoint.
   `contest` must have { id, spielart }. */
export function mapStandingRow(team, rank, league, contest) {
  return {
    contest_id:        contest.id,
    spielart:          contest.spielart,
    season_id:         team.season_id,
    league_id:         league.id,
    staffel_code:      league.name,
    staffel_nr:        league.number ?? null,
    staffel_name_full: STAFFEL_NAMEN[league.name] ?? league.name,
    team_id:           team.id,
    team_name:         team.name,
    club_id:           team.club_id,
    rank,
    played:            Number(team.team_played_count ?? 0),
    wins:              Number(team.team_winner_count ?? 0),
    draws:             Number(team.team_draw_count ?? 0),
    losses:            Number(team.team_loser_count ?? 0),
    points:            Number(team.team_points ?? 0),
    diff:              Number(team.team_diff ?? 0),
    bcf_in_league:     true,
  }
}
