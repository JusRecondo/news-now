"use client"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/contexts/filters-context"
import { Search, Menu } from "lucide-react"

export function NewsHeader() {
  
 const { categories, selectedCategory, setSelectedCategory } = useFilters()

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
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
                {cat === "world or politics or technology or business or sports" ? "All News" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
