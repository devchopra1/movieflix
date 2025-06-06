import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { movies } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative flex h-screen items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        ></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">Welcome to MovieFlix</h1>
            <p className="mb-8 text-xl">Discover and watch thousands of movies. Start your journey now.</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="/browse">Browse Movies</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/trending">Trending Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-3xl font-bold">Popular Movies</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}
