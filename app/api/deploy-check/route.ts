import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { env } from "@/app/env"

export async function GET() {
  const checks = {
    database: false,
    tmdb: false,
    auth: false,
    email: false,
    analytics: false,
  }

  const results = []

  try {
    // Database check
    await prisma.$queryRaw`SELECT 1`
    checks.database = true
    results.push("✅ Database connection successful")
  } catch (error) {
    results.push("❌ Database connection failed")
  }

  try {
    // TMDB API check
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${env.TMDB_API_KEY}`)
    if (tmdbResponse.ok) {
      checks.tmdb = true
      results.push("✅ TMDB API working")
    } else {
      results.push("❌ TMDB API failed")
    }
  } catch (error) {
    results.push("❌ TMDB API error")
  }

  // Auth check
  if (env.NEXTAUTH_SECRET && env.NEXTAUTH_URL) {
    checks.auth = true
    results.push("✅ Authentication configured")
  } else {
    results.push("❌ Authentication not configured")
  }

  // Email check
  if (env.RESEND_API_KEY) {
    checks.email = true
    results.push("✅ Email service configured")
  } else {
    results.push("❌ Email service not configured")
  }

  // Analytics check
  if (env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    checks.analytics = true
    results.push("✅ Analytics configured")
  } else {
    results.push("❌ Analytics not configured")
  }

  const allPassing = Object.values(checks).every(Boolean)

  return NextResponse.json({
    ready: allPassing,
    checks,
    results,
    message: allPassing ? "🎉 Your MovieFlix platform is ready for production!" : "⚠️ Some services need configuration",
  })
}
