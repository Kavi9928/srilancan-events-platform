import { notFound } from "next/navigation"

import { BlogForm } from "@/components/admin/blog-form"
import { getBlogPostForAdmin } from "@/lib/admin-blog"
import { updateBlogPostAction } from "@/app/admin/blog/actions"

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params
  const post = await getBlogPostForAdmin(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit blog post</h1>
      <BlogForm post={post} action={updateBlogPostAction.bind(null, id)} />
    </div>
  )
}
