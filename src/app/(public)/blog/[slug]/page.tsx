import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { ShareButtons } from "@/components/site/share-buttons"
import { formatReleaseDate, estimateReadTime } from "@/lib/format"
import { getBlogPostBySlug } from "@/lib/blog"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div>
      <div className="relative aspect-[16/7] w-full overflow-hidden bg-muted">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6">
        <div className="space-y-3">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            By {post.author} &middot; {formatReleaseDate(post.publishedAt)} &middot;{" "}
            {estimateReadTime(post.content)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ShareButtons title={post.title} />
        </div>

        <div className="max-w-2xl space-y-4 leading-relaxed text-foreground/90">
          {post.content.split("\n").map((paragraph, index) =>
            paragraph.trim() ? <p key={index}>{paragraph}</p> : null
          )}
        </div>
      </div>
    </div>
  )
}
