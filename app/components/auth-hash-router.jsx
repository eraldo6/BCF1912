'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AuthHashRouter() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash && (hash.includes('type=invite') || hash.includes('type=recovery'))) {
      router.replace('/admin/update-password' + hash)
    }
  }, [router])

  return null
}
