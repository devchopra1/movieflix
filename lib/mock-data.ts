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
  {
    id: 497,
    title: "The Green Mile",
    overview:
      "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments.",
    poster_path: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
    backdrop_path: "/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg",
    release_date: "1999-12-10",
    vote_average: 8.5,
    genre_ids: [14, 18, 80],
    adult: false,
    original_language: "en",
    original_title: "The Green Mile",
    popularity: 97.152,
    video: false,
    vote_count: 15220,
  },
  {
    id: 389,
    title: "12 Angry Men",
    overview:
      "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father.",
    poster_path: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg",
    backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    release_date: "1957-04-10",
    vote_average: 8.5,
    genre_ids: [18],
    adult: false,
    original_language: "en",
    original_title: "12 Angry Men",
    popularity: 41.902,
    video: false,
    vote_count: 7806,
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
    adult: false,
    original_language: "en",
    original_title: "Inception",
    popularity: 148.373,
    video: false,
    vote_count: 35053,
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
    adult: false,
    original_language: "en",
    original_title: "The Shawshank Redemption",
    popularity: 132.357,
    video: false,
    vote_count: 26280,
  },
]

// Export trending movies (first 4 movies)
export const mockTrendingMovies: Movie[] = mockMovies.slice(0, 4)

// Export mock user
export const mockUser: User = {
  id: "demo-user-123",
  name: "Demo User",
  email: "demo@movieflix.com",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
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
  {
    id: "h4",
    userId: "demo-user-123",
    movieId: 155,
    watchedAt: "2024-01-12T18:45:00Z",
    progress: 7200,
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
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
]
