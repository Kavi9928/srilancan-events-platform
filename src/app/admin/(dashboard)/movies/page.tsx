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
import { deleteMovieAction, setMovieStatusAction } from "@/app/admin/movies/actions"
import type { MovieStatus } from "@/lib/types"

const statusLabel: Record<MovieStatus, string> = {
  NOW_SHOWING: "Now Showing",
  COMING_SOON: "Coming Soon",
  ARCHIVED: "Archived",
}

export const dynamic = "force-dynamic"

export default async function AdminMoviesPage() {
  let movies = []
  try {
    movies = await listMoviesForAdmin()
  } catch {
    // Database unavailable - show empty state
  }

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
            <TableHead>Release Date</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{statusLabel[movie.status]}</Badge>
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
                    {(Object.keys(statusLabel) as MovieStatus[])
                      .filter((status) => status !== movie.status)
                      .map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={setMovieStatusAction.bind(null, movie.id, status)}
                        >
                          Mark as {statusLabel[status]}
                        </DropdownMenuItem>
                      ))}
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
