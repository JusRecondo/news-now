import { NewsHero } from "@/components/news-hero"
import { NewsGrid } from "@/components/news-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <NewsHero />
        <NewsGrid />
      </main>
    </div>
  )
}
