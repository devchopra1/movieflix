import { notFound } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { tmdbApi, getImageUrl } from "@/lib/tmdb"
import { getYouTubeEmbedUrl } from "@/lib/youtube"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { MovieActions } from "@/components/movie-actions"
import { MoviePlayer } from "@/components/movie-player"
import { MovieCarousel } from "@/components/movie-carousel"
import { MovieViewTracker } from "@/components/movie-view-tracker"

interface MoviePageProps {
  params: { id: string }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  try {
    const movie = await tmdbApi.getMovieDetails(id)
    const session = await getServerSession(authOptions)

    let isInWatchlist = false
    let viewingProgress = 0

    if (session?.user?.id) {
      const watchlistEntry = await prisma.watchlist.findFirst({
        where: {
          userId: session.user.id,
          movieId: id,
        },
      })

      const historyEntry = await prisma.viewingHistory.findFirst({
        where: {
          userId: session.user.id,
          movieId: id,
        },
      })

      isInWatchlist = !!watchlistEntry
      viewingProgress = historyEntry?.progress || 0
    }

    // Get trailers from both TMDB and YouTube
    const tmdbTrailer = movie.videos?.results.find((video) => video.type === "Trailer" && video.site === "YouTube")
    const youtubeTrailers = movie.youtubeTrailers || []

    const director = movie.credits?.crew.find((person) => person.job === "Director")
    const cast = movie.credits?.cast.slice(0, 5) || []

    // Get similar and recommended movies
    const [similarMovies, recommendedMovies] = await Promise.all([
      tmdbApi.getSimilarMovies(id),
      tmdbApi.getRecommendedMovies(id),
    ])

    return (
      <div className="min-h-screen bg-black">
        {/* Analytics tracker */}
        <MovieViewTracker movieId={movie.id} movieTitle={movie.title} />

        {/* Hero Section with Backdrop */}
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
                filter: "brightness(0.3)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          <div className="container relative z-10 px-4 py-12">
            <div className="flex flex-col gap-8 md:flex-row">
              {/* Movie Poster */}
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-auto w-full max-w-[300px] rounded-lg shadow-lg md:w-[300px]"
                />
              </div>

              {/* Movie Details */}
              <div className="flex flex-col">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">{movie.title}</h1>

                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="rounded bg-yellow-500 px-2 py-1 text-sm font-medium text-black">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span>{movie.runtime} min</span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <span key={genre.id} className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="mb-6 text-gray-300">{movie.overview}</p>

                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold">Cast & Crew</h3>
                  <p className="text-gray-300">
                    <span className="font-medium">Director:</span> {director?.name || "Unknown"}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-medium">Cast:</span> {cast.map((person) => person.name).join(", ")}
                  </p>
                </div>

                <MovieActions
                  movieId={movie.id}
                  movieTitle={movie.title}
                  isInWatchlist={isInWatchlist}
                  viewingProgress={viewingProgress}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Movie Player Section */}
        <div className="container px-4 py-8">
          <h2 className="mb-4 text-2xl font-bold">Watch {movie.title}</h2>
          <MoviePlayer
            movieId={movie.id}
            title={movie.title}
            trailerKey={tmdbTrailer?.key}
            initialProgress={viewingProgress}
          />
        </div>

        {/* Trailers Section */}
        {(tmdbTrailer || youtubeTrailers.length > 0) && (
          <div className="container px-4 py-8">
            <h2 className="mb-6 text-2xl font-bold">Trailers & Videos</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* TMDB Trailer */}
              {tmdbTrailer && (
                <div className="group">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={`https://www.youtube.com/embed/${tmdbTrailer.key}`}
                      title={`${movie.title} - ${tmdbTrailer.name}`}
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-2 font-medium">{tmdbTrailer.name}</h3>
                  <p className="text-sm text-gray-400">Official Trailer</p>
                </div>
              )}

              {/* YouTube Trailers */}
              {youtubeTrailers.slice(0, 5).map((trailer, index) => (
                <div key={trailer.id.videoId} className="group">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <iframe
                      src={getYouTubeEmbedUrl(trailer.id.videoId)}
                      title={trailer.snippet.title}
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-2 font-medium line-clamp-2">{trailer.snippet.title}</h3>
                  <p className="text-sm text-gray-400">{trailer.snippet.channelTitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div className="container px-4 py-8">
            <MovieCarousel title="Similar Movies" movies={similarMovies} />
          </div>
        )}

        {/* Recommended Movies */}
        {recommendedMovies.length > 0 && (
          <div className="container px-4 py-8">
            <MovieCarousel title="Recommended for You" movies={recommendedMovies} />
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }
}
