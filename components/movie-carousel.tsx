"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Movie } from "@/lib/tmdb"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"

interface MovieCarouselProps {
  title: string
  movies: Movie[]
}

export function MovieCarousel({ title, movies }: MovieCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[180px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  )
}
