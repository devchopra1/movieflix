import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
  TMDB_API_KEY: z.string().min(1).optional(),
  YOUTUBE_API_KEY: z.string().min(1).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  VIMEO_ACCESS_TOKEN: z.string().min(1).optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export const env = envSchema.parse(process.env)
