import { NextResponse } from "next/server"
import { vimeoApi } from "@/lib/vimeo"

export async function GET() {
  try {
    // Test Vimeo API connection by getting user videos
    const videos = await vimeoApi.getUserVideos()

    return NextResponse.json({
      success: true,
      message: "Vimeo API connected successfully",
      videoCount: videos.length,
      videos: videos.slice(0, 3), // Return first 3 videos as sample
    })
  } catch (error) {
    console.error("Vimeo API test failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to Vimeo API",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
