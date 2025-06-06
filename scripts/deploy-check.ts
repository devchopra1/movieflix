#!/usr/bin/env tsx

import { PrismaClient } from "@prisma/client"

async function deploymentCheck() {
  console.log("🚀 Running deployment checks...")

  try {
    // Check database connection
    console.log("📊 Testing database connection...")
    const prisma = new PrismaClient()
    await prisma.$connect()
    console.log("✅ Database connection successful")

    // Check if tables exist
    const userCount = await prisma.user.count()
    console.log(`✅ Database tables exist (${userCount} users)`)

    await prisma.$disconnect()

    console.log("🎉 All deployment checks passed!")
  } catch (error) {
    console.error("❌ Deployment check failed:", error)
    process.exit(1)
  }
}

deploymentCheck()
