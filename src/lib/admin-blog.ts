import { prisma } from "@/lib/prisma"
import type { BlogPost } from "@/lib/types"

type BlogPostInput = {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  imageUrl: string
  publishedAt: Date
  isFeatured: boolean
  isPublished: boolean
}

function serializeBlogPost(post: {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  imageUrl: string
  publishedAt: Date
  isFeatured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}): BlogPost {
  return {
    ...post,
    publishedAt: post.publishedAt.toISOString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

export async function listBlogPostsForAdmin(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } })
  return posts.map(serializeBlogPost)
}

export async function getBlogPostForAdmin(id: string): Promise<BlogPost | null> {
  const post = await prisma.blogPost.findUnique({ where: { id } })
  return post ? serializeBlogPost(post) : null
}

export async function createBlogPostRecord(data: BlogPostInput): Promise<BlogPost> {
  const post = await prisma.blogPost.create({ data })
  return serializeBlogPost(post)
}

export async function updateBlogPostRecord(id: string, data: BlogPostInput): Promise<BlogPost> {
  const post = await prisma.blogPost.update({ where: { id }, data })
  return serializeBlogPost(post)
}

export async function deleteBlogPostRecord(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } })
}

export async function getBlogStatsForAdmin(): Promise<{
  published: number
  draft: number
  featured: number
}> {
  const [published, draft, featured] = await Promise.all([
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.blogPost.count({ where: { isPublished: false } }),
    prisma.blogPost.count({ where: { isFeatured: true } }),
  ])
  return { published, draft, featured }
}
