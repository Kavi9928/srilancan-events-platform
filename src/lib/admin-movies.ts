import { prisma } from "@/lib/prisma"
import type { Movie, MovieStatus, Screening } from "@/lib/types"

type MovieInput = {
  title: string
  slug: string
  description: string
  genres: string[]
  durationMinutes: number
  releaseDate: Date
  status: MovieStatus
  ticketUrl: string | null
  trailerUrl: string | null
  rating: number | null
  posterUrl: string
  bannerUrl: string
}

type ScreeningInput = {
  startTime: Date
  venue: string | null
  ticketUrl: string | null
}

function serializeMovie(movie: {
  id: string
  title: string
  slug: string
  description: string
  genres: string[]
  posterUrl: string
  bannerUrl: string
  trailerUrl: string | null
  durationMinutes: number
  releaseDate: Date
  status: MovieStatus
  ticketUrl: string | null
  rating: number | null
  createdAt: Date
  updatedAt: Date
}): Movie {
  return {
    ...movie,
    releaseDate: movie.releaseDate.toISOString(),
    createdAt: movie.createdAt.toISOString(),
    updatedAt: movie.updatedAt.toISOString(),
  }
}

function serializeScreening(screening: {
  id: string
  movieId: string
  startTime: Date
  venue: string | null
  ticketUrl: string | null
  createdAt: Date
  updatedAt: Date
}): Screening {
  return {
    ...screening,
    startTime: screening.startTime.toISOString(),
    createdAt: screening.createdAt.toISOString(),
    updatedAt: screening.updatedAt.toISOString(),
  }
}

export async function listMoviesForAdmin(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({ orderBy: { createdAt: "desc" } })
  return movies.map(serializeMovie)
}

export async function getMovieForAdmin(
  id: string
): Promise<(Movie & { screenings: Screening[] }) | null> {
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: { screenings: { orderBy: { startTime: "asc" } } },
  })
  if (!movie) return null

  const { screenings, ...rest } = movie
  return {
    ...serializeMovie(rest),
    screenings: screenings.map(serializeScreening),
  }
}

export async function createMovieRecord(data: MovieInput): Promise<Movie> {
  const movie = await prisma.movie.create({ data })
  return serializeMovie(movie)
}

export async function updateMovieRecord(id: string, data: MovieInput): Promise<Movie> {
  const movie = await prisma.movie.update({ where: { id }, data })
  return serializeMovie(movie)
}

export async function deleteMovieRecord(id: string): Promise<void> {
  await prisma.screening.deleteMany({ where: { movieId: id } })
  await prisma.movie.delete({ where: { id } })
}

export async function setMovieStatus(id: string, status: MovieStatus): Promise<Movie> {
  const movie = await prisma.movie.update({ where: { id }, data: { status } })
  return serializeMovie(movie)
}

export async function addScreeningRecord(
  movieId: string,
  data: ScreeningInput
): Promise<Screening> {
  const screening = await prisma.screening.create({ data: { ...data, movieId } })
  return serializeScreening(screening)
}

export async function removeScreeningRecord(screeningId: string): Promise<void> {
  await prisma.screening.delete({ where: { id: screeningId } })
}
