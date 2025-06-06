"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Play, Heart, HeartOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { trackWatchlistAdd, trackMoviePlay } from "@/components/google-analytics"

interface MovieActionsProps {
  movieId: number
  movieTitle: string
  isInWatchlist: boolean
  viewingProgress: number
}

export function MovieActions({ movieId, movieTitle, isInWatchlist, viewingProgress }: MovieActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist)
  const [isLoading, setIsLoading] = useState(false)

  const handleWatchlistToggle = async () => {
    try {
      setIsLoading(true)

      if (inWatchlist) {
        await fetch(`/api/user/watchlist/${movieId}`, {
          method: "DELETE",
        })
        toast({
          title: "Removed from watchlist",
          description: "The movie has been removed from your watchlist",
        })
      } else {
        await fetch("/api/user/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId }),
        })
        toast({
          title: "Added to watchlist",
          description: "The movie has been added to your watchlist",
        })

        // Track analytics event
        trackWatchlistAdd(movieId, movieTitle)
      }

      setInWatchlist(!inWatchlist)
      router.refresh()
    } catch (error) {
      console.error("Error toggling watchlist:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update watchlist",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToPlayer = () => {
    // Track play event
    trackMoviePlay(movieId, movieTitle)

    document.getElementById("movie-player")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  return (
    <div className="flex flex-wrap gap-4">
      <Button size="lg" className="gap-2" onClick={scrollToPlayer}>
        <Play className="h-5 w-5" />
        {viewingProgress > 0 ? "Continue Watching" : "Watch Now"}
      </Button>
      <Button variant="outline" size="lg" className="gap-2" onClick={handleWatchlistToggle} disabled={isLoading}>
        {inWatchlist ? (
          <>
            <HeartOff className="h-5 w-5" />
            Remove from Watchlist
          </>
        ) : (
          <>
            <Heart className="h-5 w-5" />
            Add to Watchlist
          </>
        )}
      </Button>
    </div>
  )
}
