import { mockUser, type User } from "./mock-data"

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export class MockAuth {
  private static instance: MockAuth
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }
  private listeners: ((state: AuthState) => void)[] = []

  static getInstance(): MockAuth {
    if (!MockAuth.instance) {
      MockAuth.instance = new MockAuth()
    }
    return MockAuth.instance
  }

  getState(): AuthState {
    return { ...this.authState }
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.getState()))
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true
    this.notify()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "demo@movieflix.com" && password === "demo123") {
      this.authState = {
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      }
      this.notify()
      return { success: true }
    }

    this.authState.isLoading = false
    this.notify()
    return { success: false, error: "Invalid credentials" }
  }

  async signUp(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true
    this.notify()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      image: "/placeholder.svg?height=40&width=40",
    }

    this.authState = {
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    }
    this.notify()
    return { success: true }
  }

  async signOut(): Promise<void> {
    this.authState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }
    this.notify()
  }

  // Auto-login for demo
  autoLogin(): void {
    this.authState = {
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    }
    this.notify()
  }
}
