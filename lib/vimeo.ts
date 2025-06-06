import { env } from "@/app/env"

const VIMEO_ACCESS_TOKEN = env.VIMEO_ACCESS_TOKEN
const VIMEO_BASE_URL = "https://api.vimeo.com"

export interface VimeoVideo {
  uri: string
  name: string
  description: string
  duration: number
  width: number
  height: number
  language: string
  link: string
  player_embed_url: string
  pictures: {
    sizes: Array<{
      width: number
      height: number
      link: string
    }>
  }
  files?: Array<{
    quality: string
    type: string
    width: number
    height: number
    link: string
    size: number
  }>
}

export const vimeoApi = {
  // Get video details
  getVideo: async (videoId: string): Promise<VimeoVideo | null> => {
    try {
      const response = await fetch(`${VIMEO_BASE_URL}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      })

      if (!response.ok) {
        throw new Error(`Vimeo API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching Vimeo video:", error)
      return null
    }
  },

  // Search videos (if you have videos uploaded to your Vimeo account)
  searchVideos: async (query: string): Promise<VimeoVideo[]> => {
    try {
      const response = await fetch(`${VIMEO_BASE_URL}/me/videos?query=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      })

      if (!response.ok) {
        throw new Error(`Vimeo API error: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error searching Vimeo videos:", error)
      return []
    }
  },

  // Get user's videos
  getUserVideos: async (): Promise<VimeoVideo[]> => {
    try {
      const response = await fetch(`${VIMEO_BASE_URL}/me/videos`, {
        headers: {
          Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      })

      if (!response.ok) {
        throw new Error(`Vimeo API error: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching user videos:", error)
      return []
    }
  },
}

export const getVimeoEmbedUrl = (videoId: string): string => {
  return `https://player.vimeo.com/video/${videoId}?autoplay=0&title=0&byline=0&portrait=0`
}

export const extractVimeoId = (url: string): string | null => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}
