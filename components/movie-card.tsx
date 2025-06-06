import Link from "next/link"
import { type Movie, getImageUrl } from "@/lib/tmdb"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-lg transition-all hover:scale-105">
        <img
          src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
          alt={movie.title}
          className="h-[300px] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded bg-yellow-500 px-1.5 py-0.5 text-xs font-medium text-black">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
