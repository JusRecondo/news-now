"use client"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import { useState } from "react"

export function NewsHeader({ onCategoryChange }: { onCategoryChange?: (category: string) => void }) {
  const categories = ["World", "Politics", "Technology", "Business", "Sports"];
  const [selected, setSelected] = useState<string>(categories[0]);

  const handleCategoryClick = (category: string) => {
    setSelected(category);
    if (onCategoryChange) onCategoryChange(category);
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
                className={`text-sm font-medium transition-colors hover:text-red-600 ${selected === cat ? "text-red-600 underline" : ""}`}
                onClick={e => { e.preventDefault(); handleCategoryClick(cat); }}
              >
                {cat}
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
