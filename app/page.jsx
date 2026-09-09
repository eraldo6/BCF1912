import { AppContent } from "../components/app-content";
import { createClient } from "../lib/supabase/server";

export default async function Page() {
  const supabase = await createClient()
  const { data: galleryImages } = await supabase
    .from('galerie')
    .select('id, bild_url, titel, is_hero')
    .eq('veroeffentlicht', true)
    .order('created_at', { ascending: false })

  const images = galleryImages ?? []
  const heroImage = images.find(i => i.is_hero)?.bild_url ?? images[0]?.bild_url ?? null
  return <AppContent galleryImages={images} heroBg={heroImage} />;
}
