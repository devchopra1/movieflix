import { NextResponse } from "next/server"
import { mockMovies } from "@/lib/mock-data"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Sort by vote_average for popular movies
    const popular = [...mockMovies].sort((a, b) => b.vote_average - a.vote_average)

    return NextResponse.json({
      results: popular,
      total_pages: 1,
      total_results: popular.length,
    })
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return NextResponse.json({ error: "Failed to fetch popular movies" }, { status: 500 })
  }
}
