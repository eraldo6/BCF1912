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

  return <AppContent galleryImages={images} newsItems={newsItems} />;
}
