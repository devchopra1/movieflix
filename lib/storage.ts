// Local storage utilities for demo purposes
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
}

// Storage keys
export const STORAGE_KEYS = {
  WATCHLIST: "movieflix_watchlist",
  VIEWING_HISTORY: "movieflix_history",
  USER_PREFERENCES: "movieflix_preferences",
} as const
