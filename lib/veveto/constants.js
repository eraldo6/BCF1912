/* VeVeTo public API constants shared by the sync route and helpers. */

export const VEVETO_BASE = 'https://hpbv-veveto.de'

/* Contest ids match the VeVeTo path segment; spielart matches veranstaltungen.spielart. */
export const CONTESTS = [
  { id: 1, spielart: 'Pool' },
  { id: 2, spielart: 'Snooker' },
]

/* Club id 26 identifies BC Frankfurt 1912 in the VeVeTo database. */
export const BCF_CLUB_ID = 26

/* Maps the two-letter league code to its full German name. */
export const STAFFEL_NAMEN = {
  LL: 'Landesliga',
  BL: 'Bezirksliga',
  VL: 'Verbandsliga',
  OL: 'Oberliga',
}
