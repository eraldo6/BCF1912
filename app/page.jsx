import { AppContent } from "../components/app-content";
import { createClient } from "../lib/supabase/server";

export default async function Page() {
  const supabase = await createClient()
  const { data: galleryImages } = await supabase
    .from('galerie')
    .select('id, bild_url, titel')
    .eq('veroeffentlicht', true)
    .order('created_at', { ascending: false })

  const { data: beitraege } = await supabase
    .from('beitraege')
    .select('id, titel, subtitel, inhalt, bild_url, datum, created_at')
    .eq('veroeffentlicht', true)
    .eq('geloescht', false)
    .order('created_at', { ascending: false })

  const images = galleryImages ?? []
  const newsItems = (beitraege ?? []).map(b => ({
    id:      b.id,
    date:    b.datum,
    title:   b.titel,
    excerpt: b.subtitel,
    inhalt:  b.inhalt ?? null,
    bild_url: b.bild_url,
    noImage: !b.bild_url,
  }))

  const { data: turniereRaw } = await supabase
    .from('turniere')
    .select('id, name, turnierbeginn, disziplin, typ, href')
    .eq('veroeffentlicht', true)
    .eq('geloescht', false)
    .order('turnierbeginn', { ascending: true })

  const now = new Date()
  const allUpcoming = (turniereRaw ?? []).filter(t => new Date(t.turnierbeginn) >= now)
  const allPast = (turniereRaw ?? []).filter(t => new Date(t.turnierbeginn) < now)
  const hasPast = allPast.length > 0
  const upcoming = allUpcoming.slice(0, hasPast ? 3 : 4)
  const past = allPast.slice(-1)
  const turniere = [...upcoming, ...past]

  const { data: veranstaltungenRaw } = await supabase
    .from('veranstaltungen')
    .select('id, titel, kategorie, spielart, termin, termin_ende, ganztaegig, veroeffentlicht')
    .eq('veroeffentlicht', true)
    .eq('geloescht', false)
    .order('termin', { ascending: true })

  const veranstaltungen = (veranstaltungenRaw ?? []).map(v => {
    const dateKey = v.termin
      ? `${new Date(v.termin).getFullYear()}-${String(new Date(v.termin).getMonth()+1).padStart(2,'0')}-${String(new Date(v.termin).getDate()).padStart(2,'0')}`
      : null
    return { ...v, dateKey }
  }).filter(v => v.dateKey)

  return <AppContent galleryImages={images} newsItems={newsItems} turniere={turniere} veranstaltungen={veranstaltungen} />;
}
