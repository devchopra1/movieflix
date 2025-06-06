"use client"

import { useEffect } from "react"
import { trackMovieView } from "@/components/google-analytics"

interface MovieViewTrackerProps {
  movieId: number
  movieTitle: string
}

export function MovieViewTracker({ movieId, movieTitle }: MovieViewTrackerProps) {
  useEffect(() => {
    // Track movie view when component mounts
    trackMovieView(movieId, movieTitle)
  }, [movieId, movieTitle])

  return null // This component doesn't render anything
}
