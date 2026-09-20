import type { Metadata } from "next"

import { MovieGrid } from "@/components/site/movie-grid"
import { SearchBar } from "@/components/site/search-bar"
import { StatusFilter } from "@/components/site/status-filter"
import { MovieFiltersSidebar } from "@/components/site/movie-filters-sidebar"
import { getDistinctFilterOptions, searchMovies } from "@/lib/movies"
import type { MovieStatus } from "@/lib/types"

export const metadata: Metadata = {
  title: "All Movies & Events",
  description:
    "Every Sri Lankan film screening, concert and cultural event SriLanCan Events is running in Toronto and across Canada. Filter by city, genre, language or format.",
  // Filters are query params on this same page; without a canonical every
  // combination is a crawlable duplicate.
  alternates: { canonical: "/movies" },
}

type MoviesPageProps = {
  searchParams: Promise<{
    q?: string
    genre?: string | string[]
    language?: string | string[]
    format?: string | string[]
    status?: string
  }>
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { q, genre, language, format, status } = await searchParams

  const [filterOptions, movies] = await Promise.all([
    getDistinctFilterOptions(),
    searchMovies({
      query: q,
      genres: toArray(genre),
      languages: toArray(language),
      formats: toArray(format),
      status: status as MovieStatus | undefined,
    }),
  ])

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">All Movies</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <MovieFiltersSidebar
          genres={filterOptions.genres}
          languages={filterOptions.languages}
          formats={filterOptions.formats}
        />

        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchBar />
            </div>
            <StatusFilter />
          </div>
          <MovieGrid movies={movies} priorityFirst emptyMessage="No movies match your search." />
        </div>
      </div>
    </div>
  )
}
