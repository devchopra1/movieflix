import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function getImageUrl(path: string | null, size = "original"): string {
  if (!path) return "/placeholder.svg?height=400&width=300"
  return `/placeholder.svg?height=400&width=300`
}
