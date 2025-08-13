"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { NewsArticle } from "@/types/news"
import { useFilters } from "./filters-context"

interface NewsContextType {
  // Top story state
  topStory: NewsArticle | null
  topStoryLoading: boolean

  // Articles state
  articles: NewsArticle[]
  articlesLoading: boolean
  page: number
  hasMore: boolean

  // Actions
  fetchTopStory: () => Promise<void>
  fetchArticles: (pageNum?: number) => Promise<void>
  loadMoreArticles: () => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: ReactNode }) {
  // Top story state
  const [topStory, setTopStory] = useState<NewsArticle | null>(null)
  const [topStoryLoading, setTopStoryLoading] = useState(true)

  // Articles state
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  //Filter selected
  const { selectedCategory } = useFilters()

  const fetchTopStory = async () => {
    try {
      setTopStoryLoading(true)
      const response = await fetch("/api/news/top-headlines?country=us&pageSize=1&page=1")
      const data = await response.json()

      if (data.articles && data.articles.length > 0) {
        setTopStory(data.articles[0])
      }
    } catch (error) {
      console.error("Error fetching top story:", error)
    } finally {
      setTopStoryLoading(false)
    }
  }

  const fetchArticles = async (pageNum = 1) => {
    try {
      setArticlesLoading(true)
      const response = await fetch(`/api/news/everything?page=${pageNum}&pageSize=12&q=${encodeURIComponent(selectedCategory)}&sortBy=publishedAt`)
      const data = await response.json()

      if (data.articles) {
        if (pageNum === 1) {
          setArticles(data.articles)
        } else {
          setArticles((prev) => [...prev, ...data.articles])
        }
        setHasMore(data.articles.length === 12)
      }
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setArticlesLoading(false)
    }
  }

  const loadMoreArticles = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchArticles(nextPage)
  }

  // Initial data fetch
  useEffect(() => {
    fetchTopStory()
    fetchArticles()
  }, [selectedCategory])

  const value: NewsContextType = {
    topStory,
    topStoryLoading,
    articles,
    articlesLoading,
    page,
    hasMore,
    fetchTopStory,
    fetchArticles,
    loadMoreArticles,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export function useNews() {
  const context = useContext(NewsContext)
  if (context === undefined) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}