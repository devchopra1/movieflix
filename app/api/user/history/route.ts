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
    const history = await prisma.viewingHistory.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        watchedAt: "desc",
      },
    })

    return NextResponse.json(history)
  } catch (error) {
    console.error("Error fetching viewing history:", error)
    return NextResponse.json({ error: "Failed to fetch viewing history" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { movieId, progress, completed } = await request.json()

    if (!movieId) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
    }

    const existingEntry = await prisma.viewingHistory.findFirst({
      where: {
        userId: session.user.id,
        movieId: Number(movieId),
      },
    })

    if (existingEntry) {
      const updatedEntry = await prisma.viewingHistory.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          progress: progress || existingEntry.progress,
          completed: completed ?? existingEntry.completed,
          watchedAt: new Date(),
        },
      })
      return NextResponse.json(updatedEntry)
    }

    const historyEntry = await prisma.viewingHistory.create({
      data: {
        userId: session.user.id,
        movieId: Number(movieId),
        progress: progress || 0,
        completed: completed || false,
      },
    })

    return NextResponse.json(historyEntry, { status: 201 })
  } catch (error) {
    console.error("Error updating viewing history:", error)
    return NextResponse.json({ error: "Failed to update viewing history" }, { status: 500 })
  }
}
