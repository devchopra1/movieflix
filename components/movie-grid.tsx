"use client"

import { MovieCard } from "@/components/movie-card"
import type { Movie } from "@/lib/mock-data"

interface MovieGridProps {
  movies: Movie[]
  title?: string
}

export function MovieGrid({ movies, title }: MovieGridProps) {
  if (!movies.length) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-xl font-medium mb-2">No movies found</h2>
        <p className="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
