import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { BookTicketsButton } from "@/components/site/book-tickets-button"
import { RatingBadge } from "@/components/site/rating-badge"
import { ScreeningsList } from "@/components/site/screenings-list"
import { RelatedMovies } from "@/components/site/related-movies"
import { ShareButtons } from "@/components/site/share-buttons"
import { formatDuration, formatReleaseDate } from "@/lib/format"
import { getMovieBySlug } from "@/lib/movies"
import { getYoutubeEmbedUrl } from "@/lib/youtube"

type MoviePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    return { title: "Movie Not Found" }
  }

  return {
    title: movie.title,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: [{ url: movie.bannerUrl }],
    },
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    notFound()
  }

  const trailerEmbedUrl = movie.trailerUrl
    ? getYoutubeEmbedUrl(movie.trailerUrl)
    : null

  return (
    <div>
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-muted">
        <Image
          src={movie.bannerUrl}
          alt={`${movie.title} banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[280px_1fr]">
        <div className="relative mx-auto aspect-[2/3] w-48 overflow-hidden rounded-lg bg-muted shadow-md md:mx-0 md:w-full">
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            sizes="(min-width: 768px) 280px, 12rem"
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">
                {movie.title}
              </h1>
              <RatingBadge rating={movie.rating} />
            </div>
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
          </div>

          <p className="max-w-2xl leading-relaxed text-foreground/90">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <BookTicketsButton ticketUrl={movie.ticketUrl} className="w-full sm:w-auto" />
            <ShareButtons title={movie.title} />
          </div>

          <ScreeningsList movieId={movie.id} fallbackTicketUrl={movie.ticketUrl} />

          {trailerEmbedUrl && (
            <div className="max-w-2xl space-y-2">
              <h2 className="text-lg font-semibold">Trailer</h2>
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                <iframe
                  src={trailerEmbedUrl}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <RelatedMovies movieId={movie.id} genres={movie.genres} />
    </div>
  )
}
