"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Search,
  Filter,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Clock,
  Star,
  Play,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Emotional Intelligence", "Communication", "Financial", "Wellness", "Career"]

  const content = [
    {
      id: 1,
      title: "Understanding Your Emotions",
      description: "Learn to identify and manage your emotional responses effectively",
      category: "Emotional Intelligence",
      type: "Video",
      duration: "45 min",
      difficulty: "Beginner",
      rating: 4.8,
      progress: 60,
      icon: Video,
    },
    {
      id: 2,
      title: "Active Listening Skills",
      description: "Master the art of truly hearing and understanding others",
      category: "Communication",
      type: "Interactive",
      duration: "30 min",
      difficulty: "Intermediate",
      rating: 4.9,
      progress: 100,
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Budgeting Basics",
      description: "Create and maintain a personal budget that works for you",
      category: "Financial",
      type: "Course",
      duration: "2h 15min",
      difficulty: "Beginner",
      rating: 4.7,
      progress: 30,
      icon: FileText,
    },
    {
      id: 4,
      title: "Stress Management Meditation",
      description: "Guided meditation practices for daily stress relief",
      category: "Wellness",
      type: "Audio",
      duration: "20 min",
      difficulty: "Beginner",
      rating: 4.9,
      progress: 0,
      icon: Headphones,
    },
    {
      id: 5,
      title: "Conflict Resolution at Work",
      description: "Navigate workplace disagreements with confidence",
      category: "Career",
      type: "Video",
      duration: "1h 10min",
      difficulty: "Advanced",
      rating: 4.6,
      progress: 0,
      icon: Video,
    },
    {
      id: 6,
      title: "Building Self-Confidence",
      description: "Develop a stronger sense of self-worth and capability",
      category: "Emotional Intelligence",
      type: "Course",
      duration: "3h 30min",
      difficulty: "Intermediate",
      rating: 4.8,
      progress: 45,
      icon: BookOpen,
    },
  ]

  const filteredContent = content.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "oklch(0.72_0.12_180)"
      case "Intermediate":
        return "oklch(0.75_0.15_60)"
      case "Advanced":
        return "oklch(0.60_0.15_240)"
      default:
        return "oklch(0.70_0.08_240)"
    }
  }

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
              <h1 className="text-3xl font-bold">Content Library</h1>
              <p className="text-muted-foreground">Explore courses, videos, and resources</p>
            </div>
          </div>

          <Link href="/skills">
            <Button className="rounded-xl">
              <TrendingUp className="w-4 h-4 mr-2" />
              Skill Tree
            </Button>
          </Link>
        </header>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border-2 border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold mb-1">24</div>
            <div className="text-sm text-muted-foreground">Total Courses</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold mb-1">8</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold mb-1">12</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold mb-1">47h</div>
            <div className="text-sm text-muted-foreground">Learning Time</div>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => (
            <Card
              key={item.id}
              className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${getDifficultyColor(item.difficulty)}/0.1` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: getDifficultyColor(item.difficulty) }} />
                </div>

                {item.progress === 100 && (
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold mb-2 text-balance">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${getDifficultyColor(item.difficulty)}/0.1`,
                    color: getDifficultyColor(item.difficulty),
                  }}
                >
                  {item.difficulty}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.duration}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </span>
              </div>

              {item.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              )}

              <Button className="w-full rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 mr-2" />
                {item.progress > 0 && item.progress < 100 ? "Continue" : item.progress === 100 ? "Review" : "Start"}
              </Button>
            </Card>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No content found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
