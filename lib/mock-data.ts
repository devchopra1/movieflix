export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  runtime?: number
  genres?: { id: number; name: string }[]
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

// Mock user data
export const mockUser: User = {
  id: "user_1",
  name: "Demo User",
  email: "demo@movieflix.com",
  image: "/placeholder.svg?height=40&width=40",
}

// Mock popular movies
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
    genre_ids: [18, 53],
    runtime: 139,
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-09-10",
    vote_average: 8.9,
    genre_ids: [80, 18],
    runtime: 154,
  },
  {
    id: 13,
    title: "Forrest Gump",
    overview:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c8obl4XlbdTjsLTyd8C6UZUPYw.jpg",
    release_date: "1994-06-23",
    vote_average: 8.5,
    genre_ids: [35, 18, 10749],
    runtime: 142,
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-15",
    vote_average: 8.8,
    genre_ids: [28, 878, 53],
    runtime: 148,
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
    runtime: 152,
  },
  {
    id: 278,
    title: "The Shawshank Redemption",
    overview:
      "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    release_date: "1994-09-23",
    vote_average: 9.3,
    genre_ids: [18, 80],
    runtime: 142,
  },
]

// Mock trending movies
export const mockTrendingMovies: Movie[] = mockMovies.slice(0, 4)

// Mock watchlist
export const mockWatchlist: WatchlistItem[] = [
  {
    id: "w1",
    userId: "user_1",
    movieId: 550,
    addedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "w2",
    userId: "user_1",
    movieId: 680,
    addedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "w3",
    userId: "user_1",
    movieId: 13,
    addedAt: "2024-01-13T09:20:00Z",
  },
]

// Mock viewing history
export const mockViewingHistory: ViewingHistory[] = [
  {
    id: "h1",
    userId: "user_1",
    movieId: 550,
    watchedAt: "2024-01-15T20:30:00Z",
    progress: 3600,
    completed: true,
  },
  {
    id: "h2",
    userId: "user_1",
    movieId: 680,
    watchedAt: "2024-01-14T19:15:00Z",
    progress: 1800,
    completed: false,
  },
  {
    id: "h3",
    userId: "user_1",
    movieId: 13,
    watchedAt: "2024-01-13T21:00:00Z",
    progress: 5400,
    completed: true,
  },
]
