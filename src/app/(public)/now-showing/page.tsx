import type { Metadata } from "next"

import { MovieGrid } from "@/components/site/movie-grid"
import { getNowShowingMovies } from "@/lib/movies"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Now Showing",
  description: "Movies currently playing.",
}

export default async function NowShowingPage() {
  const movies = await getNowShowingMovies()

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Now Showing</h1>
      <MovieGrid
        movies={movies}
        emptyMessage="Nothing showing right now — check back soon."
        priorityFirst
      />
    </div>
  )
}
