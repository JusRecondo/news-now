"use client"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/contexts/filters-context"
import { Menu } from "lucide-react"
import { parseCategoryName } from "@/lib/utils"
import ThemeToggle from "./theme-toggle"
import NewsSearchbar from "./news-searchbar"

export function NewsHeader() {
  
 const { categories, selectedCategory, setSelectedCategory } = useFilters()

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    // Scroll to the news grid section
    const newsGrid = document.getElementById("news-grid")     
    if (newsGrid) {
      newsGrid.scrollIntoView({ behavior: "smooth" })
    }
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-red-600">NewsNow</h1>
          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#"
                className={`text-sm font-medium transition-colors hover:text-red-600 ${selectedCategory === cat ? "text-red-600 underline" : ""}`}
                onClick={e => { e.preventDefault(); handleCategoryClick(cat); }}
              >
                {parseCategoryName(cat)}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <NewsSearchbar />
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
