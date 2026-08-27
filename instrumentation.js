export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url.includes('your-project') || key.includes('your-anon-key')) {
    console.warn('⚠️  Supabase: .env.local nicht konfiguriert')
    return
  }

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const { error } = await supabase.from('auto').select('id').limit(1)

    if (error) {
      console.error('❌ Supabase Verbindung fehlgeschlagen:', error.message)
    } else {
      console.log('✅ Supabase Verbindung OK')
    }
  } catch (err) {
    console.error('❌ Supabase Fehler:', err.message)
  }
}
