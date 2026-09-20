import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { formatReleaseDate, estimateReadTime } from "@/lib/format"
import { getPublishedBlogPosts } from "@/lib/blog"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Event guides, artist features and stories from SriLanCan Events — Sri Lankan music and cinema in Canada.",
  alternates: { canonical: "/blog" },
}

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts()

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>

      {posts.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No blog posts yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="overflow-hidden rounded-lg border bg-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2 p-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  <h2 className="line-clamp-2 font-semibold">{post.title}</h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatReleaseDate(post.publishedAt)} &middot; {estimateReadTime(post.content)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
