"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Home, Trophy, Star, Target, TrendingUp, Award, Zap, Flame, BarChart3, Medal, Crown } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first lesson",
      icon: Star,
      unlocked: true,
      unlockedDate: "2025-01-01",
      rarity: "common",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: Flame,
      unlocked: true,
      unlockedDate: "2025-01-07",
      rarity: "rare",
    },
    {
      id: 3,
      name: "Knowledge Seeker",
      description: "Complete 10 courses",
      icon: Trophy,
      unlocked: true,
      unlockedDate: "2025-01-15",
      rarity: "epic",
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Get 100% on any assessment",
      icon: Target,
      unlocked: true,
      unlockedDate: "2025-01-20",
      rarity: "rare",
    },
    {
      id: 5,
      name: "Social Butterfly",
      description: "Connect with 5 community members",
      icon: Award,
      unlocked: false,
      rarity: "rare",
    },
    {
      id: 6,
      name: "Master Learner",
      description: "Complete 50 courses",
      icon: Crown,
      unlocked: false,
      rarity: "legendary",
    },
    {
      id: 7,
      name: "Speed Demon",
      description: "Complete a course in under 1 hour",
      icon: Zap,
      unlocked: false,
      rarity: "epic",
    },
    {
      id: 8,
      name: "Dedication",
      description: "Maintain a 30-day streak",
      icon: Medal,
      unlocked: false,
      rarity: "legendary",
    },
  ]

  const stats = {
    level: 12,
    currentXP: 2450,
    nextLevelXP: 3000,
    totalPoints: 12450,
    streak: 23,
    coursesCompleted: 18,
    hoursLearned: 47,
    achievementsUnlocked: 4,
  }

  const weeklyActivity = [
    { day: "Mon", hours: 2.5, completed: 3 },
    { day: "Tue", hours: 1.5, completed: 2 },
    { day: "Wed", hours: 3, completed: 4 },
    { day: "Thu", hours: 2, completed: 2 },
    { day: "Fri", hours: 1, completed: 1 },
    { day: "Sat", hours: 0, completed: 0 },
    { day: "Sun", hours: 2.5, completed: 3 },
  ]

  const leaderboard = [
    { rank: 1, name: "Sarah M.", points: 15230, avatar: "SM" },
    { rank: 2, name: "John D.", points: 14890, avatar: "JD" },
    { rank: 3, name: "You", points: 12450, avatar: "ME", isCurrentUser: true },
    { rank: 4, name: "Emma W.", points: 11200, avatar: "EW" },
    { rank: 5, name: "Michael R.", points: 10850, avatar: "MR" },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "oklch(0.70_0.08_240)"
      case "rare":
        return "oklch(0.60_0.15_240)"
      case "epic":
        return "oklch(0.70_0.15_290)"
      case "legendary":
        return "oklch(0.75_0.15_60)"
      default:
        return "oklch(0.70_0.08_240)"
    }
  }

  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Your Progress</h1>
              <p className="text-muted-foreground">Track your learning journey and achievements</p>
            </div>
          </div>
        </header>

        {/* Level Progress Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary to-secondary text-white border-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-white/80 mb-1">Current Level</div>
              <div className="text-5xl font-bold">Level {stats.level}</div>
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10" />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {stats.level + 1}</span>
              <span className="font-bold">
                {stats.currentXP} / {stats.nextLevelXP} XP
              </span>
            </div>
            <Progress value={(stats.currentXP / stats.nextLevelXP) * 100} className="h-3 bg-white/20" />
          </div>

          <p className="text-sm text-white/80">
            Only {stats.nextLevelXP - stats.currentXP} XP until you level up! Keep learning to unlock new rewards.
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="w-12 h-12 bg-[oklch(0.75_0.15_60)]/10 rounded-2xl flex items-center justify-center mb-3">
              <Flame className="w-6 h-6 text-[oklch(0.75_0.15_60)]" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-[oklch(0.60_0.15_240)]/10 rounded-2xl flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-[oklch(0.60_0.15_240)]" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.coursesCompleted}</div>
            <div className="text-sm text-muted-foreground">Courses Done</div>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-[oklch(0.72_0.12_180)]/10 rounded-2xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-[oklch(0.72_0.12_180)]" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.hoursLearned}h</div>
            <div className="text-sm text-muted-foreground">Time Invested</div>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 bg-[oklch(0.70_0.15_290)]/10 rounded-2xl flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-[oklch(0.70_0.15_290)]" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.achievementsUnlocked}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Activity & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Activity */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Weekly Activity</h2>
                </div>

                <div className="flex gap-2">
                  {["week", "month", "year"].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className="rounded-lg capitalize"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end h-full">
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{ height: `${(day.hours / maxHours) * 100}%`, minHeight: day.hours > 0 ? "8px" : "0" }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">{day.day}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">12.5h</div>
                  <div className="text-sm text-muted-foreground">Total this week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-muted-foreground">Activities completed</div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[oklch(0.75_0.15_60)]/10 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[oklch(0.75_0.15_60)]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Achievements</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Leaderboard */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Medal className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Leaderboard</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {leaderboard.map((user) => (
                  <div key={user.name} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">{user.avatar}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.points} Points</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
