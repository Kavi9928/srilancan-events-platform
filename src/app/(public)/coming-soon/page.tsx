import type { Metadata } from "next"

import { MovieGrid } from "@/components/site/movie-grid"
import { getComingSoonMovies } from "@/lib/movies"

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Movies coming soon.",
}

export default async function ComingSoonPage() {
  const movies = await getComingSoonMovies()

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Coming Soon</h1>
      <MovieGrid
        movies={movies}
        emptyMessage="No upcoming movies announced yet."
      />
    </div>
  )
}
