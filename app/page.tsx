import Link from "next/link"

const movies = [
  { id: 1, title: "The Dark Knight", year: "2008", image: "/placeholder.svg?height=300&width=200&text=Movie+1" },
  { id: 2, title: "Inception", year: "2010", image: "/placeholder.svg?height=300&width=200&text=Movie+2" },
  { id: 3, title: "Interstellar", year: "2014", image: "/placeholder.svg?height=300&width=200&text=Movie+3" },
  { id: 4, title: "The Matrix", year: "1999", image: "/placeholder.svg?height=300&width=200&text=Movie+4" },
  { id: 5, title: "Pulp Fiction", year: "1994", image: "/placeholder.svg?height=300&width=200&text=Movie+5" },
  { id: 6, title: "Fight Club", year: "1999", image: "/placeholder.svg?height=300&width=200&text=Movie+6" },
  { id: 7, title: "Forrest Gump", year: "1994", image: "/placeholder.svg?height=300&width=200&text=Movie+7" },
  { id: 8, title: "The Godfather", year: "1972", image: "/placeholder.svg?height=300&width=200&text=Movie+8" },
]

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">MovieFlix</div>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/movies">Movies</Link>
              <Link href="/trending">Trending</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to MovieFlix</h1>
            <p>Discover and watch thousands of movies. Start your journey now.</p>
            <Link href="/movies" className="btn">
              Browse Movies
            </Link>
            <Link href="/trending" className="btn btn-outline">
              Trending Now
            </Link>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="section">
        <div className="container">
          <h2>Popular Movies</h2>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.image || "/placeholder.svg"} alt={movie.title} />
                <div className="movie-card-content">
                  <h3>{movie.title}</h3>
                  <p>{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
