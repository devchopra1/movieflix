"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/movie-grid"
import { mockMovies } from "@/lib/mock-data"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      setLoading(true)
      // Simulate search delay
      setTimeout(() => {
        const filtered = mockMovies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.overview.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
        setLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    // Update URL with search query
    const url = new URL(window.location)
    url.searchParams.set("q", query)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Movies</h1>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No movies found for "{query}"</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </h2>
          <MovieGrid movies={results} />
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Enter a search term to find movies</p>
        </div>
      )}
    </div>
  )
}
