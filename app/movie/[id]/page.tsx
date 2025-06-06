import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { movies } from "@/lib/data"
import { formatDate, formatRating } from "@/lib/utils"
import { Star, Calendar, Play, Plus } from "lucide-react"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  const movieId = Number.parseInt(params.id)
  const movie = movies.find((m) => m.id === movieId)

  if (!movie) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop_path})`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster_path || "/placeholder.svg"}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto md:mx-0"
              width={300}
              height={450}
            />
          </div>

          {/* Details */}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                <span>{formatRating(movie.vote_average)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
            </div>

            <p className="text-lg mb-6 text-gray-300">{movie.overview}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Now
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
