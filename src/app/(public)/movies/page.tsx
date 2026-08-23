import type { Metadata } from "next"

import { MovieGrid } from "@/components/site/movie-grid"
import { SearchBar } from "@/components/site/search-bar"
import { GenreFilter } from "@/components/site/genre-filter"
import { StatusFilter } from "@/components/site/status-filter"
import { getPublishedMovies, searchMovies } from "@/lib/movies"
import type { MovieStatus } from "@/lib/types"

export const metadata: Metadata = {
  title: "All Movies",
  description: "Browse all movies and events.",
}

type MoviesPageProps = {
  searchParams: Promise<{ q?: string; genre?: string; status?: string }>
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { q, genre, status } = await searchParams

  const [allMovies, movies] = await Promise.all([
    getPublishedMovies(),
    searchMovies({ query: q, genre, status: status as MovieStatus | undefined }),
  ])

  const genres = Array.from(new Set(allMovies.flatMap((movie) => movie.genres))).sort()

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">All Movies</h1>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex gap-3">
          <GenreFilter genres={genres} />
          <StatusFilter />
        </div>
      </div>
      <MovieGrid movies={movies} priorityFirst emptyMessage="No movies match your search." />
    </div>
  )
}
