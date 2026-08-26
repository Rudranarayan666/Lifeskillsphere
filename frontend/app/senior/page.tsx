"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Heart,
  Home,
  Volume2,
  BookOpen,
  Users,
  Brain,
  Sun,
  Moon,
  Menu,
  Play,
  Pause,
  Quote,
  Video,
  Music,
  Book,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

export default function SeniorDashboard() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<number | null>(null)
  const [dailyQuote, setDailyQuote] = useState("")
  const [bgColor, setBgColor] = useState("oklch(0.75_0.08_150)")
  const [completedModules, setCompletedModules] = useState<number[]>([])

  const getMoodColor = () => {
    switch (selectedFeeling) {
      case "Good":
        return "oklch(0.75_0.08_150)"
      case "Neutral":
        return "oklch(0.75_0.1_200)"
      case "Stressed":
        return "oklch(0.70_0.12_290)"
      case "Peaceful":
        return "oklch(0.72_0.12_180)"
      default:
        return "oklch(0.75_0.08_150)"
    }
  }

  const getBookSuggestions = () => {
    switch (selectedFeeling) {
      case "Good":
        return [
          { title: "The Art of Happiness", author: "Dalai Lama", description: "Finding joy in everyday life" },
          { title: "Ikigai", author: "Héctor García", description: "The Japanese secret to a long and happy life" },
          {
            title: "The Book of Joy",
            author: "Dalai Lama & Desmond Tutu",
            description: "Lasting happiness in a changing world",
          },
        ]
      case "Stressed":
        return [
          {
            title: "The Relaxation Response",
            author: "Herbert Benson",
            description: "Simple meditation for stress relief",
          },
          {
            title: "Wherever You Go, There You Are",
            author: "Jon Kabat-Zinn",
            description: "Mindfulness meditation in everyday life",
          },
          { title: "The Power of Now", author: "Eckhart Tolle", description: "A guide to spiritual enlightenment" },
        ]
      case "Peaceful":
        return [
          {
            title: "Peace Is Every Step",
            author: "Thich Nhat Hanh",
            description: "The path of mindfulness in everyday life",
          },
          {
            title: "The Miracle of Mindfulness",
            author: "Thich Nhat Hanh",
            description: "An introduction to the practice of meditation",
          },
          { title: "Stillness Speaks", author: "Eckhart Tolle", description: "Whispers of now" },
        ]
      default:
        return [
          { title: "Being Mortal", author: "Atul Gawande", description: "Medicine and what matters in the end" },
          {
            title: "The Gifts of Imperfection",
            author: "Brené Brown",
            description: "Let go of who you think you're supposed to be",
          },
          { title: "Man's Search for Meaning", author: "Viktor Frankl", description: "Finding purpose in life" },
        ]
    }
  }

  useEffect(() => {
    if (selectedFeeling) {
      setBgColor(getMoodColor())
    }
  }, [selectedFeeling])

  const feelings = [
    { label: "Good", color: "oklch(0.75_0.08_150)" },
    { label: "Neutral", color: "oklch(0.75_0.1_200)" },
    { label: "Stressed", color: "oklch(0.70_0.12_290)" },
    { label: "Peaceful", color: "oklch(0.72_0.12_180)" },
  ]

  const epicQuotes = [
    "Do your duty without attachment to the results. - Bhagavad Gita",
    "The mind is everything. What you think, you become. - Mahabharata",
    "Truth alone triumphs, not falsehood. - Mundaka Upanishad",
    "One who sees inaction in action, and action in inaction, is wise among mortals. - Bhagavad Gita",
    "The greatest wealth is to live content with little. - Ramayana",
    "He who has conquered himself is a far greater hero than he who has defeated a thousand times a thousand men. - Buddha",
    "When you are inspired by some great purpose, all your thoughts break their bonds. - Patanjali",
    "The soul is neither born, nor does it die. - Bhagavad Gita",
    "Anger is the enemy of the soul. Control it with patience and wisdom. - Mahabharata",
    "Dharma protects those who protect it. - Manusmriti",
  ]

  useEffect(() => {
    setDailyQuote(epicQuotes[Math.floor(Math.random() * epicQuotes.length)])
  }, [])

  const audioFiles = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "Peaceful flute music for morning calm",
      duration: "15:00",
      url: "/meditation-music.jpg",
    },
    {
      id: 2,
      title: "Nature Sounds",
      description: "Gentle rain and forest ambience",
      duration: "20:00",
      url: "/nature-sounds.png",
    },
    {
      id: 3,
      title: "Sitar Relaxation",
      description: "Traditional Indian classical music",
      duration: "18:00",
      url: "/sitar-music.jpg",
    },
  ]

  const videoLinks = [
    {
      id: 1,
      title: "Guided Meditation for Seniors",
      description: "10-minute gentle meditation practice",
      duration: "10:23",
      thumbnail: "/meditation-senior.jpg",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
    },
    {
      id: 2,
      title: "Breathing Exercises for Stress Relief",
      description: "Simple breathing techniques for relaxation",
      duration: "8:15",
      thumbnail: "/breathing-exercises.png",
      url: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    },
    {
      id: 3,
      title: "Gentle Yoga for Seniors",
      description: "Easy chair yoga for flexibility and calm",
      duration: "15:40",
      thumbnail: "/senior-yoga.jpg",
      url: "https://www.youtube.com/watch?v=4pKly2JojMw",
    },
    {
      id: 4,
      title: "Body Scan Meditation",
      description: "Progressive relaxation for deep rest",
      duration: "12:30",
      thumbnail: "/body-scan-meditation.png",
      url: "https://www.youtube.com/watch?v=15q-N-_kkrU",
    },
    {
      id: 5,
      title: "Morning Stretches for Seniors",
      description: "Gentle stretching routine to start your day",
      duration: "10:15",
      thumbnail: "/morning-stretch.jpg",
      url: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
    },
    {
      id: 6,
      title: "Mindful Walking Meditation",
      description: "Meditation practice while walking",
      duration: "14:20",
      thumbnail: "/walking-meditation.png",
      url: "https://www.youtube.com/watch?v=3Qv-_Z8Qb_Q",
    },
  ]

  const learningModules = [
    {
      id: 1,
      title: "Using Smartphones & Tablets",
      description: "Learn to use modern devices with confidence",
      duration: "30 min",
      icon: Brain,
      lessons: ["Making calls and video chats", "Sending messages", "Taking and sharing photos", "Using helpful apps"],
    },
    {
      id: 2,
      title: "Staying Connected Online",
      description: "Connect with family and friends digitally",
      duration: "25 min",
      icon: Users,
      lessons: ["Email basics", "Social media for seniors", "Video calling", "Online safety tips"],
    },
    {
      id: 3,
      title: "Memory & Brain Health",
      description: "Exercises to keep your mind sharp",
      duration: "20 min",
      icon: Brain,
      lessons: ["Memory games", "Brain exercises", "Healthy habits", "Staying mentally active"],
    },
    {
      id: 4,
      title: "Managing Daily Wellness",
      description: "Simple routines for better health",
      duration: "35 min",
      icon: Heart,
      lessons: ["Morning routines", "Medication management", "Healthy eating", "Light exercise"],
    },
  ]

  const todayActivities = [
    {
      title: "Morning Meditation",
      description: "Gentle 15-minute guided session",
      duration: "15 min",
      icon: Sun,
      type: "Audio",
    },
    {
      title: "Memory Exercise",
      description: "Fun daily cognitive challenge",
      duration: "10 min",
      icon: Brain,
      type: "Interactive",
    },
    {
      title: "Evening Reflection",
      description: "Peaceful wind-down practice",
      duration: "12 min",
      icon: Moon,
      type: "Audio",
    },
  ]

  const recentTopics = [
    { title: "Staying Connected with Family", category: "Social Connection", progress: 80 },
    { title: "Managing Daily Wellness", category: "Health", progress: 65 },
    { title: "Memory & Focus Tips", category: "Cognitive Health", progress: 45 },
  ]

  const moodColor = bgColor

  return (
    <div
      className="min-h-screen transition-all duration-[3000ms] ease-in-out relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${moodColor}15, ${moodColor}05, oklch(0.98 0.01 150))`,
      }}
    >
      <div
        className="absolute top-32 right-32 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-[3000ms]"
        style={{ backgroundColor: `${moodColor}20` }}
      />
      <div
        className="absolute bottom-32 left-32 w-96 h-96 rounded-full blur-3xl animate-float transition-all duration-[3000ms]"
        style={{ backgroundColor: `${moodColor}15`, animationDelay: "2s" }}
      />

      <div className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        {/* Header with larger text */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-2xl bg-transparent text-base">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
              <p className="text-lg text-muted-foreground">Your daily wellness companion</p>
            </div>
          </div>

          <Button variant="outline" size="icon" className="rounded-2xl md:hidden bg-transparent w-12 h-12">
            <Menu className="w-6 h-6" />
          </Button>
        </header>

        {/* Main Grid with larger spacing */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: `${moodColor}30` }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-[3000ms]"
                  style={{ backgroundColor: `${moodColor}20` }}
                >
                  <Quote className="w-8 h-8" style={{ color: moodColor }} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-3">Wisdom of the Day</h3>
                  <p className="text-xl font-medium leading-relaxed text-balance italic">{dailyQuote}</p>
                </div>
              </div>
            </Card>

            {/* Feeling Check with large buttons */}
            <Card className="p-8 border-2 bg-white/90 backdrop-blur-sm" style={{ borderColor: `${moodColor}30` }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.75_0.08_150)] to-[oklch(0.75_0.1_200)] rounded-3xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">How Are You Feeling?</h2>
                  <p className="text-base text-muted-foreground">Take a moment to check in with yourself</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {feelings.map((feeling) => (
                  <button
                    key={feeling.label}
                    onClick={() => setSelectedFeeling(feeling.label)}
                    className={`p-6 rounded-3xl border-3 transition-all duration-[3000ms] text-lg font-medium ${
                      selectedFeeling === feeling.label ? "scale-105 shadow-lg" : "hover:scale-102"
                    }`}
                    style={
                      selectedFeeling === feeling.label
                        ? {
                            borderColor: feeling.color,
                            backgroundColor: `${feeling.color}15`,
                          }
                        : { borderColor: "oklch(0.92 0.01 280)" }
                    }
                  >
                    {feeling.label}
                  </button>
                ))}
              </div>

              {selectedFeeling && (
                <div
                  className="mt-6 p-6 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 transition-all duration-[3000ms]"
                  style={{ backgroundColor: `${moodColor}15` }}
                >
                  <p className="text-lg font-medium mb-2" style={{ color: moodColor }}>
                    Thank you for sharing that you're feeling {selectedFeeling.toLowerCase()}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    We've selected some calming activities that might help you today.
                  </p>
                </div>
              )}
            </Card>

            {selectedFeeling && (
              <Card className="p-8 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-[3000ms]"
                    style={{ backgroundColor: `${moodColor}20` }}
                  >
                    <Book className="w-8 h-8" style={{ color: moodColor }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Recommended Books</h2>
                    <p className="text-base text-muted-foreground">Based on how you're feeling</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {getBookSuggestions().map((book, index) => (
                    <div
                      key={index}
                      className="p-6 bg-muted/30 rounded-3xl hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                      <p className="text-base text-muted-foreground mb-2">by {book.author}</p>
                      <p className="text-base leading-relaxed">{book.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Featured Audio Session with large controls */}
            <Card className="p-8 bg-gradient-to-br from-[oklch(0.75_0.08_150)]/10 to-[oklch(0.75_0.1_200)]/10 border-2 border-[oklch(0.75_0.08_150)]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.75_0.08_150)] to-[oklch(0.75_0.1_200)] rounded-3xl flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Today's Meditation</h2>
                  <p className="text-base text-muted-foreground">Mindful Morning Body Scan</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border-2 border-border">
                <div className="flex items-center justify-center mb-6">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.08 150)" }}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[oklch(0.75_0.08_150)] w-1/3 rounded-full transition-all duration-1000" />
                  </div>
                  <div className="flex justify-between text-base text-muted-foreground">
                    <span>5:00</span>
                    <span>15:00</span>
                  </div>
                </div>

                <p className="text-center text-base text-muted-foreground mt-6 leading-relaxed">
                  A gentle guided meditation to start your day with calm and clarity
                </p>
              </div>
            </Card>

            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-[3000ms]"
                  style={{ backgroundColor: `${moodColor}20` }}
                >
                  <BookOpen className="w-8 h-8" style={{ color: moodColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Learning Modules</h2>
                  <p className="text-base text-muted-foreground">Build new skills at your own pace</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {learningModules.map((module) => (
                  <div
                    key={module.id}
                    className="p-6 bg-muted/30 rounded-3xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${moodColor}20` }}
                      >
                        <module.icon className="w-6 h-6" style={{ color: moodColor }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-balance">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{module.description}</p>
                        <p className="text-sm text-muted-foreground">{module.duration}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {module.lessons.map((lesson, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2
                            className={`w-4 h-4 ${completedModules.includes(module.id) ? "text-green-500" : "text-muted-foreground"}`}
                          />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => {
                        if (!completedModules.includes(module.id)) {
                          setCompletedModules([...completedModules, module.id])
                        }
                      }}
                      className="w-full rounded-2xl text-base h-12 transition-all duration-[3000ms]"
                      style={{ backgroundColor: moodColor }}
                      disabled={completedModules.includes(module.id)}
                    >
                      {completedModules.includes(module.id) ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Module
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Calming Music */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-[3000ms]"
                  style={{ backgroundColor: `${moodColor}20` }}
                >
                  <Music className="w-8 h-8" style={{ color: moodColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Calming Music</h2>
                  <p className="text-base text-muted-foreground">Peaceful audio for relaxation</p>
                </div>
              </div>

              <div className="space-y-4">
                {audioFiles.map((audio) => (
                  <div
                    key={audio.id}
                    className="p-6 bg-muted/30 rounded-3xl hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-6">
                      <Button
                        size="lg"
                        onClick={() => {
                          setCurrentAudio(audio.id)
                          setIsPlaying(!isPlaying)
                        }}
                        className="w-16 h-16 rounded-full flex-shrink-0 transition-all duration-500"
                        style={{ backgroundColor: moodColor }}
                      >
                        {isPlaying && currentAudio === audio.id ? (
                          <Pause className="w-6 h-6" />
                        ) : (
                          <Play className="w-6 h-6 ml-1" />
                        )}
                      </Button>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{audio.title}</h3>
                        <p className="text-base text-muted-foreground mb-3">{audio.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            Audio
                          </span>
                          <span>{audio.duration}</span>
                        </div>
                      </div>
                    </div>

                    {isPlaying && currentAudio === audio.id && (
                      <div className="mt-4 space-y-2">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ backgroundColor: moodColor, width: "35%" }}
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>5:15</span>
                          <span>{audio.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Activities with large cards */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Suggested Activities</h2>

              <div className="space-y-4">
                {todayActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="p-6 border-2 border-border rounded-3xl hover:border-[oklch(0.75_0.08_150)]/30 hover:shadow-md transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-[oklch(0.75_0.08_150)]/10 rounded-3xl flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-8 h-8 text-[oklch(0.75_0.08_150)]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">{activity.description}</p>
                          </div>
                          <Button
                            size="lg"
                            className="rounded-2xl text-base px-6"
                            style={{ backgroundColor: "oklch(0.75 0.08 150)" }}
                          >
                            <Play className="w-5 h-5 mr-2" />
                            Start
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                          <span className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4" />
                            {activity.type}
                          </span>
                          <span>{activity.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Meditation & Wellness Videos */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-[3000ms]"
                  style={{ backgroundColor: `${moodColor}20` }}
                >
                  <Video className="w-8 h-8" style={{ color: moodColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Meditation & Wellness Videos</h2>
                  <p className="text-base text-muted-foreground">Guided practices for peace and health</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {videoLinks.map((video) => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="p-4 bg-muted/30 rounded-3xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <div className="relative mb-4 rounded-2xl overflow-hidden">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div
                            className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-[3000ms]"
                            style={{ backgroundColor: moodColor }}
                          >
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-balance">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{video.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Video className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Progress & Quick Access */}
          <div className="space-y-8">
            {/* Your Progress with large text */}
            <Card className="p-8 bg-gradient-to-br from-[oklch(0.75_0.08_150)] to-[oklch(0.75_0.1_200)] text-white border-0">
              <h2 className="text-2xl font-bold mb-6">Your Progress</h2>

              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">12</div>
                  <div className="text-lg text-white/90">Days of practice</div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <div className="text-4xl font-bold mb-2">8</div>
                  <div className="text-lg text-white/90">Activities completed</div>
                </div>

                <div className="pt-6 border-t border-white/20">
                  <div className="text-4xl font-bold mb-2">3h</div>
                  <div className="text-lg text-white/90">Time invested</div>
                </div>
              </div>
            </Card>

            {/* Recent Topics with large text */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>

              <div className="space-y-4">
                {recentTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-5 bg-muted/30 rounded-3xl hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <h3 className="text-lg font-bold mb-2 text-balance">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{topic.category}</p>
                    <div className="h-2.5 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[oklch(0.75_0.08_150)] rounded-full transition-all duration-1000"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Access with large buttons */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Quick Access</h2>

              <div className="space-y-3">
                <Button className="w-full justify-start rounded-2xl text-base h-14 bg-transparent" variant="outline">
                  <BookOpen className="w-5 h-5 mr-3" />
                  My Journal
                </Button>
                <Button className="w-full justify-start rounded-2xl text-base h-14 bg-transparent" variant="outline">
                  <Users className="w-5 h-5 mr-3" />
                  Community
                </Button>
                <Button className="w-full justify-start rounded-2xl text-base h-14 bg-transparent" variant="outline">
                  <Heart className="w-5 h-5 mr-3" />
                  Wellness Tips
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
