"use client"

import Script from "next/script"
import { env } from "@/app/env"

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  )
}

// Analytics tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Movie-specific tracking events
export const trackMovieView = (movieId: number, movieTitle: string) => {
  trackEvent("movie_view", {
    movie_id: movieId,
    movie_title: movieTitle,
  })
}

export const trackMoviePlay = (movieId: number, movieTitle: string) => {
  trackEvent("movie_play", {
    movie_id: movieId,
    movie_title: movieTitle,
  })
}

export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent("search", {
    search_term: searchQuery,
    results_count: resultsCount,
  })
}

export const trackWatchlistAdd = (movieId: number, movieTitle: string) => {
  trackEvent("watchlist_add", {
    movie_id: movieId,
    movie_title: movieTitle,
  })
}
