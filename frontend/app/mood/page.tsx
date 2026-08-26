import { MoodTracker } from "@/components/mood-tracker"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function MoodPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Mood Tracker</h1>
            <p className="text-muted-foreground">Track your emotional well-being over time</p>
          </div>
        </header>

        <MoodTracker />
      </div>
    </div>
  )
}
