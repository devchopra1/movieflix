import { env } from "@/app/env"

const YOUTUBE_API_KEY = env.YOUTUBE_API_KEY
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3"

export interface YouTubeVideo {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      default: { url: string }
      medium: { url: string }
      high: { url: string }
    }
    publishedAt: string
    channelTitle: string
  }
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[]
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export const youtubeApi = {
  searchTrailers: async (movieTitle: string, year?: string): Promise<YouTubeVideo[]> => {
    try {
      const query = `${movieTitle} ${year ? year : ""} official trailer`
      const response = await fetch(
        `${YOUTUBE_BASE_URL}/search?part=snippet&q=${encodeURIComponent(
          query,
        )}&type=video&videoDuration=medium&videoDefinition=high&maxResults=5&key=${YOUTUBE_API_KEY}`,
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data: YouTubeSearchResponse = await response.json()
      return data.items || []
    } catch (error) {
      console.error("Error searching YouTube trailers:", error)
      return []
    }
  },

  getVideoDetails: async (videoId: string) => {
    try {
      const response = await fetch(
        `${YOUTUBE_BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`,
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()
      return data.items?.[0] || null
    } catch (error) {
      console.error("Error fetching YouTube video details:", error)
      return null
    }
  },
}

export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`
}

export const getYouTubeThumbnail = (
  videoId: string,
  quality: "default" | "medium" | "high" | "maxres" = "high",
): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality === "maxres" ? "maxresdefault" : quality === "high" ? "hqdefault" : quality === "medium" ? "mqdefault" : "default"}.jpg`
}
