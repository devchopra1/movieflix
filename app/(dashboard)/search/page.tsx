"use client"

import { tmdbApi } from "@/lib/tmdb"
import { MovieCard } from "@/components/movie-card"
import { trackSearch } from "@/components/google-analytics"
import { useEffect } from "react"

interface SearchPageProps {
  searchParams: { q: string }
}

function SearchTracker({ query, resultsCount }: { query: string; resultsCount: number }) {
  useEffect(() => {
    if (query) {
      trackSearch(query, resultsCount)
    }
  }, [query, resultsCount])

  return null
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const movies = query ? await tmdbApi.searchMovies(query) : []

  return (
    <div className="container px-4 py-8">
      <SearchTracker query={query} resultsCount={movies.length} />
      <h1 className="mb-6 text-3xl font-bold">{query ? `Search results for "${query}"` : "Search Movies"}</h1>

      {query && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-gray-400">No movies found for "{query}"</p>
          <p className="mt-2 text-gray-500">Try a different search term</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
