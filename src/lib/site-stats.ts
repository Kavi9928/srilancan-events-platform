import { prisma } from "@/lib/prisma"

export type SiteStats = {
  movieCount: number
  locationCount: number
  blogPostCount: number
}

export async function getSiteStats(): Promise<SiteStats> {
  const [movieCount, locationCount, blogPostCount] = await Promise.all([
    prisma.movie.count({ where: { status: { notIn: ["ARCHIVED", "DRAFT"] } } }),
    prisma.location.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
  ])

  return { movieCount, locationCount, blogPostCount }
}
