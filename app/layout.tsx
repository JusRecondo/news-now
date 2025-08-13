import type React from "react"
import { NewsProvider } from "@/contexts/news-context"
import type { Metadata } from "next"
import { Geist } from 'next/font/google'
import "./globals.css"
import { FiltersProvider } from "@/contexts/filters-context"

export const metadata: Metadata = {
  title: "NewsNow - Stay Informed with Latest News",
  description: "Your trusted source for breaking news, world events, technology, business, and more.",
}

const geist = Geist({
  subsets: ['latin'],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <FiltersProvider>
          <NewsProvider>
            {children}
          </NewsProvider>
        </FiltersProvider>
      </body>
    </html>
  )
}
