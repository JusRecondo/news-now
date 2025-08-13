import { type NextRequest, NextResponse } from "next/server"

const NEWS_API_KEY = process.env.NEWS_API_KEY
const NEWS_API_URL = "https://newsapi.org/v2"

export async function GET(request: NextRequest) {
  if (!NEWS_API_KEY) {
    return NextResponse.json({ error: "NEWS_API_KEY environment variable is not set" }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "1"
  const pageSize = searchParams.get("pageSize") || "20"
  const query = searchParams.get("q") || "World"
  const sortBy = searchParams.get("sortBy") || "publishedAt"

  try {
    const response = await fetch(
      `${NEWS_API_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`,
      {
        headers: {
          "User-Agent": "NewsHub/1.0",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      throw new Error(`NewsAPI responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news articles:", error)
    return NextResponse.json({ error: "Failed to fetch news articles" }, { status: 500 })
  }
}
