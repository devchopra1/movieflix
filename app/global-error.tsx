"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-black text-white">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-red-600">MovieFlix</h1>
            <h2 className="mb-4 text-2xl">Something went wrong!</h2>
            <p className="mb-8 text-gray-400">We're experiencing technical difficulties. Please try again later.</p>
            <button onClick={reset} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
