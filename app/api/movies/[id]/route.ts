import { NextResponse } from "next/server"
import { tmdbApi } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
  }

  try {
    const movie = await tmdbApi.getMovieDetails(id)
    return NextResponse.json(movie)
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
