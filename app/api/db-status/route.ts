import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Test database connection
    const startTime = Date.now()
    await prisma.$connect()
    const connectionTime = Date.now() - startTime

    // Get database info
    const userCount = await prisma.user.count()
    const watchlistCount = await prisma.watchlist.count()
    const historyCount = await prisma.viewingHistory.count()

    // Test query performance
    const queryStartTime = Date.now()
    await prisma.$queryRaw`SELECT version()`
    const queryTime = Date.now() - queryStartTime

    return NextResponse.json({
      status: "connected",
      connectionTime: `${connectionTime}ms`,
      queryTime: `${queryTime}ms`,
      statistics: {
        users: userCount,
        watchlistItems: watchlistCount,
        viewingHistory: historyCount,
      },
      timestamp: new Date().toISOString(),
      database: "PostgreSQL (Neon)",
    })
  } catch (error) {
    console.error("Database status check failed:", error)

    return NextResponse.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : "Unknown database error",
        timestamp: new Date().toISOString(),
        suggestions: [
          "Check your DATABASE_URL environment variable",
          "Ensure your Neon database is running",
          "Verify your connection string includes ?sslmode=require",
          "Run 'npx prisma db push' to sync your schema",
        ],
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
