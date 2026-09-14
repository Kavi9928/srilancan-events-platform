"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { uploadImage } from "@/lib/cloudinary"
import {
  createBlogPostRecord,
  updateBlogPostRecord,
  deleteBlogPostRecord,
} from "@/lib/admin-blog"
import { blogPostFormSchema } from "@/lib/validation/blog"
import { Prisma } from "@/generated/prisma/client"

export type BlogPostActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

function revalidateSite() {
  revalidatePath("/", "layout")
  revalidatePath("/blog")
  revalidatePath("/admin/blog")
}

function isSlugConflict(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
}

async function uploadIfProvided(formData: FormData, fieldName: string): Promise<string | null> {
  const file = formData.get(fieldName)
  if (file instanceof File && file.size > 0) {
    const { secureUrl } = await uploadImage(file, "blog")
    return secureUrl
  }
  return null
}

export async function createBlogPostAction(
  _prevState: BlogPostActionState,
  formData: FormData
): Promise<BlogPostActionState> {
  await requireAdminSession()

  const parsed = blogPostFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const imageUrl = await uploadIfProvided(formData, "image")
  if (!imageUrl) {
    return { error: "A cover image is required." }
  }

  const { isFeatured, isPublished, ...rest } = parsed.data

  try {
    await createBlogPostRecord({
      ...rest,
      imageUrl,
      isFeatured: isFeatured === "on",
      isPublished: isPublished === "on",
    })
  } catch (error) {
    if (isSlugConflict(error)) {
      return { fieldErrors: { slug: ["This slug is already in use. Choose a different one."] } }
    }
    throw error
  }

  revalidateSite()
  redirect("/admin/blog")
}

export async function updateBlogPostAction(
  id: string,
  _prevState: BlogPostActionState,
  formData: FormData
): Promise<BlogPostActionState> {
  await requireAdminSession()

  const parsed = blogPostFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const uploadedImageUrl = await uploadIfProvided(formData, "image")
  const currentImageUrl = String(formData.get("currentImageUrl") ?? "")

  const { isFeatured, isPublished, ...rest } = parsed.data

  try {
    await updateBlogPostRecord(id, {
      ...rest,
      imageUrl: uploadedImageUrl ?? currentImageUrl,
      isFeatured: isFeatured === "on",
      isPublished: isPublished === "on",
    })
  } catch (error) {
    if (isSlugConflict(error)) {
      return { fieldErrors: { slug: ["This slug is already in use. Choose a different one."] } }
    }
    throw error
  }

  revalidateSite()
  redirect("/admin/blog")
}

export async function deleteBlogPostAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteBlogPostRecord(id)
  revalidateSite()
}
