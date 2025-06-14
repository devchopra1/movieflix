import Link from "next/link"

const trendingMovies = [
  { id: 1, title: "Avatar: The Way of Water", year: "2022", rating: "8.1" },
  { id: 2, title: "Top Gun: Maverick", year: "2022", rating: "8.3" },
  { id: 3, title: "Black Panther: Wakanda Forever", year: "2022", rating: "7.5" },
  { id: 4, title: "Doctor Strange 2", year: "2022", rating: "7.8" },
  { id: 5, title: "Thor: Love and Thunder", year: "2022", rating: "7.2" },
  { id: 6, title: "Minions: The Rise of Gru", year: "2022", rating: "7.1" },
]

export default function TrendingPage() {
  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              MovieFlix
            </Link>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/movies">Movies</Link>
              <Link href="/trending">Trending</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <h1>Trending Movies</h1>
          <div className="movie-grid">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`/placeholder.svg?height=300&width=200&text=${movie.title.replace(" ", "+")}`}
                  alt={movie.title}
                />
                <div className="movie-card-content">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.year} • ⭐ {movie.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
