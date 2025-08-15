import { NextResponse } from "next/server"

const NEWS_API_KEY = process.env.NEWS_API_KEY
const NEWS_API_URL = "https://newsapi.org/v2"

export async function GET() {
  if (!NEWS_API_KEY) {
    return NextResponse.json({ error: "NEWS_API_KEY environment variable is not set" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?country=us&apiKey=${NEWS_API_KEY}&pageSize=2&page=1`,
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
    console.error("Error fetching top headlines:", error)
    return NextResponse.json({ error: "Failed to fetch news articles" }, { status: 500 })
  }
}
