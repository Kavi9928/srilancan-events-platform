import { PrismaClient } from "../src/generated/prisma/client"
import { placeholderMovies } from "../src/lib/placeholder-movies"

const prisma = new PrismaClient()

async function main() {
  for (const movie of placeholderMovies) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = movie
    const data = {
      ...rest,
      releaseDate: new Date(movie.releaseDate),
      createdAt: new Date(movie.createdAt),
      updatedAt: new Date(movie.updatedAt),
    }
    await prisma.movie.upsert({
      where: { slug: movie.slug },
      create: data,
      update: data,
    })
  }
  console.log(`Seeded ${placeholderMovies.length} movies.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
