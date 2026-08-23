import { MovieForm } from "@/components/admin/movie-form"
import { createMovieAction } from "@/app/admin/movies/actions"

export default function NewMoviePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add movie</h1>
      <MovieForm action={createMovieAction} />
    </div>
  )
}
