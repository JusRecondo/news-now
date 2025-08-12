import { NewsHero } from "@/components/news-hero"
import { NewsGrid } from "@/components/news-grid"
import { NewsHeader } from "@/components/news-header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      <main>
        <NewsHero />
        <NewsGrid />
      </main>
    </div>
  )
}
