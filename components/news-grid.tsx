"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink } from "lucide-react"
import { useNews } from "@/contexts/news-context"
import { useFilters } from "@/contexts/filters-context"
import { parseCategoryName } from "@/lib/utils"

export function NewsGrid() {
  const { articles, articlesLoading, hasMore, loadMoreArticles } = useNews()
  const { selectedCategory } = useFilters()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (articlesLoading && articles.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8" id="news-grid">
      <h2 className="text-2xl font-bold mb-6">
        Latest News 
        <span className="ml-2 text-sm font-medium text-red-600">
          {parseCategoryName(selectedCategory)}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article, index) => (
          <Card key={`${article.url}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow py-0">
            {article.urlToImage && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.urlToImage || "/placeholder.png"}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {article.source.name}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDate(article.publishedAt)}
                </div>
              </div>

              <h3 className="font-semibold mb-2 leading-tight line-clamp-2">{article.title}</h3>

              {article.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.description}</p>
              )}

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Read more
                <ExternalLink className="h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button onClick={loadMoreArticles} disabled={articlesLoading} variant="outline" size="lg">
            {articlesLoading ? "Loading..." : "Load More Articles"}
          </Button>
        </div>
      )}
    </section>
  )
}
