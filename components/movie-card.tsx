import Link from "next/link"
import { Star } from "lucide-react"
import { formatRating } from "@/lib/utils"
import type { Movie } from "@/lib/data"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-gray-900 transition-transform hover:scale-105">
        <img
          src={movie.poster_path || "/placeholder.svg"}
          alt={movie.title}
          className="aspect-[2/3] w-full object-cover"
          width={300}
          height={450}
        />
        <div className="absolute bottom-2 left-2 flex items-center rounded bg-black/70 px-2 py-1 text-white">
          <Star className="mr-1 h-4 w-4 text-yellow-400" />
          <span className="text-sm">{formatRating(movie.vote_average)}</span>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-white">{movie.title}</h3>
          <p className="text-sm text-gray-400">{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </div>
    </Link>
  )
}
