"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Lock, User, ArrowRight, Brain, Heart, Target, Trophy, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ageGroup, setAgeGroup] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!ageGroup) {
      newErrors.ageGroup = "Please select an age group"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Send verification email (simulated)
    setVerificationSent(true)
    setIsSubmitting(false)
  }

  if (verificationSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[oklch(0.92_0.10_290)] via-[oklch(0.94_0.08_200)] to-[oklch(0.96_0.12_120)] animate-gradient relative overflow-hidden flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute top-10 left-20 w-40 h-40 bg-[oklch(0.75_0.15_60)]/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-1/4 right-10 w-56 h-56 bg-[oklch(0.60_0.15_240)]/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        <Card className="w-full max-w-md p-8 backdrop-blur-xl bg-white/95 border-2 border-white/50 shadow-2xl mx-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-3">Check Your Email!</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We've sent a verification link to <strong>{email}</strong>
            </p>

            <div className="p-6 bg-gradient-to-br from-[oklch(0.68_0.15_35)]/10 to-[oklch(0.72_0.12_180)]/10 rounded-2xl mb-6">
              <Mail className="w-12 h-12 text-[oklch(0.68_0.15_35)] mx-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click the verification link in your email to activate your account and start your learning journey!
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  // Simulate email verified, navigate to appropriate dashboard
                  if (ageGroup === "youth") router.push("/youth")
                  else if (ageGroup === "adult") router.push("/adult")
                  else if (ageGroup === "senior") router.push("/senior")
                }}
                size="lg"
                className="w-full h-12 rounded-xl text-base font-semibold group bg-gradient-to-r from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] hover:shadow-lg transition-all duration-300"
              >
                I've Verified My Email
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="w-full h-12 rounded-xl bg-transparent">
                Resend Verification Email
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Didn't receive the email? Check your spam folder or try resending.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.92_0.10_290)] via-[oklch(0.94_0.08_200)] to-[oklch(0.96_0.12_120)] animate-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-20 w-40 h-40 bg-[oklch(0.75_0.15_60)]/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-1/4 right-10 w-56 h-56 bg-[oklch(0.60_0.15_240)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-1/4 left-10 w-44 h-44 bg-[oklch(0.72_0.12_180)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-48 h-48 bg-[oklch(0.68_0.15_35)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Floating skill icons */}
      <div className="absolute top-1/3 left-1/4 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Target className="w-8 h-8 text-[oklch(0.70_0.18_50)]" />
        </div>
      </div>
      <div className="absolute top-1/4 right-1/3 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Trophy className="w-8 h-8 text-[oklch(0.75_0.15_60)]" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: "2.8s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Brain className="w-8 h-8 text-[oklch(0.60_0.15_240)]" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float" style={{ animationDelay: "3.5s" }}>
        <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-[oklch(0.68_0.15_35)]" />
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
            <h2 className="text-2xl font-bold mb-2">Start Your Journey</h2>
            <p className="text-muted-foreground">Create your account and unlock your potential</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  className={`pl-11 h-12 rounded-xl border-2 transition-colors ${
                    errors.name ? "border-red-500 focus:border-red-500" : "focus:border-[oklch(0.68_0.15_35)]"
                  }`}
                />
              </div>
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

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
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  className={`pl-11 h-12 rounded-xl border-2 transition-colors ${
                    errors.email ? "border-red-500 focus:border-red-500" : "focus:border-[oklch(0.68_0.15_35)]"
                  }`}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({ ...errors, password: "" })
                  }}
                  className={`pl-11 h-12 rounded-xl border-2 transition-colors ${
                    errors.password ? "border-red-500 focus:border-red-500" : "focus:border-[oklch(0.68_0.15_35)]"
                  }`}
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              <p className="text-xs text-muted-foreground">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Age Group</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAgeGroup("youth")
                    if (errors.ageGroup) setErrors({ ...errors, ageGroup: "" })
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    ageGroup === "youth"
                      ? "border-[oklch(0.70_0.18_50)] bg-[oklch(0.70_0.18_50)]/10 scale-105"
                      : errors.ageGroup
                        ? "border-red-500"
                        : "border-border hover:border-[oklch(0.70_0.18_50)]/50"
                  }`}
                >
                  <div className="text-xs font-medium">0-18</div>
                  <div className="text-xs text-muted-foreground">Youth</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAgeGroup("adult")
                    if (errors.ageGroup) setErrors({ ...errors, ageGroup: "" })
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    ageGroup === "adult"
                      ? "border-[oklch(0.60_0.15_240)] bg-[oklch(0.60_0.15_240)]/10 scale-105"
                      : errors.ageGroup
                        ? "border-red-500"
                        : "border-border hover:border-[oklch(0.60_0.15_240)]/50"
                  }`}
                >
                  <div className="text-xs font-medium">18-54</div>
                  <div className="text-xs text-muted-foreground">Adult</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAgeGroup("senior")
                    if (errors.ageGroup) setErrors({ ...errors, ageGroup: "" })
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    ageGroup === "senior"
                      ? "border-[oklch(0.75_0.08_150)] bg-[oklch(0.75_0.08_150)]/10 scale-105"
                      : errors.ageGroup
                        ? "border-red-500"
                        : "border-border hover:border-[oklch(0.75_0.08_150)]/50"
                  }`}
                >
                  <div className="text-xs font-medium">54+</div>
                  <div className="text-xs text-muted-foreground">Senior</div>
                </button>
              </div>
              {errors.ageGroup && <p className="text-sm text-red-500">{errors.ageGroup}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl text-base font-semibold group bg-gradient-to-r from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-[oklch(0.68_0.15_35)] hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
