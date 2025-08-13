"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface FiltersContextType {
    categories: string[]
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export function FiltersProvider({ children }: { children: ReactNode }) {
    const [categories] = useState(["world or politics or technology or business or sports", "world", "politics", "technology", "business", "sports"])
    const [selectedCategory, setSelectedCategory] = useState("world or politics or technology or business or sports") // Default

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
    }

    const value = {
        categories,
        selectedCategory,
        setSelectedCategory: handleSelectCategory,
    }

    return (
        <FiltersContext.Provider value={value}>
            {children}
        </FiltersContext.Provider>
    )
}

export const useFilters = () => {
    const context = useContext(FiltersContext)
    if (context === undefined) {
        throw new Error("useFilters must be used within a FiltersProvider")
    }
    return context
}
