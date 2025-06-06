"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { MockAPI } from "@/lib/api-mock"
import type { Movie } from "@/lib/mock-data"
import { MovieCarousel } from "@/components/movie-carousel"
import { Button } from "@/components/ui/button"
import { Play, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMovies() {
      try {
        const [trending, popular] = await Promise.all([MockAPI.getTrendingMovies(), MockAPI.getPopularMovies()])
        setTrendingMovies(trending)
        setPopularMovies(popular)
      } catch (error) {
        console.error("Failed to load movies:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading MovieFlix...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
            }}
          ></div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              MovieFlix
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Unlimited movies, TV shows and more. Watch anywhere. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/login">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/signup">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose MovieFlix?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited Streaming</h3>
                <p className="text-muted-foreground">Watch as much as you want, whenever you want.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Latest Movies</h3>
                <p className="text-muted-foreground">Access to the newest releases and trending content.</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">High-definition streaming with crystal clear audio.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Featured Movies</h2>
            {!loading && trendingMovies.length > 0 && (
              <MovieCarousel title="Trending Now" movies={trendingMovies} showActions={false} />
            )}
          </div>
        </div>
      </div>
    )
  }

  // Authenticated user dashboard
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to MovieFlix</h1>
          <p className="text-muted-foreground">Discover and watch your favorite movies</p>
        </div>

        <div className="space-y-12">
          {trendingMovies.length > 0 && <MovieCarousel title="Trending Now" movies={trendingMovies} />}

          {popularMovies.length > 0 && <MovieCarousel title="Popular Movies" movies={popularMovies} />}
        </div>
      </div>
    </div>
  )
}
