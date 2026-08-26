"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function OAuthCallbackContent() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = params.get("token") || ""

    if (token) {
      try {
        localStorage.setItem("auth_token", token)
      } catch {}
    }

    router.replace("/")
  }, [params, router])

  return null
}

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <OAuthCallbackContent />
    </Suspense>
  )
}