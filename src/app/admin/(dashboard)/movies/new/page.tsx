import { MovieForm } from "@/components/admin/movie-form"
import { createMovieAction } from "@/app/admin/movies/actions"
import { listLocations } from "@/lib/locations"

export default async function NewMoviePage() {
  const locations = await listLocations()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add movie</h1>
      <MovieForm action={createMovieAction} locations={locations} />
    </div>
  )
}
