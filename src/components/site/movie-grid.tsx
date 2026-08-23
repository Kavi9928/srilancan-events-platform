import { MovieCard } from "@/components/site/movie-card"
import type { Movie } from "@/lib/types"

export function MovieGrid({
  movies,
  emptyMessage = "No movies to show right now.",
  priorityFirst = false,
}: {
  movies: Movie[]
  emptyMessage?: string
  /** Mark the first poster as high-priority; only for a grid above the fold. */
  priorityFirst?: boolean
}) {
  if (movies.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          priority={priorityFirst && index === 0}
        />
      ))}
    </div>
  )
}
