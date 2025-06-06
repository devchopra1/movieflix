import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { SessionProvider } from "@/components/session-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { GoogleAnalytics } from "@/components/google-analytics"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Watch Movies Online",
  description: "Watch your favorite movies online for free",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              <AuthProvider>
                {children}
                <Toaster />
              </AuthProvider>
            </ThemeProvider>
          </SessionProvider>
        </Suspense>
      </body>
    </html>
  )
}
