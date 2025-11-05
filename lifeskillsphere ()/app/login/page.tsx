"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, ArrowRight, Brain, Heart, Star, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      if (res.status === 403) {
        // not verified -> go to verify screen
        router.push(`/verify?email=${encodeURIComponent(email)}`)
        return
      }
      if (!res.ok) {
        alert('Invalid credentials')
        return
      }
      const data = await res.json()
      if (data?.token) {
        localStorage.setItem('auth_token', data.token)
      }
      // Navigate based on section if available
      const section = data?.user?.section || ''
      if (section.toLowerCase().includes('youth')) router.push('/youth')
      else if (section.toLowerCase().includes('adult')) router.push('/adult')
      else if (section.toLowerCase().includes('senior')) router.push('/senior')
      else router.push('/')
    } catch (e) {
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.95_0.08_50)] via-[oklch(0.92_0.12_180)] to-[oklch(0.90_0.10_290)] animate-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[oklch(0.70_0.18_50)]/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-40 right-20 w-48 h-48 bg-[oklch(0.72_0.12_180)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-40 left-1/4 w-40 h-40 bg-[oklch(0.68_0.15_35)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-36 h-36 bg-[oklch(0.75_0.15_60)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating skill icons */}
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Brain className="w-8 h-8 text-[oklch(0.60_0.15_240)]" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-[oklch(0.68_0.15_35)]" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: "2.5s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Star className="w-8 h-8 text-[oklch(0.75_0.15_60)]" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-float" style={{ animationDelay: "3.5s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Zap className="w-8 h-8 text-[oklch(0.72_0.12_180)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen relative z-10">
        <Card className="w-full max-w-md p-8 backdrop-blur-xl bg-white/95 border-2 border-white/50 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[oklch(0.68_0.15_35)] via-[oklch(0.72_0.12_180)] to-[oklch(0.68_0.15_35)] bg-clip-text text-transparent">
              LifeSkillSphere
            </h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">Continue your journey of growth and learning</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-2 focus:border-[oklch(0.68_0.15_35)] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-2 focus:border-[oklch(0.68_0.15_35)] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-2" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-[oklch(0.68_0.15_35)] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl text-base font-semibold group bg-gradient-to-r from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] hover:shadow-lg transition-all duration-300"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[oklch(0.68_0.15_35)] hover:underline font-semibold">
                Sign up free
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
