import { MovieGrid } from "@/components/site/movie-grid"
import { getRelatedMovies } from "@/lib/movies"

export async function RelatedMovies({
  movieId,
  genres,
}: {
  movieId: string
  genres: string[]
}) {
  const related = await getRelatedMovies(movieId, genres)

  if (related.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4 py-10 sm:px-6">
      <h2 className="text-xl font-semibold tracking-tight">You might also like</h2>
      <MovieGrid movies={related} />
    </section>
  )
}
