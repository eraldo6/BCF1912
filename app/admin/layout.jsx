import { SessionTimeout } from './session-timeout'

export default function AdminLayout({ children }) {
  return (
    <>
      <SessionTimeout />
      {children}
    </>
  )
}
