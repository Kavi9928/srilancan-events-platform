import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RatingBadge } from "@/components/site/rating-badge"
import { formatDuration, formatReleaseDate } from "@/lib/format"
import type { Movie } from "@/lib/types"

export function MovieCard({
  movie,
  priority = false,
}: {
  movie: Movie
  priority?: boolean
}) {
  return (
    <Link href={`/movies/${movie.slug}`} className="group block">
      <Card className="overflow-hidden py-0 gap-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <RatingBadge rating={movie.rating} className="absolute top-2 right-2" />
        </div>
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {movie.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDuration(movie.durationMinutes)} &middot;{" "}
            {formatReleaseDate(movie.releaseDate)}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
