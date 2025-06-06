import type { User } from "./mock-data"

// Storage keys
export const STORAGE_KEYS = {
  USER: "movieflix_user",
  WATCHLIST: "movieflix_watchlist",
  HISTORY: "movieflix_history",
  AUTH_TOKEN: "movieflix_auth_token",
  PREFERENCES: "movieflix_preferences",
} as const

// LocalStorage utility class
export class LocalStorage {
  static get<T>(key: string, defaultValue: T): T {
    if (typeof window === "undefined") return defaultValue

    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors silently
    }
  }

  static remove(key: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  }

  static clear(): void {
    if (typeof window === "undefined") return
    localStorage.clear()
  }
}

// User management functions
export const saveUser = (user: User): void => {
  LocalStorage.set(STORAGE_KEYS.USER, user)
  LocalStorage.set(STORAGE_KEYS.AUTH_TOKEN, "demo-token-123")
}

export const getUser = (): User | null => {
  return LocalStorage.get<User | null>(STORAGE_KEYS.USER, null)
}

export const clearUser = (): void => {
  LocalStorage.remove(STORAGE_KEYS.USER)
  LocalStorage.remove(STORAGE_KEYS.AUTH_TOKEN)
}

export const isAuthenticated = (): boolean => {
  return LocalStorage.get(STORAGE_KEYS.AUTH_TOKEN, null) !== null
}

// Watchlist management
export const getWatchlist = (): number[] => {
  return LocalStorage.get<number[]>(STORAGE_KEYS.WATCHLIST, [])
}

export const addToWatchlist = (movieId: number): void => {
  const watchlist = getWatchlist()
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId)
    LocalStorage.set(STORAGE_KEYS.WATCHLIST, watchlist)
  }
}

export const removeFromWatchlist = (movieId: number): void => {
  const watchlist = getWatchlist()
  const updatedWatchlist = watchlist.filter((id) => id !== movieId)
  LocalStorage.set(STORAGE_KEYS.WATCHLIST, updatedWatchlist)
}

export const isInWatchlist = (movieId: number): boolean => {
  return getWatchlist().includes(movieId)
}

// Viewing history management
interface HistoryItem {
  movieId: number
  watchedAt: string
  progress: number
}

export const getHistory = (): HistoryItem[] => {
  return LocalStorage.get<HistoryItem[]>(STORAGE_KEYS.HISTORY, [])
}

export const addToHistory = (movieId: number, progress = 0): void => {
  const history = getHistory()
  const existingIndex = history.findIndex((item) => item.movieId === movieId)

  const historyItem: HistoryItem = {
    movieId,
    watchedAt: new Date().toISOString(),
    progress,
  }

  if (existingIndex >= 0) {
    history[existingIndex] = historyItem
  } else {
    history.unshift(historyItem)
  }

  // Keep only last 50 items
  const limitedHistory = history.slice(0, 50)
  LocalStorage.set(STORAGE_KEYS.HISTORY, limitedHistory)
}

// Preferences management
interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  autoplay: boolean
}

export const getPreferences = (): UserPreferences => {
  return LocalStorage.get<UserPreferences>(STORAGE_KEYS.PREFERENCES, {
    theme: "system",
    language: "en",
    autoplay: true,
  })
}

export const savePreferences = (preferences: Partial<UserPreferences>): void => {
  const current = getPreferences()
  const updated = { ...current, ...preferences }
  LocalStorage.set(STORAGE_KEYS.PREFERENCES, updated)
}
