"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Lock, CheckCircle2, Circle, Star } from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  description: string
  status: "locked" | "available" | "in-progress" | "completed"
  progress: number
  prerequisites: string[]
  points: number
}

export default function SkillTreePage() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  const skills: Skill[] = [
    {
      id: "self-awareness",
      name: "Self-Awareness",
      description: "Understanding your emotions, strengths, and weaknesses",
      status: "completed",
      progress: 100,
      prerequisites: [],
      points: 100,
    },
    {
      id: "emotional-regulation",
      name: "Emotional Regulation",
      description: "Managing and controlling your emotional responses",
      status: "in-progress",
      progress: 65,
      prerequisites: ["self-awareness"],
      points: 150,
    },
    {
      id: "empathy",
      name: "Empathy",
      description: "Understanding and sharing the feelings of others",
      status: "available",
      progress: 0,
      prerequisites: ["self-awareness"],
      points: 120,
    },
    {
      id: "active-listening",
      name: "Active Listening",
      description: "Fully concentrating and understanding what others say",
      status: "completed",
      progress: 100,
      prerequisites: [],
      points: 100,
    },
    {
      id: "assertive-communication",
      name: "Assertive Communication",
      description: "Expressing yourself clearly and confidently",
      status: "in-progress",
      progress: 40,
      prerequisites: ["active-listening"],
      points: 150,
    },
    {
      id: "conflict-resolution",
      name: "Conflict Resolution",
      description: "Resolving disagreements constructively",
      status: "locked",
      progress: 0,
      prerequisites: ["empathy", "assertive-communication"],
      points: 200,
    },
    {
      id: "goal-setting",
      name: "Goal Setting",
      description: "Creating and achieving meaningful objectives",
      status: "available",
      progress: 0,
      prerequisites: ["self-awareness"],
      points: 120,
    },
    {
      id: "time-management",
      name: "Time Management",
      description: "Organizing and planning your time effectively",
      status: "locked",
      progress: 0,
      prerequisites: ["goal-setting"],
      points: 150,
    },
    {
      id: "stress-management",
      name: "Stress Management",
      description: "Coping with and reducing stress in healthy ways",
      status: "available",
      progress: 0,
      prerequisites: ["emotional-regulation"],
      points: 180,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "oklch(0.72_0.12_180)"
      case "in-progress":
        return "oklch(0.75_0.15_60)"
      case "available":
        return "oklch(0.60_0.15_240)"
      case "locked":
        return "oklch(0.70_0.08_240)"
      default:
        return "oklch(0.70_0.08_240)"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle2
      case "in-progress":
        return Circle
      case "available":
        return Star
      case "locked":
        return Lock
      default:
        return Circle
    }
  }

  const totalPoints = skills.filter((s) => s.status === "completed").reduce((sum, s) => sum + s.points, 0)

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
              <h1 className="text-3xl font-bold">Skill Tree</h1>
              <p className="text-muted-foreground">Track your life skills development journey</p>
            </div>
          </div>

          <Card className="p-4">
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Skill Points</div>
          </Card>
        </header>

        {/* Legend */}
        <Card className="p-4 mb-8">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="w-5 h-5 text-[oklch(0.75_0.15_60)]" />
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[oklch(0.60_0.15_240)]" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Locked</span>
            </div>
          </div>
        </Card>

        {/* Skill Tree Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skills.map((skill) => {
            const StatusIcon = getStatusIcon(skill.status)
            const color = getStatusColor(skill.status)

            return (
              <Card
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                  selectedSkill?.id === skill.id
                    ? "border-primary shadow-lg scale-105"
                    : "hover:border-primary/30 hover:shadow-md"
                } ${skill.status === "locked" ? "opacity-60" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}/0.1` }}
                  >
                    <StatusIcon className="w-6 h-6" style={{ color }} />
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color }}>
                      +{skill.points}
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>

                {skill.progress > 0 && skill.progress < 100 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.progress}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                )}

                {skill.prerequisites.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Requires: {skill.prerequisites.map((p) => skills.find((s) => s.id === p)?.name).join(", ")}
                  </div>
                )}

                {skill.status === "available" && (
                  <Button className="w-full mt-4 rounded-xl" style={{ backgroundColor: color }}>
                    Start Learning
                  </Button>
                )}

                {skill.status === "in-progress" && (
                  <Button className="w-full mt-4 rounded-xl" style={{ backgroundColor: color }}>
                    Continue
                  </Button>
                )}
              </Card>
            )
          })}
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <Card className="p-8 border-2 border-primary/30">
            <h2 className="text-2xl font-bold mb-4">{selectedSkill.name}</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">{selectedSkill.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-bold capitalize">{selectedSkill.status.replace("-", " ")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Points</div>
                <div className="font-bold">+{selectedSkill.points}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Progress</div>
                <div className="font-bold">{selectedSkill.progress}%</div>
              </div>
            </div>

            {selectedSkill.status !== "locked" && (
              <Button size="lg" className="rounded-xl">
                {selectedSkill.status === "completed"
                  ? "Review Skill"
                  : selectedSkill.status === "in-progress"
                    ? "Continue Learning"
                    : "Start Learning"}
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
