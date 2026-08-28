import { createClient } from '../../lib/supabase/server'
import { SessionTimeout } from './session-timeout'

export default async function AdminLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {user && <SessionTimeout />}
      {children}
    </>
  )
}
