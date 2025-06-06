import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
})

async function testConnection() {
  console.log("🔍 Testing database connection...")
  console.log("📍 Database URL:", process.env.DATABASE_URL?.substring(0, 30) + "...")

  try {
    // Test basic connection
    console.log("1️⃣ Testing basic connection...")
    await prisma.$connect()
    console.log("✅ Database connected successfully!")

    // Test query execution
    console.log("2️⃣ Testing query execution...")
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log("✅ Query executed successfully:", result)

    // Test table creation (if not exists)
    console.log("3️⃣ Testing schema sync...")
    await prisma.$executeRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LIMIT 1`
    console.log("✅ Schema accessible!")

    // Test user table (should exist after db push)
    console.log("4️⃣ Testing User table...")
    const userCount = await prisma.user.count()
    console.log(`✅ User table exists with ${userCount} users`)

    console.log("\n🎉 All database tests passed!")
    console.log("🚀 Your database is ready for MovieFlix!")
  } catch (error) {
    console.error("\n❌ Database connection failed!")
    console.error("Error details:", error)

    if (error instanceof Error) {
      if (error.message.includes("ENOTFOUND")) {
        console.error("\n💡 Suggestion: Check your DATABASE_URL host address")
      } else if (error.message.includes("authentication")) {
        console.error("\n💡 Suggestion: Check your username/password in DATABASE_URL")
      } else if (error.message.includes("database") && error.message.includes("does not exist")) {
        console.error("\n💡 Suggestion: Check your database name in DATABASE_URL")
      } else if (error.message.includes("SSL")) {
        console.error("\n💡 Suggestion: Add ?sslmode=require to your DATABASE_URL")
      }
    }

    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
