import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { tmdbApi } from "@/lib/tmdb"
import { MovieCard } from "@/components/movie-card"

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  const historyEntries = await prisma.viewingHistory.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      watchedAt: "desc",
    },
  })

  const movies = await Promise.all(
    historyEntries.map(async (entry) => {
      try {
        const movie = await tmdbApi.getMovieDetails(entry.movieId)
        return { ...movie, progress: entry.progress, completed: entry.completed }
      } catch (error) {
        console.error(`Error fetching movie ${entry.movieId}:`, error)
        return null
      }
    }),
  )

  const validMovies = movies.filter(Boolean)

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Viewing History</h1>

      {validMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl text-gray-400">No viewing history</p>
          <p className="mt-2 text-gray-500">Start watching movies to see your history here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {validMovies.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />
              {movie.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                  <div
                    className="h-full bg-red-600"
                    style={{
                      width: `${movie.runtime ? (movie.progress / (movie.runtime * 60)) * 100 : 0}%`,
                    }}
                  />
                </div>
              )}
              {movie.completed && (
                <div className="absolute right-2 top-2 rounded-full bg-green-600 px-2 py-1 text-xs font-medium">
                  ✓ Completed
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
