export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Fight Club",
    overview:
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
    poster_path: "/placeholder.svg?height=450&width=300",
    backdrop_path: "/placeholder.svg?height=720&width=1280",
    release_date: "1999-10-15",
    vote_average: 8.4,
    genre_ids: [18, 53],
  },
  {
    id: 2,
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
    poster_path: "/placeholder.svg?height=450&width=300",
    backdrop_path: "/placeholder.svg?height=720&width=1280",
    release_date: "2008-07-16",
    vote_average: 9.0,
    genre_ids: [28, 18, 80],
  },
  {
    id: 3,
    title: "Pulp Fiction",
    overview:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/placeholder.svg?height=450&width=300",
    backdrop_path: "/placeholder.svg?height=720&width=1280",
    release_date: "1994-09-10",
    vote_average: 8.5,
    genre_ids: [53, 80],
  },
  {
    id: 4,
    title: "Forrest Gump",
    overview:
      "A man with a low IQ has accomplished great things in his life and been present during significant historic events.",
    poster_path: "/placeholder.svg?height=450&width=300",
    backdrop_path: "/placeholder.svg?height=720&width=1280",
    release_date: "1994-06-23",
    vote_average: 8.5,
    genre_ids: [35, 18],
  },
]
