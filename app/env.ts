export const env = {
  TMDB_API_KEY: process.env.TMDB_API_KEY || "185833d5dc5d28de765f055a94978c78",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "movieflix-super-secret-key-2024",
  NEXTAUTH_URL:
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID || "140679285352-e6a9dgff1t93kdcbja04dg73njs1g19v.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "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",
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "AIzaSyDSTJFyWN4UIQgzvFk3icW1busWryYaBcQ",
  VIMEO_ACCESS_TOKEN: process.env.VIMEO_ACCESS_TOKEN || "",
  RESEND_API_KEY: process.env.RESEND_API_KEY || "re_SCt4resq_9FNEo44kqvH92CWs5eegBtvB",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-C8PZ8V723E",
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  DIRECT_URL: process.env.DIRECT_URL || process.env.DATABASE_URL || "file:./dev.db",
}
