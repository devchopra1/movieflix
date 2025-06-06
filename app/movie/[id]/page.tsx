"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { mockMovies } from "@/lib/mock-data"
import { getImageUrl, formatDate, formatRating } from "@/lib/utils"
import { Star, Clock, Calendar, Play, Plus } from "lucide-react"
import Link from "next/link"

export default function MoviePage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find movie by ID
    const movieId = Number(id)
    const foundMovie = mockMovies.find((m) => m.id === movieId)

    // Simulate API delay
    setTimeout(() => {
      setMovie(foundMovie || null)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <p className="mb-8">The movie you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/browse">Browse Movies</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto md:mx-0"
              width={300}
              height={450}
            />
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                <span>{formatRating(movie.vote_average)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>2h 15m</span>
              </div>
            </div>

            <p className="text-lg mb-6 text-muted-foreground">{movie.overview}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Now
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Watchlist
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre_ids.map((genreId) => (
                  <span key={genreId} className="px-3 py-1 bg-secondary rounded-full text-sm">
                    {genreId === 28
                      ? "Action"
                      : genreId === 12
                        ? "Adventure"
                        : genreId === 35
                          ? "Comedy"
                          : genreId === 18
                            ? "Drama"
                            : genreId === 53
                              ? "Thriller"
                              : genreId === 80
                                ? "Crime"
                                : "Other"}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Movie Info</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Release Date:</span> {formatDate(movie.release_date)}
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span> {formatRating(movie.vote_average)}/10
                  </div>
                  <div>
                    <span className="font-medium">Language:</span> {movie.original_language.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
