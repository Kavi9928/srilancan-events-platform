import { BlogForm } from "@/components/admin/blog-form"
import { createBlogPostAction } from "@/app/admin/blog/actions"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add blog post</h1>
      <BlogForm action={createBlogPostAction} />
    </div>
  )
}
