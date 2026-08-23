export type MovieStatus = "NOW_SHOWING" | "COMING_SOON" | "ARCHIVED"

export type Movie = {
  id: string
  title: string
  slug: string
  description: string
  genres: string[]
  posterUrl: string
  bannerUrl: string
  trailerUrl: string | null
  durationMinutes: number
  releaseDate: string
  status: MovieStatus
  ticketUrl: string | null
  rating: number | null
  createdAt: string
  updatedAt: string
}

export type Screening = {
  id: string
  movieId: string
  startTime: string
  venue: string | null
  ticketUrl: string | null
  createdAt: string
  updatedAt: string
}
