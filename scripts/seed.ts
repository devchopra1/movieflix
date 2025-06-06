import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  try {
    // Create a demo user
    const hashedPassword = await hash("demo123", 10)

    const demoUser = await prisma.user.upsert({
      where: { email: "demo@movieflix.com" },
      update: {},
      create: {
        email: "demo@movieflix.com",
        name: "Demo User",
        password: hashedPassword,
      },
    })

    console.log("✅ Demo user created:", demoUser.email)

    // Add some sample watchlist items for demo
    const sampleMovies = [550, 680, 13, 27205, 155] // Fight Club, Pulp Fiction, Forrest Gump, Inception, The Dark Knight

    for (const movieId of sampleMovies) {
      await prisma.watchlist.upsert({
        where: {
          userId_movieId: {
            userId: demoUser.id,
            movieId: movieId,
          },
        },
        update: {},
        create: {
          userId: demoUser.id,
          movieId: movieId,
        },
      })
    }

    console.log("✅ Sample watchlist created")
    console.log("✅ Database seeding completed!")
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
