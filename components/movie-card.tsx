"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getImageUrl, formatRating } from "@/lib/utils"
import { Star } from "lucide-react"
import type { Movie } from "@/lib/mock-data"

interface MovieCardProps {
  movie: Movie
  showRating?: boolean
}

export function MovieCard({ movie, showRating = true }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <Card className="overflow-hidden bg-transparent border-0 transition-all hover:scale-105">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <img
            src={getImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            className="object-cover w-full h-full"
            width={300}
            height={450}
          />
          {showRating && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center text-sm">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span>{formatRating(movie.vote_average)}</span>
            </div>
          )}
        </div>
        <CardContent className="p-2">
          <h3 className="font-medium text-sm line-clamp-1">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{new Date(movie.release_date).getFullYear()}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
