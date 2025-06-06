import { type NextRequest, NextResponse } from "next/server"
import { mockMovies } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")?.toLowerCase() || ""

    if (!query) {
      return NextResponse.json({
        results: [],
        total_pages: 0,
        total_results: 0,
      })
    }

    // Filter movies based on title or overview
    const filteredMovies = mockMovies.filter(
      (movie) => movie.title.toLowerCase().includes(query) || movie.overview.toLowerCase().includes(query),
    )

    return NextResponse.json({
      results: filteredMovies,
      total_pages: 1,
      total_results: filteredMovies.length,
    })
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
