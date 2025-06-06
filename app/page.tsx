"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/movie-grid"
import { mockMovies, mockTrendingMovies } from "@/lib/mock-data"
import Link from "next/link"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading MovieFlix...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MovieFlix</h1>
            <p className="text-xl mb-8">Discover and watch thousands of movies. Start your journey now.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/browse">Browse Movies</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/trending">Trending Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <MovieGrid movies={mockTrendingMovies} title="Trending Now" />
          <MovieGrid movies={mockMovies} title="Popular Movies" />
        </div>
      </div>
    </div>
  )
}
