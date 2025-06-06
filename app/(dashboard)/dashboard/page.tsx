import { tmdbApi } from "@/lib/tmdb"
import { MovieCarousel } from "@/components/movie-carousel"

export default async function Dashboard() {
  const [trending, popular, topRated] = await Promise.all([
    tmdbApi.getTrending(),
    tmdbApi.getPopular(),
    tmdbApi.getTopRated(),
  ])

  return (
    <div className="container px-4 py-8">
      <section className="mb-12">
        <MovieCarousel title="Trending Now" movies={trending} />
      </section>
      <section className="mb-12">
        <MovieCarousel title="Popular Movies" movies={popular} />
      </section>
      <section className="mb-12">
        <MovieCarousel title="Top Rated" movies={topRated} />
      </section>
    </div>
  )
}
