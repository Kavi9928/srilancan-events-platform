import { z } from "zod"

export const blogPostFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  publishedAt: z.coerce.date(),
  isFeatured: z.literal("on").optional(),
  isPublished: z.literal("on").optional(),
})

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>
