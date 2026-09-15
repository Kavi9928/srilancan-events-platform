import { prisma } from "@/lib/prisma"
import type { Movie, MovieStatus, Screening } from "@/lib/types"
import type {
  Movie as PrismaMovie,
  Screening as PrismaScreening,
} from "@/generated/prisma/client"

/** Archived and Draft movies are never visible on the public site. */
const PUBLIC_STATUS_FILTER: { notIn: MovieStatus[] } = { notIn: ["ARCHIVED", "DRAFT"] }

function serializeMovie(movie: PrismaMovie): Movie {
  return {
    ...movie,
    releaseDate: movie.releaseDate.toISOString(),
    createdAt: movie.createdAt.toISOString(),
    updatedAt: movie.updatedAt.toISOString(),
  }
}

function serializeScreening(screening: PrismaScreening): Screening {
  return {
    ...screening,
    startTime: screening.startTime.toISOString(),
    createdAt: screening.createdAt.toISOString(),
    updatedAt: screening.updatedAt.toISOString(),
  }
}

export async function getNowShowingMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { status: PUBLIC_STATUS_FILTER, releaseDate: { lte: new Date() } },
    orderBy: { releaseDate: "desc" },
  })
  return movies.map(serializeMovie)
}

export async function getFeaturedMovies(limit = 3): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { isFeatured: true, status: PUBLIC_STATUS_FILTER },
    orderBy: { updatedAt: "desc" },
    take: limit,
  })
  return movies.map(serializeMovie)
}

export async function getComingSoonMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { status: PUBLIC_STATUS_FILTER, releaseDate: { gt: new Date() } },
    orderBy: { releaseDate: "asc" },
  })
  return movies.map(serializeMovie)
}

export async function getPublishedMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { status: PUBLIC_STATUS_FILTER },
    orderBy: { releaseDate: "desc" },
  })
  return movies.map(serializeMovie)
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const movie = await prisma.movie.findFirst({ where: { slug, status: { not: "DRAFT" } } })
  return movie ? serializeMovie(movie) : null
}

export async function searchMovies(params: {
  query?: string
  genres?: string[]
  languages?: string[]
  formats?: string[]
  status?: MovieStatus
}): Promise<Movie[]> {
  const { query, genres, languages, formats, status } = params

  const now = new Date()
  const statusFilter =
    status === "NOW_SHOWING"
      ? { status: PUBLIC_STATUS_FILTER, releaseDate: { lte: now } }
      : status === "COMING_SOON"
        ? { status: PUBLIC_STATUS_FILTER, releaseDate: { gt: now } }
        : status === "ARCHIVED"
          ? { status: "ARCHIVED" as const }
          : { status: PUBLIC_STATUS_FILTER }

  const movies = await prisma.movie.findMany({
    where: {
      ...statusFilter,
      ...(genres && genres.length > 0 ? { genres: { hasSome: genres } } : {}),
      ...(languages && languages.length > 0 ? { languages: { hasSome: languages } } : {}),
      ...(formats && formats.length > 0 ? { formats: { hasSome: formats } } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { releaseDate: "desc" },
  })

  return movies.map(serializeMovie)
}

export async function getRelatedMovies(
  currentMovieId: string,
  genres: string[],
  limit = 4
): Promise<Movie[]> {
  if (genres.length === 0) return []

  const movies = await prisma.movie.findMany({
    where: {
      id: { not: currentMovieId },
      genres: { hasSome: genres },
      status: PUBLIC_STATUS_FILTER,
    },
    orderBy: { releaseDate: "desc" },
    take: limit,
  })

  return movies.map(serializeMovie)
}

export async function getDistinctGenres(): Promise<string[]> {
  const movies = await prisma.movie.findMany({
    where: { status: PUBLIC_STATUS_FILTER },
    select: { genres: true },
  })
  const genres = new Set(movies.flatMap((movie) => movie.genres))
  return [...genres].sort()
}

export async function getDistinctFilterOptions(): Promise<{
  genres: string[]
  languages: string[]
  formats: string[]
}> {
  const movies = await prisma.movie.findMany({
    where: { status: PUBLIC_STATUS_FILTER },
    select: { genres: true, languages: true, formats: true },
  })
  return {
    genres: [...new Set(movies.flatMap((movie) => movie.genres))].sort(),
    languages: [...new Set(movies.flatMap((movie) => movie.languages))].sort(),
    formats: [...new Set(movies.flatMap((movie) => movie.formats))].sort(),
  }
}

export async function getMovieScreenings(movieId: string): Promise<Screening[]> {
  const screenings = await prisma.screening.findMany({
    where: { movieId },
    orderBy: { startTime: "asc" },
  })

  return screenings.map(serializeScreening)
}
