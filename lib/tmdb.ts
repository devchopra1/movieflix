import { env } from "@/app/env"
import { youtubeApi } from "./youtube"

const TMDB_API_KEY = env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  genres?: Genre[]
  runtime?: number
  videos?: {
    results: Video[]
  }
  credits?: {
    cast: Cast[]
    crew: Crew[]
  }
  youtubeTrailers?: any[] // YouTube trailers from our API
}

export interface Genre {
  id: number
  name: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Crew {
  id: number
  name: string
  job: string
  profile_path: string | null
}

export const tmdbApi = {
  getTrending: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()
    return data.results
  },

  getPopular: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()
    return data.results
  },

  getTopRated: async (): Promise<Movie[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()
    return data.results
  },

  getMovieDetails: async (id: number): Promise<Movie> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos,credits`,
    )
    const data = await response.json()

    // Fetch additional YouTube trailers
    try {
      const year = new Date(data.release_date).getFullYear().toString()
      const youtubeTrailers = await youtubeApi.searchTrailers(data.title, year)
      data.youtubeTrailers = youtubeTrailers
    } catch (error) {
      console.error("Error fetching YouTube trailers:", error)
      data.youtubeTrailers = []
    }

    return data
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
        query,
      )}&page=1&include_adult=false`,
    )
    const data = await response.json()
    return data.results
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await fetch(`${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`)
    const data = await response.json()
    return data.genres
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`,
    )
    const data = await response.json()
    return data.results
  },

  getSimilarMovies: async (movieId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    )
    const data = await response.json()
    return data.results
  },

  getRecommendedMovies: async (movieId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    )
    const data = await response.json()
    return data.results
  },
}

export const getImageUrl = (path: string | null, size = "original"): string => {
  if (!path) return "/placeholder.svg?height=400&width=300"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getYoutubeUrl = (key: string): string => {
  return `https://www.youtube.com/embed/${key}`
}
