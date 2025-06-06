import { NextResponse } from "next/server"
import { tmdbApi } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await tmdbApi.getTrending()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}
