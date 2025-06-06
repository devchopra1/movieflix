import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Initializing database...")

  try {
    // Test database connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")

    // Run any initial data seeding here if needed
    console.log("✅ Database initialization complete")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
