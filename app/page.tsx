import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Button } from "@/components/ui/button"
import { tmdbApi, getImageUrl } from "@/lib/tmdb"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const trendingMovies = await tmdbApi.getTrending()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(trendingMovies[0]?.backdrop_path)})`,
              filter: "brightness(0.4)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Navigation */}
        <header className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-red-600">MovieFlix</h1>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard">
                <Button variant="default">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="default">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">Unlimited Movies, TV Shows, and More</h2>
          <p className="mb-8 text-xl md:text-2xl">Watch anywhere. Cancel anytime.</p>
          <Link href="/signup">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose MovieFlix?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-900 p-6 text-center">
              <h3 className="mb-4 text-2xl font-semibold">Huge Library</h3>
              <p>Access thousands of movies from classics to the latest releases.</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-6 text-center">
              <h3 className="mb-4 text-2xl font-semibold">HD Streaming</h3>
              <p>Enjoy your favorite movies in high definition quality.</p>
            </div>
            <div className="rounded-lg bg-gray-900 p-6 text-center">
              <h3 className="mb-4 text-2xl font-semibold">No Ads</h3>
              <p>Watch uninterrupted with our ad-free experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="mb-8 text-center text-4xl font-bold">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-6">
            {trendingMovies.slice(0, 6).map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-64">
                <img
                  src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-96 w-64 rounded-lg object-cover transition-transform hover:scale-105"
                />
                <h3 className="mt-2 text-lg font-medium">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-4xl font-bold">Ready to Watch?</h2>
          <p className="mb-8 text-xl">Join MovieFlix today and start streaming your favorite movies.</p>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="text-lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-red-600">MovieFlix</h2>
          </div>
          <div className="mb-8 flex justify-center gap-8">
            <a href="#" className="hover:text-red-600">
              About
            </a>
            <a href="#" className="hover:text-red-600">
              FAQ
            </a>
            <a href="#" className="hover:text-red-600">
              Terms of Service
            </a>
            <a href="#" className="hover:text-red-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-600">
              Contact
            </a>
          </div>
          <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} MovieFlix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
