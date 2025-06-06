import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { tmdbApi } from "@/lib/tmdb"
import { MovieCard } from "@/components/movie-card"

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const watchlistEntries = await prisma.watchlist.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      addedAt: "desc",
    },
  })

  const movies = await Promise.all(
    watchlistEntries.map(async (entry) => {
      try {
        return await tmdbApi.getMovieDetails(entry.movieId)
      } catch (error) {
        console.error(`Error fetching movie ${entry.movieId}:`, error)
        return null
      }
    }),
  )

  const validMovies = movies.filter(Boolean)

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Watchlist</h1>

      {validMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-gray-400">Your watchlist is empty</p>
          <p className="mt-2 text-gray-500">Add movies to your watchlist to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {validMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
