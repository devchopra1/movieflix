import { NextResponse } from "next/server"
import { mockMovies } from "@/lib/mock-data"

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return shuffled movies to simulate trending
    const shuffled = [...mockMovies].sort(() => Math.random() - 0.5)

    return NextResponse.json({
      results: shuffled,
      total_pages: 1,
      total_results: shuffled.length,
    })
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}
