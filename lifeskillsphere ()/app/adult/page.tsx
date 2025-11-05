"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Brain,
  TrendingUp,
  Target,
  Calendar,
  Clock,
  BookOpen,
  Briefcase,
  DollarSign,
  Heart,
  Home,
  Menu,
  ChevronRight,
  Play,
  CheckCircle2,
  Quote,
  Trophy,
  Plus,
  X,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function AdultDashboard() {
  const [moodValue, setMoodValue] = useState(7)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [dailyQuote, setDailyQuote] = useState("")
  const [bgColor, setBgColor] = useState(
    "from-[oklch(0.92_0.10_290)] via-[oklch(0.94_0.08_200)] to-[oklch(0.96_0.12_120)]",
  )
  const [goals, setGoals] = useState([
    { id: 1, title: "Complete Communication Course", progress: 40, target: 100 },
    { id: 2, title: "Practice Daily Meditation", progress: 70, target: 100 },
  ])
  const [newGoal, setNewGoal] = useState("")
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([1, 2])
  const [earnedBadges, setEarnedBadges] = useState<string[]>(["Communication Starter"])

  const moodLabels = ["Very Low", "Low", "Moderate", "Good", "Excellent"]
  const moodIndex = Math.floor((moodValue - 1) / 2)

  const getMoodGradient = (value: number) => {
    if (value <= 2) return "from-[oklch(0.88_0.12_240)] via-[oklch(0.90_0.10_250)] to-[oklch(0.92_0.08_260)]"
    if (value <= 4) return "from-[oklch(0.90_0.10_200)] via-[oklch(0.92_0.08_210)] to-[oklch(0.94_0.06_220)]"
    if (value <= 6) return "from-[oklch(0.92_0.10_290)] via-[oklch(0.94_0.08_200)] to-[oklch(0.96_0.12_120)]"
    if (value <= 8) return "from-[oklch(0.94_0.12_180)] via-[oklch(0.96_0.10_190)] to-[oklch(0.98_0.08_200)]"
    return "from-[oklch(0.95_0.15_60)] via-[oklch(0.97_0.12_50)] to-[oklch(0.99_0.10_70)]"
  }

  useEffect(() => {
    setBgColor(getMoodGradient(moodValue))
  }, [moodValue])

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you've ever wanted is on the other side of fear. - George Addair",
    "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
  ]

  useEffect(() => {
    // Set a random quote on mount
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  const courseContent = {
    title: "Effective Communication Mastery",
    description: "Master the art of clear, confident communication in professional and personal settings",
    progress: (completedLessons.length / 4) * 100,
    lessons: [
      {
        id: 1,
        title: "Introduction to Active Listening",
        duration: "12 min",
        content:
          "Active listening is the foundation of effective communication. It involves fully concentrating on what is being said rather than just passively hearing the message. Key techniques include: maintaining eye contact, nodding to show understanding, asking clarifying questions, and summarizing what you've heard. Practice this daily in conversations to build stronger relationships.",
        videoUrl: "https://www.youtube.com/watch?v=rzsVh8YwZEQ",
        completed: completedLessons.includes(1),
      },
      {
        id: 2,
        title: "Non-Verbal Communication Signals",
        duration: "15 min",
        content:
          "Your body language speaks volumes. Studies show that 55% of communication is non-verbal. Learn to read and use: facial expressions, posture, gestures, eye contact, and personal space. Understanding these signals helps you communicate more effectively and read others better. Practice mirroring positive body language in your next meeting.",
        videoUrl: "https://www.youtube.com/watch?v=5cQoGNEcc5Q",
        completed: completedLessons.includes(2),
      },
      {
        id: 3,
        title: "Assertive Communication Techniques",
        duration: "18 min",
        content:
          "Assertiveness is about expressing your thoughts, feelings, and needs in a direct, honest, and appropriate way. It's the balance between passive and aggressive communication. Practice using 'I' statements, setting clear boundaries, and saying no when necessary while respecting others. This builds confidence and mutual respect.",
        videoUrl: "https://www.youtube.com/watch?v=vlwmfiCb-vc",
        completed: completedLessons.includes(3),
      },
      {
        id: 4,
        title: "Handling Difficult Conversations",
        duration: "20 min",
        content:
          "Difficult conversations are inevitable in life and work. Learn strategies to: prepare mentally, choose the right time and place, stay calm under pressure, focus on solutions not blame, and follow up effectively. These skills will transform challenging interactions into opportunities for growth and understanding.",
        videoUrl: "https://www.youtube.com/watch?v=y-rEI4bezWc",
        completed: completedLessons.includes(4),
      },
    ],
  }

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId]
      setCompletedLessons(newCompleted)

      // Award badges based on progress
      if (newCompleted.length === 2 && !earnedBadges.includes("Communication Apprentice")) {
        setEarnedBadges([...earnedBadges, "Communication Apprentice"])
      }
      if (newCompleted.length === 4 && !earnedBadges.includes("Communication Master")) {
        setEarnedBadges([...earnedBadges, "Communication Master"])
      }
    }
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), title: newGoal, progress: 0, target: 100 }])
      setNewGoal("")
      setShowAddGoal(false)
    }
  }

  const updateGoalProgress = (id: number, progress: number) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, progress: Math.min(progress, g.target) } : g)))
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
  }

  const courses = [
    {
      title: "Financial Planning Fundamentals",
      category: "Financial Literacy",
      progress: 65,
      duration: "4h 30m",
      icon: DollarSign,
      color: "oklch(0.60_0.15_240)",
    },
    {
      title: "Effective Communication Skills",
      category: "Career Development",
      progress: courseContent.progress,
      duration: "3h 15m",
      icon: Briefcase,
      color: "oklch(0.72_0.12_180)",
      hasContent: true,
    },
    {
      title: "Stress Management Techniques",
      category: "Wellness",
      progress: 85,
      duration: "2h 45m",
      icon: Heart,
      color: "oklch(0.68_0.15_35)",
    },
  ]

  const todaySchedule = [
    { time: "09:00", title: "Morning Reflection", completed: true },
    { time: "12:30", title: "Negotiation Skills Module", completed: true },
    { time: "18:00", title: "Evening Meditation", completed: false },
  ]

  const stats = [
    { label: "Courses Completed", value: "12", icon: BookOpen, change: "+2 this month" },
    { label: "Learning Streak", value: "23", icon: TrendingUp, change: "days" },
    { label: "Skill Points", value: "1,240", icon: Target, change: "+180 this week" },
    { label: "Hours Invested", value: "47", icon: Clock, change: "this month" },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColor} transition-all duration-[3000ms] ease-in-out animate-gradient relative overflow-hidden`}
    >
      <div className="absolute top-20 right-20 w-72 h-72 bg-[oklch(0.60_0.15_240)]/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 left-20 w-80 h-80 bg-[oklch(0.72_0.12_180)]/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-[oklch(0.68_0.15_35)]/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="absolute top-1/4 left-1/5 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl">
          <Briefcase className="w-10 h-10 text-[oklch(0.60_0.15_240)]" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/5 animate-float" style={{ animationDelay: "2.5s" }}>
        <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl">
          <Target className="w-10 h-10 text-[oklch(0.72_0.12_180)]" />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 animate-float" style={{ animationDelay: "3.5s" }}>
        <div className="w-20 h-20 bg-white/70 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl">
          <Trophy className="w-10 h-10 text-[oklch(0.68_0.15_35)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Professional</h1>
              <p className="text-sm text-muted-foreground">Continue your growth journey</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl hidden md:flex bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl md:hidden bg-transparent">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[oklch(0.60_0.15_240)]/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-[oklch(0.60_0.15_240)]" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-[oklch(0.60_0.15_240)] font-medium">{stat.change}</div>
            </Card>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[oklch(0.68_0.15_35)]/10 to-[oklch(0.72_0.12_180)]/10 border-2 border-[oklch(0.68_0.15_35)]/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Daily Inspiration</h3>
                  <p className="text-lg font-medium leading-relaxed text-balance italic">{dailyQuote}</p>
                </div>
              </div>
            </Card>

            {/* Mood Tracking */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.60_0.15_240)] to-[oklch(0.72_0.12_180)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Daily Check-In</h2>
                    <p className="text-sm text-muted-foreground">How are you feeling today?</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Energy Level</span>
                  <span className="text-sm font-bold text-[oklch(0.60_0.15_240)]">{moodLabels[moodIndex]}</span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodValue}
                  onChange={(e) => setMoodValue(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[oklch(0.60_0.15_240)] [&::-webkit-slider-thumb]:cursor-pointer"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>High</span>
                </div>

                <div className="p-4 bg-[oklch(0.60_0.15_240)]/5 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-3">Quick journal entry (optional)</p>
                  <textarea
                    placeholder="What's on your mind today? Any challenges or wins to note?"
                    className="w-full p-3 bg-background border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[oklch(0.60_0.15_240)]/20"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" className="rounded-lg">
                      Save Entry
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">My Goals</h2>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowAddGoal(!showAddGoal)}
                  className="rounded-lg bg-gradient-to-r from-[oklch(0.68_0.15_35)] to-[oklch(0.72_0.12_180)]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Goal
                </Button>
              </div>

              {showAddGoal && (
                <div className="mb-4 p-4 bg-muted/30 rounded-xl">
                  <Input
                    placeholder="Enter your goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addGoal()}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addGoal} className="rounded-lg">
                      Add
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddGoal(false)} className="rounded-lg">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-balance">{goal.title}</h3>
                      <Button size="sm" variant="ghost" onClick={() => deleteGoal(goal.id)} className="h-6 w-6 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateGoalProgress(goal.id, goal.progress + 10)}
                          className="rounded-lg text-xs"
                        >
                          +10%
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateGoalProgress(goal.id, goal.progress + 25)}
                          className="rounded-lg text-xs"
                        >
                          +25%
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {currentLesson === null ? (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Continue Learning</h2>
                  <Button variant="ghost" size="sm" className="text-[oklch(0.60_0.15_240)]">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="p-4 border-2 border-border rounded-xl hover:border-[oklch(0.60_0.15_240)]/30 hover:shadow-sm transition-all duration-300 cursor-pointer group"
                      onClick={() => course.hasContent && setCurrentLesson(0)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${course.color}15` }}
                        >
                          <course.icon className="w-6 h-6" style={{ color: course.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold text-balance mb-1">{course.title}</h3>
                              <p className="text-xs text-muted-foreground">{course.category}</p>
                            </div>
                            <Button
                              size="sm"
                              className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{ backgroundColor: course.color }}
                            >
                              <Play className="w-3 h-3 mr-1" />
                              {course.hasContent ? "View Course" : "Continue"}
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{Math.round(course.progress)}% complete</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{courseContent.title}</h2>
                    <p className="text-sm text-muted-foreground">{courseContent.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentLesson(null)} className="rounded-xl">
                    Back
                  </Button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Course Progress</span>
                    <span className="text-muted-foreground">{Math.round(courseContent.progress)}%</span>
                  </div>
                  <Progress value={courseContent.progress} className="h-2" />
                </div>

                {earnedBadges.length > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-br from-[oklch(0.75_0.15_60)]/10 to-[oklch(0.70_0.18_50)]/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-[oklch(0.75_0.15_60)]" />
                      <h3 className="font-bold">Your Badges</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {earnedBadges.map((badge, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-[oklch(0.75_0.15_60)] to-[oklch(0.70_0.18_50)] text-white rounded-full text-sm font-medium"
                        >
                          🏆 {badge}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {courseContent.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        lesson.completed
                          ? "border-[oklch(0.72_0.12_180)]/30 bg-[oklch(0.72_0.12_180)]/5"
                          : "border-border hover:border-[oklch(0.60_0.15_240)]/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            lesson.completed ? "bg-[oklch(0.72_0.12_180)]/20" : "bg-[oklch(0.60_0.15_240)]/10"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
                          ) : (
                            <span className="text-sm font-bold text-[oklch(0.60_0.15_240)]">{index + 1}</span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-bold mb-1">{lesson.title}</h3>
                              <p className="text-xs text-muted-foreground mb-3">{lesson.duration}</p>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{lesson.content}</p>

                          <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-[oklch(0.60_0.15_240)] hover:underline mb-3"
                          >
                            <Play className="w-4 h-4" />
                            Watch Video Lesson
                          </a>

                          {!lesson.completed && (
                            <div className="mt-3">
                              <Button
                                size="sm"
                                onClick={() => completeLesson(lesson.id)}
                                className="rounded-lg bg-gradient-to-r from-[oklch(0.60_0.15_240)] to-[oklch(0.72_0.12_180)]"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Mark as Complete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {completedLessons.length === 4 && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-[oklch(0.75_0.15_60)]/10 to-[oklch(0.70_0.18_50)]/10 rounded-xl text-center">
                    <Trophy className="w-12 h-12 text-[oklch(0.75_0.15_60)] mx-auto mb-3" />
                    <h3 className="text-xl font-bold mb-2">Course Completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      Congratulations! You've mastered Effective Communication Skills.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[oklch(0.75_0.15_60)] to-[oklch(0.70_0.18_50)] text-white rounded-full font-medium">
                      <Award className="w-5 h-5" />
                      Communication Master Badge Earned!
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* Recommended Content */}
            <Card className="p-6 bg-gradient-to-br from-[oklch(0.60_0.15_240)]/5 to-[oklch(0.72_0.12_180)]/5 border-[oklch(0.60_0.15_240)]/20">
              <h2 className="text-xl font-bold mb-4">Recommended for You</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-xl border border-border hover:border-[oklch(0.60_0.15_240)]/30 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-[oklch(0.60_0.15_240)]/10 rounded-lg flex items-center justify-center mb-3">
                    <Target className="w-4 h-4 text-[oklch(0.60_0.15_240)]" />
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Goal Setting Workshop</h3>
                  <p className="text-xs text-muted-foreground mb-2">Based on your progress</p>
                  <span className="text-xs text-[oklch(0.60_0.15_240)] font-medium">45 min • Video</span>
                </div>

                <div className="p-4 bg-background rounded-xl border border-border hover:border-[oklch(0.72_0.12_180)]/30 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-[oklch(0.72_0.12_180)]/10 rounded-lg flex items-center justify-center mb-3">
                    <Heart className="w-4 h-4 text-[oklch(0.72_0.12_180)]" />
                  </div>
                  <h3 className="font-bold mb-1 text-sm">Work-Life Balance Audit</h3>
                  <p className="text-xs text-muted-foreground mb-2">Psychometric test</p>
                  <span className="text-xs text-[oklch(0.72_0.12_180)] font-medium">15 min • Assessment</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Schedule & Quick Actions */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Today's Schedule</h2>

              <div className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      item.completed ? "bg-[oklch(0.60_0.15_240)]/5" : "bg-muted/30"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.completed ? "bg-[oklch(0.60_0.15_240)]/10" : "bg-background"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.60_0.15_240)]" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground mb-1">{item.time}</div>
                      <div className={`text-sm font-medium ${item.completed ? "line-through opacity-60" : ""}`}>
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 rounded-xl bg-transparent" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Full Schedule
              </Button>
            </Card>

            {/* Progress Overview */}
            <Card className="p-6 bg-gradient-to-br from-[oklch(0.60_0.15_240)] to-[oklch(0.72_0.12_180)] text-white border-0">
              <h2 className="text-lg font-bold mb-4">This Month's Progress</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Goal</span>
                    <span className="font-bold">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-white/20" />
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-2xl font-bold mb-1">18 hours</div>
                  <div className="text-sm text-white/80">Learning time this month</div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-2xl font-bold mb-1">5 skills</div>
                  <div className="text-sm text-white/80">Improved significantly</div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>

              <div className="space-y-2">
                <Button className="w-full justify-start rounded-xl bg-transparent" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Journal
                </Button>
                <Button className="w-full justify-start rounded-xl bg-transparent" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Skill Assessment
                </Button>
                <Button className="w-full justify-start rounded-xl bg-transparent" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Progress Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
