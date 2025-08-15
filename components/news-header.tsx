"use client"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/contexts/filters-context"
import { Menu, X } from "lucide-react"
import { parseCategoryName } from "@/lib/utils"
import ThemeToggle from "./theme-toggle"
import NewsSearchbar from "./news-searchbar"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer"
import { useState } from "react"

export function NewsHeader() {

  const { categories, selectedCategory, setSelectedCategory } = useFilters()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    setTimeout(() => {
    const newsGrid = document.getElementById("news-grid")
    if (newsGrid) {
      newsGrid.scrollIntoView({ behavior: "smooth" })
    }
  }, 300)
  };


  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {isDesktop && (
          <div className="flex w-full items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-red-600">NewsNow</h1>
              <nav className="flex items-center gap-6 justify-self-start">
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
            <div className="flex items-center justify-end gap-8">
              <NewsSearchbar />
            </div>
          </div>
        )}
        {!isDesktop && (
          <div className="flex w-full items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-red-600">NewsNow</h1>
            <NewsSearchbar />
            <div className="flex items-center justify-end gap-4">
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(true)}>
                    <Menu className="h-4 w-4" />
                     <span className="sr-only">Open menu</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="p-6" aria-description="Categories and theme toggle">
                  <nav className="flex flex-col gap-6">
                  <div className="flex justify-between align-center">
                    <h2 className="font-bold">News categories</h2>
                    <DrawerClose asChild className="p-0">
                      <Button variant="ghost" size="sm" className="self-start p-0">
                        <span className="sr-only">Close</span>
                        <X />
                      </Button>
                    </DrawerClose>
                  </div>
                  {categories.map((cat) => (
            

                    <a
                      key={cat}
                      href="#"
                      className={`text-sm font-medium transition-colors hover:text-red-600 ${selectedCategory === cat ? "text-red-600 underline" : ""}`}
                      onClick={e => { e.preventDefault(); handleCategoryClick(cat); setIsDrawerOpen(false); } }
                    >
                      {parseCategoryName(cat)}
                    </a>
                  
                  ))}
                  <div>
                    <ThemeToggle />
                  </div>
                </nav>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
