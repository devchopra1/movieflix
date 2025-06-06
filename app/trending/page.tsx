"use client"

import { useState } from "react"
import { MovieGrid } from "@/components/movie-grid"
import { mockTrendingMovies } from "@/lib/mock-data"

export default function TrendingPage() {
  const [movies] = useState(mockTrendingMovies)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  )
}
