"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { MockAuth, type AuthState } from "@/lib/auth-mock"

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    const auth = MockAuth.getInstance()

    // Subscribe to auth state changes
    const unsubscribe = auth.subscribe(setAuthState)

    // Auto-login for demo
    setTimeout(() => {
      auth.autoLogin()
    }, 1000)

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    const auth = MockAuth.getInstance()
    return auth.signIn(email, password)
  }

  const signUp = async (name: string, email: string, password: string) => {
    const auth = MockAuth.getInstance()
    return auth.signUp(name, email, password)
  }

  const signOut = async () => {
    const auth = MockAuth.getInstance()
    return auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
