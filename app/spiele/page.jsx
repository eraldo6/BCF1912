import SpieleContent from "./spiele-content";
import { createClient } from "../../lib/supabase/server";

export const metadata = {
  title: "Spiele — BC Frankfurt 1912",
  description: "Alle Ligaspiele, Turniere und Termine des BC Frankfurt 1912 e.V. — als Liste oder Kalender.",
};

export default async function SpielePage() {
  const supabase = await createClient();

  const [veranstaltungenRes, standingsRes] = await Promise.all([
    supabase
      .from('veranstaltungen')
      .select(`
        id, titel, kategorie, spielart, termin, termin_ende, ganztaegig,
        staffel, staffel_nr, spieltag, heimmannschaft, gastmannschaft,
        austragungsort, dauer_stunden, quelle, veveto_id, veroeffentlicht
      `)
      .eq('veroeffentlicht', true)
      .eq('geloescht', false)
      .order('termin', { ascending: true }),
    supabase
      .from('veveto_tabellen')
      .select('spielart, staffel_nr, staffel_code, staffel_name_full, league_id, rank, team_id, team_name, club_id, played, wins, draws, losses, points, diff')
      .eq('bcf_in_league', true)
      .order('spielart', { ascending: true })
      .order('staffel_nr', { ascending: true })
      .order('rank', { ascending: true }),
  ]);

  const veranstaltungen = (veranstaltungenRes.data ?? []).map(v => {
    const dateKey = v.termin
      ? `${new Date(v.termin).getFullYear()}-${String(new Date(v.termin).getMonth()+1).padStart(2,'0')}-${String(new Date(v.termin).getDate()).padStart(2,'0')}`
      : null;
    return { ...v, dateKey };
  }).filter(v => v.dateKey);

  /* Nach ${spielart}|${staffel_nr} gruppieren; jede Gruppe ist eine komplette Ligatabelle. */
  const standings = {};
  for (const r of standingsRes.data ?? []) {
    const k = `${r.spielart}|${r.staffel_nr}`;
    (standings[k] ??= {
      spielart: r.spielart,
      staffel_code: r.staffel_code,
      staffel_nr: r.staffel_nr,
      staffel_name_full: r.staffel_name_full,
      rows: [],
    }).rows.push(r);
  }

  return <SpieleContent veranstaltungen={veranstaltungen} standings={standings} />;
}
