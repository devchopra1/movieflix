#!/usr/bin/env tsx

console.log("🔍 Checking environment variables...")

const requiredEnvVars = ["DATABASE_URL", "NEXTAUTH_SECRET"]

const optionalEnvVars = ["TMDB_API_KEY", "YOUTUBE_API_KEY", "RESEND_API_KEY", "VIMEO_ACCESS_TOKEN"]

let hasErrors = false

console.log("\n✅ Required Variables:")
requiredEnvVars.forEach((envVar) => {
  if (process.env[envVar]) {
    console.log(`  ✓ ${envVar}: Set`)
  } else {
    console.log(`  ✗ ${envVar}: Missing`)
    hasErrors = true
  }
})

console.log("\n⚠️  Optional Variables:")
optionalEnvVars.forEach((envVar) => {
  if (process.env[envVar]) {
    console.log(`  ✓ ${envVar}: Set`)
  } else {
    console.log(`  - ${envVar}: Not set (optional)`)
  }
})

if (hasErrors) {
  console.log("\n❌ Some required environment variables are missing!")
  process.exit(1)
} else {
  console.log("\n🎉 All required environment variables are set!")
}
