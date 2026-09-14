import { notFound } from "next/navigation"

import { MovieForm } from "@/components/admin/movie-form"
import { ScreeningManager } from "@/components/admin/screening-manager"
import { getMovieForAdmin } from "@/lib/admin-movies"
import { listLocations } from "@/lib/locations"
import { updateMovieAction } from "@/app/admin/movies/actions"

type EditMoviePageProps = {
  params: Promise<{ id: string }>
}

export default async function EditMoviePage({ params }: EditMoviePageProps) {
  const { id } = await params
  const [movie, locations] = await Promise.all([getMovieForAdmin(id), listLocations()])

  if (!movie) {
    notFound()
  }

  const { screenings, ...movieFields } = movie

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Edit movie</h1>
      <MovieForm
        movie={movieFields}
        locations={locations}
        action={updateMovieAction.bind(null, id)}
      />
      <ScreeningManager movieId={id} screenings={screenings} />
    </div>
  )
}
