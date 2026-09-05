import { AppContent } from "../components/app-content";
import { createClient } from "../lib/supabase/server";

export default async function Page() {
  const supabase = await createClient()
  const { data: galleryImages } = await supabase
    .from('galerie')
    .select('id, bild_url, titel')
    .eq('veroeffentlicht', true)
    .order('created_at', { ascending: false })

  return <AppContent galleryImages={galleryImages ?? []} />;
}
