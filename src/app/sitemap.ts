import type { MetadataRoute } from "next"

import { getPublishedMovies } from "@/lib/movies"
import { getPublishedBlogPosts } from "@/lib/blog"
import { absoluteUrl } from "@/lib/site-url"

// Movies and posts are edited through the admin panel, so the sitemap is built
// per request rather than frozen at build time.
export const dynamic = "force-dynamic"

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/movies", priority: 0.9, changeFrequency: "daily" },
  { path: "/now-showing", priority: 0.9, changeFrequency: "daily" },
  { path: "/coming-soon", priority: 0.8, changeFrequency: "daily" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // A database hiccup should degrade the sitemap to its static routes, not
  // return a 500 to the crawler.
  const [movies, posts] = await Promise.all([
    getPublishedMovies().catch(() => []),
    getPublishedBlogPosts().catch(() => []),
  ])

  const now = new Date()

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...movies.map((movie) => ({
      url: absoluteUrl(`/movies/${movie.slug}`),
      lastModified: new Date(movie.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
