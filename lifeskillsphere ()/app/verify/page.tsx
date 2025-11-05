"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { apiFetch } from "@/lib/api"

export default function VerifyPage() {
  const params = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const e = params.get('email') || ''
    setEmail(e)
  }, [params])

  async function submit() {
    if (!email || code.length !== 6) return
    setSubmitting(true)
    try {
      const res = await apiFetch('/api/auth/verify-email-code', {
        method: 'POST',
        body: JSON.stringify({ email, code })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(err?.message || 'Invalid or expired code')
        return
      }
      alert('Verified! Please sign in again.')
      router.push('/login')
    } finally {
      setSubmitting(false)
    }
  }

  async function resend() {
    if (!email) return
    await apiFetch('/api/auth/resend-verification-code', { method: 'POST', body: JSON.stringify({ email }) })
    alert('Verification code resent')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-2">Verify your email</h1>
        <p className="text-sm text-muted-foreground mb-6">Enter the 6-digit code sent to {email || 'your email'}.</p>
        <div className="flex justify-center mb-6">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button className="w-full mb-3" disabled={code.length !== 6 || submitting} onClick={submit}>Verify</Button>
        <Button variant="outline" className="w-full" onClick={resend}>Resend code</Button>
      </Card>
    </div>
  )
}


