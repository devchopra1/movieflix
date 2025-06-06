export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  vote_count: number
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface WatchlistItem {
  id: string
  userId: string
  movieId: number
  addedAt: string
}

export interface ViewingHistory {
  id: string
  userId: string
  movieId: number
  watchedAt: string
  progress: number
  completed: boolean
}

export const mockMovies: Movie[] = [
  {
    id: 550,
    title: "Fight Club",
    overview:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
    release_date: "1999-10-15",
    vote_average: 8.4,
    genre_ids: [18, 53, 35],
    adult: false,
    original_language: "en",
    original_title: "Fight Club",
    popularity: 61.416,
    video: false,
    vote_count: 26280,
  },
  {
    id: 13,
    title: "Forrest Gump",
    overview:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    release_date: "1994-06-23",
    vote_average: 8.5,
    genre_ids: [35, 18, 10749],
    adult: false,
    original_language: "en",
    original_title: "Forrest Gump",
    popularity: 48.307,
    video: false,
    vote_count: 24943,
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
    genre_ids: [53, 80],
    adult: false,
    original_language: "en",
    original_title: "Pulp Fiction",
    popularity: 65.107,
    video: false,
    vote_count: 24947,
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    release_date: "2008-07-16",
    vote_average: 9.0,
    genre_ids: [18, 28, 80, 53],
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight",
    popularity: 123.167,
    video: false,
    vote_count: 31917,
  },
]

// Export trending movies (first 4 movies)
export const mockTrendingMovies: Movie[] = mockMovies.slice(0, 4)

// Export mock user
export const mockUser: User = {
  id: "demo-user-123",
  name: "Demo User",
  email: "demo@movieflix.com",
  image: "/placeholder.svg?height=40&width=40",
}

// Export mock watchlist
export const mockWatchlist: WatchlistItem[] = [
  {
    id: "w1",
    userId: "demo-user-123",
    movieId: 550,
    addedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "w2",
    userId: "demo-user-123",
    movieId: 680,
    addedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "w3",
    userId: "demo-user-123",
    movieId: 13,
    addedAt: "2024-01-13T09:20:00Z",
  },
]

// Export mock viewing history
export const mockViewingHistory: ViewingHistory[] = [
  {
    id: "h1",
    userId: "demo-user-123",
    movieId: 550,
    watchedAt: "2024-01-15T20:30:00Z",
    progress: 3600,
    completed: true,
  },
  {
    id: "h2",
    userId: "demo-user-123",
    movieId: 680,
    watchedAt: "2024-01-14T19:15:00Z",
    progress: 1800,
    completed: false,
  },
  {
    id: "h3",
    userId: "demo-user-123",
    movieId: 13,
    watchedAt: "2024-01-13T21:00:00Z",
    progress: 5400,
    completed: true,
  },
]

// Export genres
export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 53, name: "Thriller" },
]
