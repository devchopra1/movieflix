"use client"

import { useState } from "react"
import { MovieGrid } from "@/components/movie-grid"
import { mockMovies } from "@/lib/mock-data"

export default function BrowsePage() {
  const [movies] = useState(mockMovies)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Movies</h1>
      <MovieGrid movies={movies} />
    </div>
  )
}
