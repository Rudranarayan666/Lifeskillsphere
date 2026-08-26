"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Star,
  Trophy,
  Target,
  Smile,
  Zap,
  BookOpen,
  Play,
  Award,
  TrendingUp,
  Home,
  Menu,
  Heart,
  Brain,
  Gamepad2,
  RefreshCw,
  Video,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function YouthDashboard() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [currentTest, setCurrentTest] = useState<number | null>(null)
  const [testAnswers, setTestAnswers] = useState<{ [key: number]: string }>({})
  const [points, setPoints] = useState(450)
  const [level, setLevel] = useState(5)
  const [bgColor, setBgColor] = useState(
    "from-[oklch(0.95_0.08_50)] via-[oklch(0.92_0.12_180)] to-[oklch(0.90_0.10_290)]",
  )
  const [currentGame, setCurrentGame] = useState<number | null>(null)
  const [memoryCards, setMemoryCards] = useState<
    { id: number; emotion: string; image: string; flipped: boolean; matched: boolean }[]
  >([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [breathCount, setBreathCount] = useState(0)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [kindnessScore, setKindnessScore] = useState(0)
  const [gamePerformance, setGamePerformance] = useState<{
    game: string
    score: number
    time: number
    feedback: string
  } | null>(null)
  const [gameStartTime, setGameStartTime] = useState<number>(0)
  const [testResults, setTestResults] = useState<{
    test: string
    score: number
    analysis: string
    skillImpact: { skill: string; impact: string }[]
  } | null>(null)

  const moods = [
    {
      emoji: "😊",
      label: "Happy",
      color: "oklch(0.75_0.15_60)",
      bgGradient: "from-[oklch(0.95_0.15_60)] via-[oklch(0.92_0.18_50)] to-[oklch(0.90_0.15_70)]",
    },
    {
      emoji: "😔",
      label: "Sad",
      color: "oklch(0.65_0.12_240)",
      bgGradient: "from-[oklch(0.90_0.12_240)] via-[oklch(0.88_0.10_250)] to-[oklch(0.86_0.08_260)]",
    },
    {
      emoji: "😰",
      label: "Anxious",
      color: "oklch(0.70_0.15_290)",
      bgGradient: "from-[oklch(0.92_0.15_290)] via-[oklch(0.90_0.12_280)] to-[oklch(0.88_0.10_300)]",
    },
    {
      emoji: "😎",
      label: "Cool",
      color: "oklch(0.72_0.12_180)",
      bgGradient: "from-[oklch(0.94_0.12_180)] via-[oklch(0.92_0.15_190)] to-[oklch(0.90_0.12_200)]",
    },
    {
      emoji: "😴",
      label: "Tired",
      color: "oklch(0.60_0.08_280)",
      bgGradient: "from-[oklch(0.88_0.08_280)] via-[oklch(0.86_0.06_270)] to-[oklch(0.84_0.05_290)]",
    },
    {
      emoji: "🤗",
      label: "Excited",
      color: "oklch(0.70_0.18_50)",
      bgGradient: "from-[oklch(0.95_0.18_50)] via-[oklch(0.93_0.20_40)] to-[oklch(0.91_0.18_60)]",
    },
  ]

  const handleMoodSelect = (mood: (typeof moods)[0]) => {
    setSelectedMood(mood.label)
    setBgColor(mood.bgGradient)
  }

  const games = [
    {
      id: 1,
      title: "Emotion Memory Match",
      description: "Match emotions to build emotional intelligence",
      icon: Brain,
      color: "oklch(0.70_0.18_50)",
    },
    {
      id: 2,
      title: "Breathing Buddy",
      description: "Learn calming breathing techniques",
      icon: Heart,
      color: "oklch(0.72_0.12_180)",
    },
    {
      id: 3,
      title: "Kindness Quest",
      description: "Practice empathy and kindness",
      icon: Sparkles,
      color: "oklch(0.75_0.15_60)",
    },
  ]

  const initMemoryGame = () => {
    const emotions = [
      { name: "Happy", image: "/happy-smiling-face.png" },
      { name: "Sad", image: "/sad-crying-face.png" },
      { name: "Angry", image: "/angry-mad-face.jpg" },
      { name: "Anxious", image: "/worried-anxious-face.jpg" },
      { name: "Cool", image: "/cool-sunglasses-face.jpg" },
      { name: "Excited", image: "/excited-happy-face.jpg" },
    ]
    const cards = [...emotions, ...emotions]
      .sort(() => Math.random() - 0.5)
      .map((emotion, index) => ({
        id: index,
        emotion: emotion.name,
        image: emotion.image,
        flipped: false,
        matched: false,
      }))
    setMemoryCards(cards)
    setFlippedCards([])
    setGameStartTime(Date.now())
  }

  const handleCardFlip = (id: number) => {
    if (flippedCards.length === 2 || memoryCards[id].matched || memoryCards[id].flipped) return

    const newCards = [...memoryCards]
    newCards[id].flipped = true
    setMemoryCards(newCards)

    const newFlipped = [...flippedCards, id]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (newCards[first].emotion === newCards[second].emotion) {
        setTimeout(() => {
          newCards[first].matched = true
          newCards[second].matched = true
          setMemoryCards(newCards)
          setFlippedCards([])
          setPoints(points + 10)

          if (newCards.every((card) => card.matched)) {
            const timeTaken = Math.floor((Date.now() - gameStartTime) / 1000)
            analyzeGamePerformance("Emotion Memory Match", timeTaken)
          }
        }, 500)
      } else {
        setTimeout(() => {
          newCards[first].flipped = false
          newCards[second].flipped = false
          setMemoryCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const analyzeGamePerformance = (gameName: string, timeTaken: number) => {
    let score = 100
    let feedback = ""

    if (gameName === "Emotion Memory Match") {
      if (timeTaken < 60) {
        score = 100
        feedback =
          "Excellent! You have amazing memory and emotional recognition skills. Keep practicing to maintain this level!"
      } else if (timeTaken < 90) {
        score = 85
        feedback =
          "Great job! Your emotional intelligence is developing well. Try to recognize emotions faster by paying attention to facial expressions."
      } else {
        score = 70
        feedback =
          "Good effort! To improve, practice identifying emotions in everyday situations. Watch how people's faces change with different feelings."
      }
    } else if (gameName === "Breathing Buddy") {
      if (breathCount >= 10) {
        score = 100
        feedback =
          "Perfect! You've mastered breathing exercises. This skill helps you stay calm in stressful situations. Use it whenever you feel overwhelmed!"
      } else if (breathCount >= 5) {
        score = 80
        feedback =
          "Well done! You're learning to control your breathing. Practice this daily to improve focus and reduce anxiety."
      } else {
        score = 60
        feedback =
          "Nice start! Keep practicing breathing exercises. Try to do them every morning and before bed to build the habit."
      }
    } else if (gameName === "Kindness Quest") {
      score = (kindnessScore / 5) * 100
      if (score === 100) {
        feedback =
          "Amazing! You understand the importance of kindness. Remember, small acts of kindness can make a big difference in someone's day!"
      } else {
        feedback =
          "Good progress! Try to practice one act of kindness each day. It could be as simple as smiling at someone or helping with chores."
      }
    }

    setGamePerformance({
      game: gameName,
      score,
      time: timeTaken,
      feedback,
    })
  }

  useEffect(() => {
    if (currentGame === 2) {
      const interval = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === "inhale") return "hold"
          if (prev === "hold") return "exhale"
          setBreathCount((c) => {
            const newCount = c + 1
            if (newCount === 10) {
              setTimeout(() => analyzeGamePerformance("Breathing Buddy", 0), 1000)
            }
            return newCount
          })
          return "inhale"
        })
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [currentGame, breathCount])

  const psychometricTests = [
    {
      id: 1,
      title: "Emotional Intelligence Test",
      description: "Discover how well you understand your feelings",
      questions: [
        {
          q: "When your friend is sad, what do you do?",
          options: [
            { text: "Ignore them", score: 0 },
            { text: "Ask what's wrong and listen", score: 3 },
            { text: "Make a joke to cheer them up", score: 1 },
            { text: "Walk away", score: 0 },
          ],
        },
        {
          q: "How do you feel when you win a game?",
          options: [
            { text: "Happy and proud", score: 3 },
            { text: "Want to play again immediately", score: 2 },
            { text: "Don't care much", score: 0 },
            { text: "Feel bad for others who lost", score: 2 },
          ],
        },
        {
          q: "What do you do when you're angry?",
          options: [
            { text: "Yell at people", score: 0 },
            { text: "Take deep breaths and calm down", score: 3 },
            { text: "Break things", score: 0 },
            { text: "Cry and talk to someone", score: 2 },
          ],
        },
        {
          q: "Your sibling breaks your favorite toy. You:",
          options: [
            { text: "Hit them back", score: 0 },
            { text: "Tell them how you feel calmly", score: 3 },
            { text: "Break their toy too", score: 0 },
            { text: "Tell a parent", score: 2 },
          ],
        },
        {
          q: "You see someone crying alone. You:",
          options: [
            { text: "Go ask if they're okay", score: 3 },
            { text: "Ignore them", score: 0 },
            { text: "Tell your friends about it", score: 0 },
            { text: "Feel uncomfortable and leave", score: 1 },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Social Skills Assessment",
      description: "Learn about your friendship superpowers",
      questions: [
        {
          q: "A new kid joins your class. What do you do?",
          options: [
            { text: "Say hi and introduce yourself", score: 3 },
            { text: "Ignore them", score: 0 },
            { text: "Stare at them", score: 0 },
            { text: "Tell your friends about them", score: 1 },
          ],
        },
        {
          q: "Your friend wants to play a different game. You:",
          options: [
            { text: "Get upset and refuse", score: 0 },
            { text: "Try their game happily", score: 3 },
            { text: "Leave and play alone", score: 1 },
            { text: "Argue with them", score: 0 },
          ],
        },
        {
          q: "Someone shares their snack with you. You:",
          options: [
            { text: "Say thank you warmly", score: 3 },
            { text: "Take it without saying anything", score: 0 },
            { text: "Ask for more", score: 0 },
            { text: "Refuse it", score: 1 },
          ],
        },
        {
          q: "You want to join a group playing. You:",
          options: [
            { text: "Ask politely if you can join", score: 3 },
            { text: "Just start playing without asking", score: 0 },
            { text: "Watch from far away", score: 1 },
            { text: "Complain they didn't invite you", score: 0 },
          ],
        },
        {
          q: "Your friend is better at something than you. You:",
          options: [
            { text: "Feel happy for them", score: 3 },
            { text: "Feel jealous and angry", score: 0 },
            { text: "Ask them to teach you", score: 3 },
            { text: "Stop being their friend", score: 0 },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Problem Solving Skills",
      description: "Test your creative thinking abilities",
      questions: [
        {
          q: "You forgot your homework at home. What do you do?",
          options: [
            { text: "Tell the teacher honestly", score: 3 },
            { text: "Blame someone else", score: 0 },
            { text: "Hide and skip class", score: 0 },
            { text: "Make excuses", score: 1 },
          ],
        },
        {
          q: "Two friends want to play with you at the same time. You:",
          options: [
            { text: "Choose one and ignore the other", score: 1 },
            { text: "Suggest all three play together", score: 3 },
            { text: "Run away from both", score: 0 },
            { text: "Get confused and do nothing", score: 0 },
          ],
        },
        {
          q: "You see someone being mean to another kid. You:",
          options: [
            { text: "Tell a teacher or adult", score: 3 },
            { text: "Join in being mean", score: 0 },
            { text: "Just watch", score: 0 },
            { text: "Walk away quickly", score: 1 },
          ],
        },
        {
          q: "You can't solve a math problem. You:",
          options: [
            { text: "Give up immediately", score: 0 },
            { text: "Try different ways to solve it", score: 3 },
            { text: "Copy from a friend", score: 0 },
            { text: "Ask for help from teacher", score: 3 },
          ],
        },
        {
          q: "Your team is losing a game. You:",
          options: [
            { text: "Quit and walk away", score: 0 },
            { text: "Encourage your team to keep trying", score: 3 },
            { text: "Blame your teammates", score: 0 },
            { text: "Get angry and stop playing", score: 0 },
          ],
        },
      ],
    },
  ]

  const handleTestAnswer = (questionIndex: number, answer: string, score: number) => {
    setTestAnswers({ ...testAnswers, [questionIndex]: answer })
  }

  const submitTest = () => {
    const test = psychometricTests.find((t) => t.id === currentTest)
    if (!test) return

    // Calculate total score
    let totalScore = 0
    const maxScore = test.questions.length * 3

    test.questions.forEach((question, index) => {
      const answer = testAnswers[index]
      const option = question.options.find((opt) => opt.text === answer)
      if (option) {
        totalScore += option.score
      }
    })

    const percentage = (totalScore / maxScore) * 100

    // Generate analysis based on test type and score
    let analysis = ""
    let skillImpact: { skill: string; impact: string }[] = []

    if (test.id === 1) {
      // Emotional Intelligence
      if (percentage >= 80) {
        analysis =
          "Excellent! You have strong emotional intelligence. You understand your feelings and can recognize emotions in others. This helps you make friends easily and handle difficult situations calmly."
        skillImpact = [
          { skill: "Empathy", impact: "High - You can understand how others feel" },
          { skill: "Self-Awareness", impact: "High - You know your own emotions well" },
          { skill: "Emotional Regulation", impact: "High - You can control your reactions" },
        ]
      } else if (percentage >= 60) {
        analysis =
          "Good job! You're developing emotional intelligence. You can recognize some emotions but might need practice understanding complex feelings. Try to pay attention to how you and others feel in different situations."
        skillImpact = [
          { skill: "Empathy", impact: "Medium - Keep practicing understanding others" },
          { skill: "Self-Awareness", impact: "Medium - Notice your feelings more often" },
          { skill: "Emotional Regulation", impact: "Medium - Practice calming techniques" },
        ]
      } else {
        analysis =
          "You're starting to learn about emotions! It's okay if this feels hard. Try to notice how you feel throughout the day and talk to trusted adults about your feelings. Practice makes perfect!"
        skillImpact = [
          { skill: "Empathy", impact: "Developing - Watch how others react to situations" },
          { skill: "Self-Awareness", impact: "Developing - Keep a feelings journal" },
          { skill: "Emotional Regulation", impact: "Developing - Learn breathing exercises" },
        ]
      }
    } else if (test.id === 2) {
      // Social Skills
      if (percentage >= 80) {
        analysis =
          "Amazing! You have excellent social skills. You know how to make friends, share, and work well with others. These skills will help you throughout your life in school, work, and relationships."
        skillImpact = [
          { skill: "Communication", impact: "High - You express yourself clearly" },
          { skill: "Cooperation", impact: "High - You work well with others" },
          { skill: "Friendship Building", impact: "High - You make friends easily" },
        ]
      } else if (percentage >= 60) {
        analysis =
          "Well done! You have good social skills but there's room to grow. Practice being kind, sharing, and listening to others. Remember, good friendships take time and effort to build."
        skillImpact = [
          { skill: "Communication", impact: "Medium - Practice expressing your thoughts" },
          { skill: "Cooperation", impact: "Medium - Try group activities more often" },
          { skill: "Friendship Building", impact: "Medium - Be more open to new friends" },
        ]
      } else {
        analysis =
          "You're learning how to interact with others! Social skills can be tricky, but they get easier with practice. Try joining group activities, being kind to others, and asking questions to show interest."
        skillImpact = [
          { skill: "Communication", impact: "Developing - Practice talking to new people" },
          { skill: "Cooperation", impact: "Developing - Join team activities" },
          { skill: "Friendship Building", impact: "Developing - Be friendly and smile more" },
        ]
      }
    } else if (test.id === 3) {
      // Problem Solving
      if (percentage >= 80) {
        analysis =
          "Fantastic! You're a great problem solver. You think creatively and make good decisions. These skills will help you overcome challenges in school and life. Keep using your smart thinking!"
        skillImpact = [
          { skill: "Critical Thinking", impact: "High - You analyze situations well" },
          { skill: "Decision Making", impact: "High - You make wise choices" },
          { skill: "Creativity", impact: "High - You find unique solutions" },
        ]
      } else if (percentage >= 60) {
        analysis =
          "Good work! You can solve problems but sometimes need help. That's perfectly okay! Try to think of different solutions before choosing one. Don't be afraid to ask for help when you need it."
        skillImpact = [
          { skill: "Critical Thinking", impact: "Medium - Practice thinking through problems" },
          { skill: "Decision Making", impact: "Medium - Consider consequences before acting" },
          { skill: "Creativity", impact: "Medium - Try new approaches to challenges" },
        ]
      } else {
        analysis =
          "You're learning to solve problems! This is a skill that improves with practice. When you face a challenge, take a deep breath, think of different solutions, and ask for help if needed. You'll get better!"
        skillImpact = [
          { skill: "Critical Thinking", impact: "Developing - Break problems into smaller parts" },
          { skill: "Decision Making", impact: "Developing - Think before you act" },
          { skill: "Creativity", impact: "Developing - Try different ways to solve things" },
        ]
      }
    }

    setTestResults({
      test: test.title,
      score: percentage,
      analysis,
      skillImpact,
    })

    setPoints(points + 50)
  }

  const learningVideos = [
    {
      title: "Understanding Your Emotions",
      description: "Learn to identify and express your feelings",
      duration: "8:45",
      thumbnail: "/kids-learning-emotions.jpg",
      url: "https://www.youtube.com/watch?v=aW8EEU_FKkQ",
      category: "Emotional Intelligence",
    },
    {
      title: "Making Friends and Being Kind",
      description: "How to build strong friendships",
      duration: "10:20",
      thumbnail: "/kids-making-friends.jpg",
      url: "https://www.youtube.com/watch?v=Bw_7_FkBILE",
      category: "Social Skills",
    },
    {
      title: "Problem Solving for Kids",
      description: "Creative ways to solve everyday problems",
      duration: "7:30",
      thumbnail: "/kids-problem-solving.jpg",
      url: "https://www.youtube.com/watch?v=QCqxOzKNFks",
      category: "Critical Thinking",
    },
    {
      title: "Building Confidence",
      description: "Believe in yourself and your abilities",
      duration: "9:15",
      thumbnail: "/kids-confidence-building.jpg",
      url: "https://www.youtube.com/watch?v=0pGUDp6H7qg",
      category: "Self-Esteem",
    },
    {
      title: "Dealing with Anger",
      description: "Healthy ways to manage angry feelings",
      duration: "6:50",
      thumbnail: "/kids-managing-anger.jpg",
      url: "https://www.youtube.com/watch?v=WwtS_7kJNSo",
      category: "Emotional Regulation",
    },
    {
      title: "Being a Good Listener",
      description: "Why listening is important for friendships",
      duration: "8:00",
      thumbnail: "/kids-listening-skills.jpg",
      url: "https://www.youtube.com/watch?v=saXfavo1OQo",
      category: "Communication",
    },
  ]

  const quests = [
    {
      title: "Morning Mood Check",
      description: "Tell us how you're feeling today",
      points: 10,
      icon: Smile,
      progress: 100,
      completed: true,
    },
    {
      title: "Active Listening Quest",
      description: "Watch the video and complete the quiz",
      points: 25,
      icon: BookOpen,
      progress: 60,
      completed: false,
    },
    {
      title: "Emotion Detective",
      description: "Identify feelings in the story",
      points: 20,
      icon: Target,
      progress: 0,
      completed: false,
    },
  ]

  const achievements = [
    { icon: Star, label: "7 Day Streak", unlocked: true },
    { icon: Trophy, label: "Quiz Master", unlocked: true },
    { icon: Award, label: "Mood Tracker", unlocked: true },
    { icon: Zap, label: "Fast Learner", unlocked: false },
  ]

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgColor} transition-all duration-[3000ms] ease-in-out animate-gradient relative overflow-hidden`}
    >
      <div className="absolute top-10 left-10 w-24 h-24 bg-[oklch(0.70_0.18_50)]/30 rounded-full blur-2xl animate-float" />
      <div
        className="absolute top-32 right-20 w-32 h-32 bg-[oklch(0.75_0.15_60)]/30 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-28 h-28 bg-[oklch(0.72_0.12_180)]/30 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-36 h-36 bg-[oklch(0.68_0.15_35)]/30 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-[oklch(0.60_0.15_240)]/30 rounded-full blur-2xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="absolute top-1/4 left-1/5 animate-float" style={{ animationDelay: "0.5s" }}>
        <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Star className="w-8 h-8 text-[oklch(0.75_0.15_60)]" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/5 animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-[oklch(0.68_0.15_35)]" />
        </div>
      </div>
      <div className="absolute bottom-1/4 left-1/6 animate-float" style={{ animationDelay: "2.5s" }}>
        <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Brain className="w-8 h-8 text-[oklch(0.60_0.15_240)]" />
        </div>
      </div>
      <div className="absolute bottom-1/3 right-1/6 animate-float" style={{ animationDelay: "3.5s" }}>
        <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
          <Trophy className="w-8 h-8 text-[oklch(0.70_0.18_50)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)] rounded-2xl flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Hey, Explorer!</h1>
                <p className="text-sm text-muted-foreground">
                  Level {level} • {points} points
                </p>
              </div>
            </div>
          </div>

          <Button variant="outline" size="icon" className="rounded-full md:hidden bg-transparent">
            <Menu className="w-4 h-4" />
          </Button>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 border-2 border-[oklch(0.70_0.18_50)]/20 bg-white/90 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)] rounded-2xl flex items-center justify-center">
                  <Smile className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">How are you feeling?</h2>
                  <p className="text-sm text-muted-foreground">Pick your mood to get started!</p>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => handleMoodSelect(mood)}
                    className={`p-4 rounded-3xl border-2 transition-all duration-300 hover:scale-110 ${
                      selectedMood === mood.label
                        ? `scale-110 shadow-lg`
                        : "border-border hover:border-[oklch(0.70_0.18_50)]/50"
                    }`}
                    style={
                      selectedMood === mood.label ? { borderColor: mood.color, backgroundColor: `${mood.color}15` } : {}
                    }
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className="text-xs font-medium">{mood.label}</div>
                  </button>
                ))}
              </div>

              {selectedMood && (
                <div
                  className="mt-4 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{
                    backgroundColor: `${moods.find((m) => m.label === selectedMood)?.color}15`,
                  }}
                >
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: moods.find((m) => m.label === selectedMood)?.color }}
                  >
                    Great! You're feeling {selectedMood} today
                  </p>
                  <p className="text-sm text-muted-foreground">We've picked some fun activities just for you!</p>
                </div>
              )}
            </Card>

            {currentGame === null && currentTest === null && !gamePerformance && !testResults && (
              <Card className="p-6 bg-gradient-to-br from-[oklch(0.60_0.15_240)]/10 to-[oklch(0.72_0.12_180)]/10 border-2 border-[oklch(0.60_0.15_240)]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.60_0.15_240)] to-[oklch(0.72_0.12_180)] rounded-2xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Learning Videos</h2>
                    <p className="text-sm text-muted-foreground">Watch and learn life skills!</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {learningVideos.map((video, index) => (
                    <a key={index} href={video.url} target="_blank" rel="noopener noreferrer" className="group block">
                      <div className="p-4 bg-white rounded-2xl border-2 border-border hover:border-[oklch(0.60_0.15_240)] transition-all duration-300 hover:scale-105">
                        <div className="relative mb-3 rounded-xl overflow-hidden">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-[oklch(0.60_0.15_240)] rounded-full flex items-center justify-center">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-[oklch(0.60_0.15_240)] font-medium mb-1">{video.category}</div>
                        <h3 className="font-bold text-sm mb-2 text-balance">{video.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{video.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Video className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {gamePerformance && (
              <Card className="p-6 bg-gradient-to-br from-[oklch(0.75_0.15_60)]/10 to-[oklch(0.70_0.18_50)]/10 border-2 border-[oklch(0.75_0.15_60)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.75_0.15_60)] to-[oklch(0.70_0.18_50)] rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Game Results</h2>
                      <p className="text-sm text-muted-foreground">{gamePerformance.game}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setGamePerformance(null)
                      setCurrentGame(null)
                    }}
                    className="rounded-xl"
                  >
                    Close
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[oklch(0.75_0.15_60)] mb-2">{gamePerformance.score}%</div>
                    <div className="text-lg font-medium mb-4">Your Score</div>
                    {gamePerformance.time > 0 && (
                      <div className="text-sm text-muted-foreground">Completed in {gamePerformance.time} seconds</div>
                    )}
                  </div>

                  <div className="p-6 bg-white rounded-2xl">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[oklch(0.75_0.15_60)]" />
                      How You Did
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{gamePerformance.feedback}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setGamePerformance(null)
                        if (gamePerformance.game === "Emotion Memory Match") {
                          initMemoryGame()
                          setCurrentGame(1)
                        } else if (gamePerformance.game === "Breathing Buddy") {
                          setBreathCount(0)
                          setCurrentGame(2)
                        } else if (gamePerformance.game === "Kindness Quest") {
                          setKindnessScore(0)
                          setCurrentGame(3)
                        }
                      }}
                      className="flex-1 rounded-xl bg-gradient-to-r from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)]"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Play Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setGamePerformance(null)
                        setCurrentGame(null)
                      }}
                      className="flex-1 rounded-xl"
                    >
                      Try Another Game
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {testResults && (
              <Card className="p-6 bg-gradient-to-br from-[oklch(0.72_0.12_180)]/10 to-[oklch(0.70_0.18_50)]/10 border-2 border-[oklch(0.72_0.12_180)]/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)] rounded-2xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Test Results</h2>
                      <p className="text-sm text-muted-foreground">{testResults.test}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTestResults(null)
                      setCurrentTest(null)
                      setTestAnswers({})
                    }}
                    className="rounded-xl"
                  >
                    Close
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[oklch(0.72_0.12_180)] mb-2">
                      {Math.round(testResults.score)}%
                    </div>
                    <div className="text-lg font-medium">Your Score</div>
                  </div>

                  <div className="p-6 bg-white rounded-2xl">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
                      Your Analysis
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">{testResults.analysis}</p>
                  </div>

                  <div className="p-6 bg-white rounded-2xl">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
                      How This Affects Your Life Skills
                    </h3>
                    <div className="space-y-3">
                      {testResults.skillImpact.map((skill, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-xl">
                          <div className="font-bold text-sm mb-1">{skill.skill}</div>
                          <div className="text-xs text-muted-foreground leading-relaxed">{skill.impact}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        setTestResults(null)
                        setTestAnswers({})
                        setCurrentTest(null)
                      }}
                      className="flex-1 rounded-xl bg-gradient-to-r from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)]"
                    >
                      Take Another Test
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTestResults(null)
                        setCurrentTest(null)
                        setTestAnswers({})
                      }}
                      className="flex-1 rounded-xl"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {currentGame === null ? (
              <>
                <Card className="p-6 bg-gradient-to-br from-[oklch(0.70_0.18_50)]/10 to-[oklch(0.75_0.15_60)]/10 border-2 border-[oklch(0.70_0.18_50)]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)] rounded-2xl flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Life Skills Games</h2>
                      <p className="text-sm text-muted-foreground">Learn while having fun!</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {games.map((game) => (
                      <div
                        key={game.id}
                        className="p-4 bg-white rounded-2xl border-2 border-border hover:border-[oklch(0.70_0.18_50)] transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => {
                          setCurrentGame(game.id)
                          if (game.id === 1) initMemoryGame()
                          if (game.id === 2) setBreathCount(0)
                          if (game.id === 3) setKindnessScore(0)
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                          style={{ backgroundColor: `${game.color}20` }}
                        >
                          <game.icon className="w-5 h-5" style={{ color: game.color }} />
                        </div>
                        <h3 className="font-bold text-sm mb-2 text-balance">{game.title}</h3>
                        <p className="text-xs text-muted-foreground mb-3">{game.description}</p>
                        <Button size="sm" className="w-full rounded-xl" style={{ backgroundColor: game.color }}>
                          <Play className="w-3 h-3 mr-1" />
                          Play Game
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                {currentTest === null && (
                  <Card className="p-6 bg-gradient-to-br from-[oklch(0.72_0.12_180)]/10 to-[oklch(0.70_0.18_50)]/10 border-2 border-[oklch(0.72_0.12_180)]/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)] rounded-2xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Fun Tests & Quizzes</h2>
                        <p className="text-sm text-muted-foreground">Discover more about yourself!</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {psychometricTests.map((test) => (
                        <div
                          key={test.id}
                          className="p-4 bg-white rounded-2xl border-2 border-border hover:border-[oklch(0.72_0.12_180)] transition-all duration-300 hover:scale-105 cursor-pointer"
                          onClick={() => setCurrentTest(test.id)}
                        >
                          <div className="w-10 h-10 bg-[oklch(0.72_0.12_180)]/10 rounded-xl flex items-center justify-center mb-3">
                            <Target className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
                          </div>
                          <h3 className="font-bold text-sm mb-2 text-balance">{test.title}</h3>
                          <p className="text-xs text-muted-foreground mb-3">{test.description}</p>
                          <Button
                            size="sm"
                            className="w-full rounded-xl bg-gradient-to-r from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)]"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Start Test
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </>
            ) : currentGame === 1 ? (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Emotion Memory Match</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={initMemoryGame} className="rounded-xl bg-transparent">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentGame(null)} className="rounded-xl">
                      Back
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  {memoryCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardFlip(card.id)}
                      className={`aspect-square rounded-2xl border-2 text-4xl flex items-center justify-center transition-all duration-300 ${
                        card.matched
                          ? "bg-[oklch(0.70_0.18_50)]/20 border-[oklch(0.70_0.18_50)] scale-95"
                          : card.flipped
                            ? "bg-white border-[oklch(0.72_0.12_180)]"
                            : "bg-[oklch(0.72_0.12_180)]/10 border-border hover:scale-105"
                      }`}
                      disabled={card.matched || card.flipped}
                    >
                      {card.flipped || card.matched ? card.emotion : "?"}
                    </button>
                  ))}
                </div>

                {memoryCards.every((card) => card.matched) && (
                  <div className="p-4 bg-[oklch(0.70_0.18_50)]/10 rounded-2xl text-center">
                    <p className="text-lg font-bold text-[oklch(0.70_0.18_50)] mb-2">
                      🎉 Amazing! You matched them all!
                    </p>
                    <p className="text-sm text-muted-foreground">You earned 50 points!</p>
                  </div>
                )}
              </Card>
            ) : currentGame === 2 ? (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Breathing Buddy</h2>
                  <Button variant="outline" size="sm" onClick={() => setCurrentGame(null)} className="rounded-xl">
                    Back
                  </Button>
                </div>

                <div className="text-center space-y-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)] transition-all duration-[3000ms] ${
                        breathPhase === "inhale" ? "scale-100" : breathPhase === "hold" ? "scale-100" : "scale-50"
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold mb-2">
                          {breathPhase === "inhale" ? "Breathe In" : breathPhase === "hold" ? "Hold" : "Breathe Out"}
                        </div>
                        <div className="text-sm">Count: {breathCount}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[oklch(0.72_0.12_180)]/10 rounded-2xl">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Follow the circle! Breathe in as it grows, hold when it stays, and breathe out as it shrinks. This
                      helps you feel calm and focused.
                    </p>
                  </div>

                  {breathCount >= 5 && (
                    <div className="p-4 bg-[oklch(0.70_0.18_50)]/10 rounded-2xl">
                      <p className="text-lg font-bold text-[oklch(0.70_0.18_50)] mb-2">
                        🌟 Great job! You completed 5 breaths!
                      </p>
                      <p className="text-sm text-muted-foreground">You earned 30 points!</p>
                    </div>
                  )}
                </div>
              </Card>
            ) : currentGame === 3 ? (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Kindness Quest</h2>
                  <Button variant="outline" size="sm" onClick={() => setCurrentGame(null)} className="rounded-xl">
                    Back
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[oklch(0.75_0.15_60)]/10 rounded-2xl">
                    <h3 className="font-bold mb-2">Your Kindness Score: {kindnessScore}</h3>
                    <Progress value={(kindnessScore / 5) * 100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    {[
                      { action: "Help a friend with homework", points: 1 },
                      { action: "Say something nice to someone", points: 1 },
                      { action: "Share your toys or snacks", points: 1 },
                      { action: "Listen when someone is sad", points: 1 },
                      { action: "Include someone who's alone", points: 1 },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (kindnessScore < 5) {
                            setKindnessScore(kindnessScore + item.points)
                            setPoints(points + 10)
                          }
                        }}
                        disabled={kindnessScore >= 5}
                        className="w-full p-4 bg-white rounded-2xl border-2 border-border hover:border-[oklch(0.75_0.15_60)] transition-all duration-300 hover:scale-105 text-left disabled:opacity-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.action}</span>
                          <span className="text-[oklch(0.75_0.15_60)] font-bold">+{item.points}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {kindnessScore >= 5 && (
                    <div className="p-4 bg-[oklch(0.75_0.15_60)]/10 rounded-2xl text-center">
                      <p className="text-lg font-bold text-[oklch(0.75_0.15_60)] mb-2">
                        💖 You're a Kindness Champion!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        You completed all kindness actions! You earned 50 points!
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ) : null}

            {currentTest !== null && currentGame === null && (
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">{psychometricTests.find((t) => t.id === currentTest)?.title}</h2>
                  <Button variant="outline" size="sm" onClick={() => setCurrentTest(null)} className="rounded-xl">
                    Back
                  </Button>
                </div>

                <div className="space-y-6">
                  {psychometricTests
                    .find((t) => t.id === currentTest)
                    ?.questions.map((question, qIndex) => (
                      <div key={qIndex} className="p-4 bg-muted/30 rounded-2xl">
                        <p className="font-bold mb-4 text-balance">
                          {qIndex + 1}. {question.q}
                        </p>
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => handleTestAnswer(qIndex, option.text, option.score)}
                              className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                                testAnswers[qIndex] === option.text
                                  ? "border-[oklch(0.70_0.18_50)] bg-[oklch(0.70_0.18_50)]/10"
                                  : "border-border hover:border-[oklch(0.70_0.18_50)]/50"
                              }`}
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>

                <Button
                  onClick={submitTest}
                  disabled={
                    Object.keys(testAnswers).length !==
                    psychometricTests.find((t) => t.id === currentTest)?.questions.length
                  }
                  className="w-full mt-6 rounded-xl bg-gradient-to-r from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)]"
                  size="lg"
                >
                  Submit Test
                </Button>
              </Card>
            )}

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[oklch(0.72_0.12_180)]/10 rounded-2xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-[oklch(0.72_0.12_180)]" />
                  </div>
                  <h2 className="text-xl font-bold">Today's Quests</h2>
                </div>
                <span className="text-sm text-muted-foreground">2/3 completed</span>
              </div>

              <div className="space-y-4">
                {quests.map((quest, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                      quest.completed
                        ? "border-[oklch(0.70_0.18_50)]/30 bg-[oklch(0.70_0.18_50)]/5"
                        : "border-border hover:border-[oklch(0.72_0.12_180)]/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          quest.completed ? "bg-[oklch(0.70_0.18_50)]/20" : "bg-[oklch(0.72_0.12_180)]/10"
                        }`}
                      >
                        <quest.icon
                          className={`w-6 h-6 ${
                            quest.completed ? "text-[oklch(0.70_0.18_50)]" : "text-[oklch(0.72_0.12_180)]"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-balance">{quest.title}</h3>
                            <p className="text-sm text-muted-foreground">{quest.description}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[oklch(0.75_0.15_60)] font-bold flex-shrink-0">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{quest.points}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Progress value={quest.progress} className="h-2" />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{quest.progress}% complete</span>
                            {quest.completed ? (
                              <span className="text-xs font-medium text-[oklch(0.70_0.18_50)]">Completed!</span>
                            ) : (
                              <Button
                                size="sm"
                                className="rounded-full h-7 text-xs"
                                style={{
                                  background: "linear-gradient(135deg, oklch(0.70 0.18 50), oklch(0.75 0.15 60))",
                                }}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                {quest.progress > 0 ? "Continue" : "Start"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[oklch(0.72_0.12_180)]/10 to-[oklch(0.70_0.18_50)]/10 border-2 border-[oklch(0.72_0.12_180)]/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.72_0.12_180)] to-[oklch(0.70_0.18_50)] rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Your Learning Path</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Emotions", "Friends", "Goals", "Creativity"].map((skill, index) => (
                  <div
                    key={skill}
                    className="p-4 bg-white rounded-2xl border-2 border-border hover:border-[oklch(0.72_0.12_180)] transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-[oklch(0.72_0.12_180)]/10 rounded-xl flex items-center justify-center mb-2">
                      <Sparkles className="w-4 h-4 text-[oklch(0.72_0.12_180)]" />
                    </div>
                    <h3 className="font-bold text-sm mb-1">{skill}</h3>
                    <Progress value={(index + 1) * 20} className="h-1.5" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)] text-white border-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Level {level}</h2>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {level + 1}</span>
                  <span className="font-bold">{points}/500</span>
                </div>
                <Progress value={(points / 500) * 100} className="h-3 bg-white/20" />
              </div>

              <p className="text-sm text-white/80">Keep going! Only 50 more points to level up!</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Achievements</h2>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? "border-[oklch(0.75_0.15_60)]/30 bg-[oklch(0.75_0.15_60)]/10 hover:scale-105"
                        : "border-border bg-muted/30 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-[oklch(0.70_0.18_50)] to-[oklch(0.75_0.15_60)]"
                          : "bg-muted"
                      }`}
                    >
                      <achievement.icon
                        className={`w-5 h-5 ${achievement.unlocked ? "text-white" : "text-muted-foreground"}`}
                      />
                    </div>
                    <p className="text-xs font-medium text-balance">{achievement.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>

              <div className="space-y-2">
                <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Journal
                </Button>
                <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Skill Tree
                </Button>
                <Button className="w-full justify-start rounded-2xl bg-transparent" variant="outline">
                  <Trophy className="w-4 h-4 mr-2" />
                  Leaderboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
