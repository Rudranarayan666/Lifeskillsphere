"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Smile, Frown, Meh, Heart, Brain } from "lucide-react"

interface MoodEntry {
  date: string
  mood: string
  intensity: number
  note?: string
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [note, setNote] = useState("")
  const [entries, setEntries] = useState<MoodEntry[]>([
    { date: "2025-01-08", mood: "Happy", intensity: 8, note: "Great day at work!" },
    { date: "2025-01-07", mood: "Calm", intensity: 7 },
    { date: "2025-01-06", mood: "Anxious", intensity: 6, note: "Big presentation coming up" },
    { date: "2025-01-05", mood: "Happy", intensity: 9 },
    { date: "2025-01-04", mood: "Neutral", intensity: 5 },
  ])

  const moods = [
    { name: "Happy", icon: Smile, color: "oklch(0.75_0.15_60)" },
    { name: "Calm", icon: Heart, color: "oklch(0.72_0.12_180)" },
    { name: "Neutral", icon: Meh, color: "oklch(0.70_0.08_240)" },
    { name: "Anxious", icon: Brain, color: "oklch(0.70_0.15_290)" },
    { name: "Sad", icon: Frown, color: "oklch(0.65_0.12_240)" },
  ]

  const handleSave = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        date: new Date().toISOString().split("T")[0],
        mood: selectedMood,
        intensity,
        note: note || undefined,
      }
      setEntries([newEntry, ...entries])
      setSelectedMood(null)
      setIntensity(5)
      setNote("")
    }
  }

  const getMoodStats = () => {
    const moodCounts = entries.reduce(
      (acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const avgIntensity = entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length

    return { moodCounts, avgIntensity: avgIntensity.toFixed(1) }
  }

  const stats = getMoodStats()

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">How are you feeling today?</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedMood === mood.name
                  ? "border-current scale-105 shadow-lg"
                  : "border-border hover:border-current/50"
              }`}
              style={{ color: mood.color }}
            >
              <mood.icon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">{mood.name}</div>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="text-sm font-medium mb-2 block">Intensity (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span className="font-bold text-foreground">{intensity}</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Add a note (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 bg-background border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                rows={3}
              />
            </div>

            <Button onClick={handleSave} className="w-full rounded-xl">
              Save Mood Entry
            </Button>
          </div>
        )}
      </Card>

      {/* Mood Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Mood Insights</h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Average Intensity</span>
              <span className="text-2xl font-bold">{stats.avgIntensity}</span>
            </div>

            <div className="pt-3 border-t">
              <p className="text-sm font-medium mb-2">Most Common Moods</p>
              <div className="space-y-2">
                {Object.entries(stats.moodCounts)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([mood, count]) => (
                    <div key={mood} className="flex items-center justify-between text-sm">
                      <span>{mood}</span>
                      <span className="font-bold">{count} times</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Recent Entries</h3>
          </div>

          <div className="space-y-3">
            {entries.slice(0, 5).map((entry, index) => {
              const moodData = moods.find((m) => m.name === entry.mood)
              return (
                <div key={index} className="p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {moodData && <moodData.icon className="w-4 h-4" style={{ color: moodData.color }} />}
                      <span className="font-medium text-sm">{entry.mood}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Intensity: {entry.intensity}/10</span>
                  </div>
                  {entry.note && <p className="text-xs text-muted-foreground mt-2 italic">{entry.note}</p>}
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
