"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import { useNews } from "@/contexts/news-context"

export function NewsHero() {
  const { topStory, topStoryLoading } = useNews()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (topStoryLoading && !topStory) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </section>
    )
  }

  if (!topStory) {
    return (
      <section className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No top story available at the moment.</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Badge variant="destructive" className="mb-2">
          Breaking News
        </Badge>
        <h2 className="text-3xl font-bold mb-2">Top Story</h2>
      </div>

      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="md:flex">
          {topStory.urlToImage && (
            <div className="md:w-1/2">
              <img
                src={topStory.urlToImage || "/placeholder.svg"}
                alt={topStory.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          )}
          <CardContent className={`p-6 ${topStory.urlToImage ? "md:w-1/2" : "w-full"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{topStory.source.name}</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDate(topStory.publishedAt)}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 leading-tight">{topStory.title}</h3>

            {topStory.description && (
              <p className="text-muted-foreground mb-4 leading-relaxed">{topStory.description}</p>
            )}

            {topStory.author && <p className="text-sm text-muted-foreground mb-4">By {topStory.author}</p>}

            <a
              href={topStory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Read full article
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
