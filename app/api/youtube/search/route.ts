import { NextResponse } from "next/server"
import { youtubeApi } from "@/lib/youtube"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")
  const year = searchParams.get("year")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const trailers = await youtubeApi.searchTrailers(query, year || undefined)
    return NextResponse.json(trailers)
  } catch (error) {
    console.error("Error searching YouTube trailers:", error)
    return NextResponse.json({ error: "Failed to search YouTube trailers" }, { status: 500 })
  }
}
