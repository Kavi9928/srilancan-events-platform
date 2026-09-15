import Link from "next/link"
import { MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatReleaseDate } from "@/lib/format"
import { listMoviesForAdmin } from "@/lib/admin-movies"
import { listLocations } from "@/lib/locations"
import {
  deleteMovieAction,
  archiveMovieAction,
  draftMovieAction,
  restoreMovieAction,
} from "@/app/admin/movies/actions"
import { computeEffectiveStatus, statusLabel } from "@/lib/movie-status"

export const dynamic = "force-dynamic"

export default async function AdminMoviesPage() {
  const [movies, locations] = await Promise.all([listMoviesForAdmin(), listLocations()])
  const locationById = new Map(locations.map((location) => [location.id, location]))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Movies</h1>
        <Button nativeButton={false} render={<Link href="/admin/movies/new" />}>
          Add movie
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {movie.title}
                  {movie.isFeatured ? <Badge>Featured</Badge> : null}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {statusLabel[computeEffectiveStatus(movie.status, movie.releaseDate)]}
                </Badge>
              </TableCell>
              <TableCell>
                {movie.locationId
                  ? (locationById.get(movie.locationId)?.icon ?? "") +
                    " " +
                    (locationById.get(movie.locationId)?.name ?? "Unknown")
                  : "—"}
              </TableCell>
              <TableCell>{formatReleaseDate(movie.releaseDate)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <MoreHorizontalIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      render={<Link href={`/admin/movies/${movie.id}/edit`} />}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {movie.status === "DRAFT" ? (
                      <DropdownMenuItem onClick={restoreMovieAction.bind(null, movie.id)}>
                        Publish
                      </DropdownMenuItem>
                    ) : movie.status === "ARCHIVED" ? (
                      <DropdownMenuItem onClick={restoreMovieAction.bind(null, movie.id)}>
                        Restore (un-archive)
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={draftMovieAction.bind(null, movie.id)}>
                          Save as Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={archiveMovieAction.bind(null, movie.id)}>
                          Archive
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={deleteMovieAction.bind(null, movie.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
