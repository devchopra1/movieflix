import { NextResponse } from "next/server"
import { tmdbApi } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await tmdbApi.getPopular()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return NextResponse.json({ error: "Failed to fetch popular movies" }, { status: 500 })
  }
}
