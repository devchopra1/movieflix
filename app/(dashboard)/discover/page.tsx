import { tmdbApi } from "@/lib/tmdb"
import { MovieCarousel } from "@/components/movie-carousel"

export default async function DiscoverPage() {
  const [genres, actionMovies, comedyMovies, dramaMovies, horrorMovies] = await Promise.all([
    tmdbApi.getGenres(),
    tmdbApi.getMoviesByGenre(28), // Action
    tmdbApi.getMoviesByGenre(35), // Comedy
    tmdbApi.getMoviesByGenre(18), // Drama
    tmdbApi.getMoviesByGenre(27), // Horror
  ])

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discover Movies</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Browse by Genre</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {genres.slice(0, 12).map((genre) => (
            <div
              key={genre.id}
              className="rounded-lg bg-gradient-to-br from-red-600 to-red-800 p-4 text-center transition-transform hover:scale-105"
            >
              <h3 className="font-medium text-white">{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <MovieCarousel title="Action Movies" movies={actionMovies} />
      </section>

      <section className="mb-12">
        <MovieCarousel title="Comedy Movies" movies={comedyMovies} />
      </section>

      <section className="mb-12">
        <MovieCarousel title="Drama Movies" movies={dramaMovies} />
      </section>

      <section className="mb-12">
        <MovieCarousel title="Horror Movies" movies={horrorMovies} />
      </section>
    </div>
  )
}
