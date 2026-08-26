"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Sparkles,
  Heart,
  Brain,
  Users,
  ArrowRight,
  Star,
  Zap,
  Target,
  Trophy,
  Smile,
  Rocket,
  Palette,
  Music,
  TrendingUp,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const essentialVideos = [
    {
      id: 1,
      title: "Emotional Intelligence Basics",
      thumbnail: "/emotional-intelligence-learning.jpg",
      url: "https://www.youtube.com/watch?v=Y7m9eNoB3NU",
      duration: "12:45",
    },
    {
      id: 2,
      title: "Effective Communication Skills",
      thumbnail: "/communication-skills-training.png",
      url: "https://www.youtube.com/watch?v=HAnw168huqA",
      duration: "15:30",
    },
    {
      id: 3,
      title: "Time Management Mastery",
      thumbnail: "/time-management-productivity.png",
      url: "https://www.youtube.com/watch?v=iONDebHX9qk",
      duration: "10:20",
    },
    {
      id: 4,
      title: "Building Resilience",
      thumbnail: "/resilience-mental-strength.jpg",
      url: "https://www.youtube.com/watch?v=M1CHPnZfFmU",
      duration: "14:15",
    },
  ]

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % essentialVideos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + essentialVideos.length) % essentialVideos.length)
  }

  useEffect(() => {
    const interval = setInterval(nextVideo, 5000)
    return () => clearInterval(interval)
  }, [])

  const lifeSkillsCategories = [
    {
      icon: Brain,
      title: "Cognitive Skills",
      description: "Critical thinking, problem-solving, and decision-making",
      color: "oklch(0.68 0.15 35)",
    },
    {
      icon: Heart,
      title: "Emotional Intelligence",
      description: "Self-awareness, empathy, and emotional regulation",
      color: "oklch(0.72 0.12 180)",
    },
    {
      icon: Users,
      title: "Social Skills",
      description: "Communication, collaboration, and relationship building",
      color: "oklch(0.70 0.18 50)",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Planning, motivation, and achievement strategies",
      color: "oklch(0.60 0.15 240)",
    },
    {
      icon: Shield,
      title: "Resilience",
      description: "Stress management, adaptability, and mental strength",
      color: "oklch(0.75 0.15 60)",
    },
    {
      icon: TrendingUp,
      title: "Personal Growth",
      description: "Self-improvement, learning, and continuous development",
      color: "oklch(0.65 0.12 290)",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.98_0.02_120)] via-[oklch(0.97_0.03_180)] via-[oklch(0.96_0.02_240)] to-[oklch(0.95_0.03_290)] animate-gradient relative overflow-hidden">
      <div className="absolute top-20 left-10 w-40 h-40 bg-[oklch(0.85_0.15_350)]/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-40 right-20 w-48 h-48 bg-[oklch(0.80_0.18_180)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-40 left-1/4 w-44 h-44 bg-[oklch(0.82_0.16_50)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-52 h-52 bg-[oklch(0.78_0.20_270)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 right-1/3 w-40 h-40 bg-[oklch(0.84_0.17_120)]/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/3 left-1/2 w-36 h-36 bg-gradient-to-br from-[oklch(0.75_0.22_30)] to-[oklch(0.72_0.25_50)]/50 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "5s" }}
      />
      <div
        className="absolute top-1/5 right-1/6 w-36 h-36 bg-gradient-to-br from-[oklch(0.70_0.25_330)] to-[oklch(0.75_0.22_350)]/50 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "7s" }}
      />
      <div
        className="absolute bottom-1/5 right-1/2 w-36 h-36 bg-gradient-to-br from-[oklch(0.65_0.22_200)] to-[oklch(0.70_0.25_220)]/50 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "8s" }}
      />
      <div
        className="absolute top-3/4 left-1/2 w-36 h-36 bg-gradient-to-br from-[oklch(0.72_0.25_290)] to-[oklch(0.68_0.22_310)]/50 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "9s" }}
      />

      {/* Themed floating skill icons */}
      <div className="absolute top-1/4 left-1/4 animate-float animate-spin-slow" style={{ animationDelay: "0.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.75_0.25_350)] to-[oklch(0.70_0.22_10)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Brain className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float animate-bounce-slow" style={{ animationDelay: "1.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.70_0.25_350)] to-[oklch(0.75_0.20_10)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Heart className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float animate-pulse-slow" style={{ animationDelay: "2.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.72_0.22_50)] to-[oklch(0.68_0.25_70)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Star className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/4 right-1/3 animate-float animate-wiggle" style={{ animationDelay: "3.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.65_0.25_180)] to-[oklch(0.70_0.22_200)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Zap className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute top-2/3 left-1/5 animate-float animate-spin-slow" style={{ animationDelay: "4.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.70_0.20_270)] to-[oklch(0.65_0.25_290)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Target className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute top-1/2 right-1/5 animate-float animate-bounce-slow" style={{ animationDelay: "5.5s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.75_0.22_30)] to-[oklch(0.72_0.25_50)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Trophy className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/2 left-1/6 animate-float animate-pulse-slow" style={{ animationDelay: "6s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.68_0.25_120)] to-[oklch(0.72_0.22_140)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Smile className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute top-1/5 right-1/6 animate-float animate-wiggle" style={{ animationDelay: "7s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.70_0.25_330)] to-[oklch(0.75_0.22_350)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Rocket className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute bottom-1/5 right-1/2 animate-float animate-spin-slow" style={{ animationDelay: "8s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.65_0.22_200)] to-[oklch(0.70_0.25_220)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Palette className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="absolute top-3/4 left-1/2 animate-float animate-bounce-slow" style={{ animationDelay: "9s" }}>
        <div className="w-24 h-24 bg-gradient-to-br from-[oklch(0.72_0.25_290)] to-[oklch(0.68_0.22_310)] backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl">
          <Music className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] rounded-2xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[oklch(0.68_0.15_35)] via-[oklch(0.72_0.12_180)] to-[oklch(0.68_0.15_35)] bg-clip-text text-transparent">
              LifeSkillSphere
            </h1>
          </div>
          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-full bg-white/80 backdrop-blur-sm border-2 hover:scale-105 transition-transform"
            >
              Sign In
            </Button>
          </Link>
        </header>

        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-pulse-glow">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Holistic Life Skills Enhancement</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Grow Your Skills,
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Transform Your Life
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Personalized resources, mood tracking, and gamified learning tailored to your age and goals. Build
            resilience, enhance decision-making, and unlock your full potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-full text-lg px-8 group bg-gradient-to-r from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] hover:shadow-xl transition-all"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-lg px-8 bg-white/80 backdrop-blur-sm border-2 hover:scale-105 transition-transform"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Life Skills Categories Section */}
        <div className="relative z-10 max-w-6xl mx-auto mb-32">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Essential Life Skills</h3>
          <p className="text-center text-muted-foreground mb-12 text-pretty">
            Develop the skills that matter most for success and well-being
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeSkillsCategories.map((category, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon className="w-7 h-7" style={{ color: category.color }} />
                </div>
                <h4 className="font-bold text-lg mb-2">{category.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Age Selection Cards */}
        <div className="relative z-10 max-w-6xl mx-auto mb-32">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Choose Your Journey</h3>
          <p className="text-center text-muted-foreground mb-12 text-pretty">
            Select your age group for a personalized experience designed just for you
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Youth Card (0-18) */}
            <Link href="/youth">
              <Card
                className="relative overflow-hidden p-8 border-2 hover:border-[oklch(0.70_0.18_50)] transition-all duration-500 cursor-pointer group"
                onMouseEnter={() => setHoveredCard("youth")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.70_0.18_50)]/10 to-[oklch(0.75_0.15_60)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-2xl font-bold mb-3 text-balance">Youth Explorer</h4>
                  <p className="text-sm text-muted-foreground mb-4">Ages 0-18</p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Playful, energetic learning with gamified quests, animated videos, and interactive exercises for
                    emotional regulation and social skills.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-[oklch(0.70_0.18_50)]/10 text-[oklch(0.70_0.18_50)] rounded-full text-xs font-medium">
                      Emotional Skills
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.70_0.18_50)]/10 text-[oklch(0.70_0.18_50)] rounded-full text-xs font-medium">
                      Goal Setting
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.70_0.18_50)]/10 text-[oklch(0.70_0.18_50)] rounded-full text-xs font-medium">
                      Social Skills
                    </span>
                  </div>

                  <div className="flex items-center text-[oklch(0.70_0.18_50)] font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Adult Card (18-54) */}
            <Link href="/adult">
              <Card
                className="relative overflow-hidden p-8 border-2 hover:border-[oklch(0.60_0.15_240)] transition-all duration-500 cursor-pointer group"
                onMouseEnter={() => setHoveredCard("adult")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.60_0.15_240)]/10 to-[oklch(0.72_0.12_180)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.60_0.15_240)] to-[oklch(0.72_0.12_180)] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Brain className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-2xl font-bold mb-3 text-balance">Professional Growth</h4>
                  <p className="text-sm text-muted-foreground mb-4">Ages 18-54</p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Professional, focused development with structured courses, case studies, and tools for career
                    advancement and life balance.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-[oklch(0.60_0.15_240)]/10 text-[oklch(0.60_0.15_240)] rounded-full text-xs font-medium">
                      Career Development
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.60_0.15_240)]/10 text-[oklch(0.60_0.15_240)] rounded-full text-xs font-medium">
                      Financial Literacy
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.60_0.15_240)]/10 text-[oklch(0.60_0.15_240)] rounded-full text-xs font-medium">
                      Stress Management
                    </span>
                  </div>

                  <div className="flex items-center text-[oklch(0.60_0.15_240)] font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Senior Card (54+) */}
            <Link href="/senior">
              <Card
                className="relative overflow-hidden p-8 border-2 hover:border-[oklch(0.75_0.08_150)] transition-all duration-500 cursor-pointer group"
                onMouseEnter={() => setHoveredCard("senior")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.75_0.08_150)]/10 to-[oklch(0.75_0.1_200)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.75_0.08_150)] to-[oklch(0.75_0.1_200)] rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Heart className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-2xl font-bold mb-3 text-balance">Wisdom & Wellness</h4>
                  <p className="text-sm text-muted-foreground mb-4">Ages 54+</p>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Calm, clear guidance with audio meditations, simple tutorials, and resources for cognitive vitality
                    and social connection.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-[oklch(0.75_0.08_150)]/10 text-[oklch(0.75_0.08_150)] rounded-full text-xs font-medium">
                      Cognitive Health
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.75_0.08_150)]/10 text-[oklch(0.75_0.08_150)] rounded-full text-xs font-medium">
                      Wellness
                    </span>
                    <span className="px-3 py-1 bg-[oklch(0.75_0.08_150)]/10 text-[oklch(0.75_0.08_150)] rounded-full text-xs font-medium">
                      Social Connection
                    </span>
                  </div>

                  <div className="flex items-center text-[oklch(0.75_0.08_150)] font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* 3D Video Carousel Section */}
        <div className="relative z-10 max-w-6xl mx-auto mb-32">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Essential Life Skills Videos</h3>
          <p className="text-center text-muted-foreground mb-12 text-pretty">
            Watch and learn from expert-curated content
          </p>

          <div className="relative perspective-1000">
            <div className="relative h-[400px] flex items-center justify-center">
              {essentialVideos.map((video, index) => {
                const offset = index - currentVideoIndex
                const absOffset = Math.abs(offset)
                const isActive = offset === 0

                return (
                  <a
                    key={video.id}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute transition-all duration-700 ease-out cursor-pointer group"
                    style={{
                      transform: `
                        translateX(${offset * 280}px)
                        translateZ(${isActive ? 0 : -200}px)
                        rotateY(${offset * -15}deg)
                        scale(${isActive ? 1 : 0.8})
                      `,
                      opacity: absOffset > 1 ? 0 : isActive ? 1 : 0.5,
                      zIndex: isActive ? 10 : 10 - absOffset,
                      pointerEvents: absOffset > 1 ? "none" : "auto",
                    }}
                  >
                    <Card className="w-[350px] overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2 text-balance">{video.title}</h4>
                        <p className="text-sm text-muted-foreground">Click to watch on YouTube</p>
                      </div>
                    </Card>
                  </a>
                )
              })}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={prevVideo}
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="flex gap-2">
                {essentialVideos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentVideoIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextVideo}
                size="icon"
                variant="outline"
                className="rounded-full w-12 h-12 bg-white/80 backdrop-blur-sm hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 max-w-6xl mx-auto mt-32">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Everything You Need to Thrive</h3>
          <p className="text-center text-muted-foreground mb-16 text-pretty">
            Comprehensive tools designed to support your personal growth journey
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Mood Tracking</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track your emotional patterns and get personalized content recommendations
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-bold mb-2">Skill Tree</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unlock new abilities as you progress through gamified learning paths
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary/30 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h4 className="font-bold mb-2">Secure Counseling</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access private, encrypted support when you need it most
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold mb-2">Personalized Content</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curated resources that adapt to your age, goals, and progress
              </p>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-32 pt-12 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">LifeSkillSphere</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 LifeSkillSphere. Dedicated to Creativity, Culture & Growth.
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}
