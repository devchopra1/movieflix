import Link from "next/link"

const allMovies = [
  { id: 1, title: "The Dark Knight", year: "2008", genre: "Action" },
  { id: 2, title: "Inception", year: "2010", genre: "Sci-Fi" },
  { id: 3, title: "Interstellar", year: "2014", genre: "Sci-Fi" },
  { id: 4, title: "The Matrix", year: "1999", genre: "Action" },
  { id: 5, title: "Pulp Fiction", year: "1994", genre: "Crime" },
  { id: 6, title: "Fight Club", year: "1999", genre: "Drama" },
  { id: 7, title: "Forrest Gump", year: "1994", genre: "Drama" },
  { id: 8, title: "The Godfather", year: "1972", genre: "Crime" },
  { id: 9, title: "Goodfellas", year: "1990", genre: "Crime" },
  { id: 10, title: "The Shawshank Redemption", year: "1994", genre: "Drama" },
  { id: 11, title: "Schindler's List", year: "1993", genre: "Drama" },
  { id: 12, title: "12 Angry Men", year: "1957", genre: "Drama" },
]

export default function MoviesPage() {
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
          <h1>All Movies</h1>
          <div className="movie-grid">
            {allMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`/placeholder.svg?height=300&width=200&text=${movie.title.replace(" ", "+")}`}
                  alt={movie.title}
                />
                <div className="movie-card-content">
                  <h3>{movie.title}</h3>
                  <p>
                    {movie.year} • {movie.genre}
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
