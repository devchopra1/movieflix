import {
  mockMovies,
  mockTrendingMovies,
  mockWatchlist,
  mockViewingHistory,
  type Movie,
  type WatchlistItem,
  type ViewingHistory,
} from "./mock-data"
import { LocalStorage, STORAGE_KEYS } from "./storage"

export class MockAPI {
  // Movies
  static async getPopularMovies(): Promise<Movie[]> {
    await this.delay(500)
    return mockMovies
  }

  static async getTrendingMovies(): Promise<Movie[]> {
    await this.delay(500)
    return mockTrendingMovies
  }

  static async searchMovies(query: string): Promise<Movie[]> {
    await this.delay(500)
    return mockMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.overview.toLowerCase().includes(query.toLowerCase()),
    )
  }

  static async getMovieById(id: number): Promise<Movie | null> {
    await this.delay(300)
    return mockMovies.find((movie) => movie.id === id) || null
  }

  // Watchlist
  static async getWatchlist(userId: string): Promise<WatchlistItem[]> {
    await this.delay(300)
    const stored = LocalStorage.get(STORAGE_KEYS.WATCHLIST, mockWatchlist)
    return stored.filter((item) => item.userId === userId)
  }

  static async addToWatchlist(userId: string, movieId: number): Promise<WatchlistItem> {
    await this.delay(300)
    const watchlist = LocalStorage.get(STORAGE_KEYS.WATCHLIST, mockWatchlist)

    const newItem: WatchlistItem = {
      id: `w_${Date.now()}`,
      userId,
      movieId,
      addedAt: new Date().toISOString(),
    }

    const updated = [...watchlist, newItem]
    LocalStorage.set(STORAGE_KEYS.WATCHLIST, updated)
    return newItem
  }

  static async removeFromWatchlist(userId: string, movieId: number): Promise<void> {
    await this.delay(300)
    const watchlist = LocalStorage.get(STORAGE_KEYS.WATCHLIST, mockWatchlist)
    const updated = watchlist.filter((item) => !(item.userId === userId && item.movieId === movieId))
    LocalStorage.set(STORAGE_KEYS.WATCHLIST, updated)
  }

  // Viewing History
  static async getViewingHistory(userId: string): Promise<ViewingHistory[]> {
    await this.delay(300)
    const stored = LocalStorage.get(STORAGE_KEYS.VIEWING_HISTORY, mockViewingHistory)
    return stored.filter((item) => item.userId === userId)
  }

  static async addToHistory(userId: string, movieId: number, progress = 0): Promise<ViewingHistory> {
    await this.delay(300)
    const history = LocalStorage.get(STORAGE_KEYS.VIEWING_HISTORY, mockViewingHistory)

    const existingIndex = history.findIndex((item) => item.userId === userId && item.movieId === movieId)

    const historyItem: ViewingHistory = {
      id: existingIndex >= 0 ? history[existingIndex].id : `h_${Date.now()}`,
      userId,
      movieId,
      watchedAt: new Date().toISOString(),
      progress,
      completed: progress > 0,
    }

    if (existingIndex >= 0) {
      history[existingIndex] = historyItem
    } else {
      history.push(historyItem)
    }

    LocalStorage.set(STORAGE_KEYS.VIEWING_HISTORY, history)
    return historyItem
  }

  // Utility
  private static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
