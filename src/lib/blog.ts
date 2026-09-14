import { prisma } from "@/lib/prisma"
import type { BlogPost } from "@/lib/types"
import type { BlogPost as PrismaBlogPost } from "@/generated/prisma/client"

function serializeBlogPost(post: PrismaBlogPost): BlogPost {
  return {
    ...post,
    publishedAt: post.publishedAt.toISOString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

export async function getPublishedBlogPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    take: limit,
  })
  return posts.map(serializeBlogPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findFirst({ where: { slug, isPublished: true } })
  return post ? serializeBlogPost(post) : null
}
