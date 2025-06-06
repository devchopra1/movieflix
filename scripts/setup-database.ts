import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
})

async function setupDatabase() {
  console.log("🚀 Setting up MovieFlix database...")
  console.log("📍 Connecting to:", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0])

  try {
    // Step 1: Test connection
    console.log("\n1️⃣ Testing database connection...")
    await prisma.$connect()
    console.log("✅ Connected to Neon PostgreSQL successfully!")

    // Step 2: Check if tables exist
    console.log("\n2️⃣ Checking database schema...")
    const tables = (await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `) as any[]

    console.log(`📊 Found ${tables.length} tables:`, tables.map((t) => t.table_name).join(", "))

    // Step 3: Create demo user
    console.log("\n3️⃣ Creating demo user...")
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

    // Step 4: Add sample watchlist
    console.log("\n4️⃣ Adding sample watchlist...")
    const sampleMovies = [
      550, // Fight Club
      680, // Pulp Fiction
      13, // Forrest Gump
      27205, // Inception
      155, // The Dark Knight
      278, // The Shawshank Redemption
      238, // The Godfather
      424, // Schindler's List
    ]

    let addedCount = 0
    for (const movieId of sampleMovies) {
      try {
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
        addedCount++
      } catch (error) {
        // Skip if already exists
      }
    }

    console.log(`✅ Added ${addedCount} movies to watchlist`)

    // Step 5: Add sample viewing history
    console.log("\n5️⃣ Adding sample viewing history...")
    const historyMovies = [
      { movieId: 550, progress: 3600, completed: true }, // Fight Club - completed
      { movieId: 680, progress: 1800, completed: false }, // Pulp Fiction - 30 min watched
      { movieId: 13, progress: 5400, completed: true }, // Forrest Gump - completed
    ]

    for (const history of historyMovies) {
      try {
        await prisma.viewingHistory.upsert({
          where: {
            userId_movieId: {
              userId: demoUser.id,
              movieId: history.movieId,
            },
          },
          update: {
            progress: history.progress,
            completed: history.completed,
            watchedAt: new Date(),
          },
          create: {
            userId: demoUser.id,
            movieId: history.movieId,
            progress: history.progress,
            completed: history.completed,
          },
        })
      } catch (error) {
        // Skip if error
      }
    }

    console.log("✅ Sample viewing history added")

    // Step 6: Database statistics
    console.log("\n6️⃣ Database statistics:")
    const userCount = await prisma.user.count()
    const watchlistCount = await prisma.watchlist.count()
    const historyCount = await prisma.viewingHistory.count()

    console.log(`👥 Users: ${userCount}`)
    console.log(`❤️ Watchlist items: ${watchlistCount}`)
    console.log(`📺 Viewing history: ${historyCount}`)

    console.log("\n🎉 Database setup completed successfully!")
    console.log("\n🔑 Demo Login Credentials:")
    console.log("   Email: demo@movieflix.com")
    console.log("   Password: demo123")
    console.log("\n🚀 Your MovieFlix platform is ready!")
  } catch (error) {
    console.error("\n❌ Database setup failed!")
    console.error("Error:", error)

    if (error instanceof Error) {
      if (error.message.includes("ENOTFOUND")) {
        console.error("\n💡 Check your internet connection and DATABASE_URL")
      } else if (error.message.includes("authentication")) {
        console.error("\n💡 Check your database credentials in DATABASE_URL")
      } else if (error.message.includes("SSL")) {
        console.error("\n💡 Make sure your DATABASE_URL includes ?sslmode=require")
      }
    }

    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()
