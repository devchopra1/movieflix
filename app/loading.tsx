export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent mx-auto"></div>
        <h2 className="text-xl font-semibold text-white">Loading MovieFlix...</h2>
        <p className="text-gray-400">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
