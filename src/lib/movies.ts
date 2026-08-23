import { prisma } from "@/lib/prisma"
import type { Movie, MovieStatus, Screening } from "@/lib/types"
import type {
  Movie as PrismaMovie,
  Screening as PrismaScreening,
} from "@/generated/prisma/client"

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
    where: { status: "NOW_SHOWING" },
    orderBy: { releaseDate: "desc" },
  })
  return movies.map(serializeMovie)
}

export async function getComingSoonMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { status: "COMING_SOON" },
    orderBy: { releaseDate: "asc" },
  })
  return movies.map(serializeMovie)
}

export async function getPublishedMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    where: { status: { not: "ARCHIVED" } },
    orderBy: { releaseDate: "desc" },
  })
  return movies.map(serializeMovie)
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const movie = await prisma.movie.findUnique({ where: { slug } })
  return movie ? serializeMovie(movie) : null
}

export async function searchMovies(params: {
  query?: string
  genre?: string
  status?: MovieStatus
}): Promise<Movie[]> {
  const { query, genre, status } = params

  const movies = await prisma.movie.findMany({
    where: {
      status: status ?? { not: "ARCHIVED" },
      ...(genre ? { genres: { has: genre } } : {}),
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
      status: { not: "ARCHIVED" },
    },
    orderBy: { releaseDate: "desc" },
    take: limit,
  })

  return movies.map(serializeMovie)
}

export async function getMovieScreenings(movieId: string): Promise<Screening[]> {
  const screenings = await prisma.screening.findMany({
    where: { movieId },
    orderBy: { startTime: "asc" },
  })

  return screenings.map(serializeScreening)
}
