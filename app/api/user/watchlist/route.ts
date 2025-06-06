import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const watchlist = await prisma.watchlist.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        addedAt: "desc",
      },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error("Error fetching watchlist:", error)
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { movieId } = await request.json()

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const existingEntry = await prisma.watchlist.findFirst({
      where: {
        userId: session.user.id,
        movieId: Number(movieId),
      },
    })

    if (existingEntry) {
      return NextResponse.json({ error: "Movie already in watchlist" }, { status: 400 })
    }

    const watchlistEntry = await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        movieId: Number(movieId),
      },
    })

    return NextResponse.json(watchlistEntry, { status: 201 })
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    return NextResponse.json({ error: "Failed to add to watchlist" }, { status: 500 })
  }
}
