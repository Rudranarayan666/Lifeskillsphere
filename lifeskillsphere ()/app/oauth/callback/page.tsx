"use client"

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function OAuthCallbackPage() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = params.get('token') || ''
    if (token) {
      try {
        localStorage.setItem('auth_token', token)
      } catch {}
    }
    router.replace('/')
  }, [params, router])

  return null
}


