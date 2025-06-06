"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

type User = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User)
    } else {
      setUser(null)
    }
  }, [session])

  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"

  return <AuthContext.Provider value={{ user, isLoading, isAuthenticated }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
