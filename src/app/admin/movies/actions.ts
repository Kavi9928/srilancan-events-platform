"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { uploadImage } from "@/lib/cloudinary"
import {
  createMovieRecord,
  deleteMovieRecord,
  updateMovieRecord,
  archiveMovieRecord,
  restoreMovieRecord,
  addScreeningRecord,
  removeScreeningRecord,
} from "@/lib/admin-movies"
import { movieFormSchema, screeningFormSchema } from "@/lib/validation/movie"
import { deriveShowingStatus } from "@/lib/movie-status"
import { Prisma } from "@/generated/prisma/client"

export type MovieActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

function revalidateSite() {
  revalidatePath("/", "layout")
  revalidatePath("/admin/movies")
}

function emptyToNull(value: string | undefined): string | null {
  return value ? value : null
}

function isSlugConflict(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
}

async function uploadIfProvided(
  formData: FormData,
  fieldName: string,
  folder: "posters" | "banners"
): Promise<string | null> {
  const file = formData.get(fieldName)
  if (file instanceof File && file.size > 0) {
    const { secureUrl } = await uploadImage(file, folder)
    return secureUrl
  }
  return null
}

export async function createMovieAction(
  _prevState: MovieActionState,
  formData: FormData
): Promise<MovieActionState> {
  await requireAdminSession()

  const parsed = movieFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const [posterUrl, bannerUrl] = await Promise.all([
    uploadIfProvided(formData, "poster", "posters"),
    uploadIfProvided(formData, "banner", "banners"),
  ])

  if (!posterUrl || !bannerUrl) {
    return { error: "A poster and banner image are both required." }
  }

  const { ticketUrl, trailerUrl, rating, locationId, isFeatured, archived, ...rest } = parsed.data

  try {
    await createMovieRecord({
      ...rest,
      ticketUrl: emptyToNull(ticketUrl),
      trailerUrl: emptyToNull(trailerUrl),
      rating: rating === "" || rating === undefined ? null : rating,
      locationId: emptyToNull(locationId),
      isFeatured: isFeatured === "on",
      status: archived === "on" ? "ARCHIVED" : deriveShowingStatus(rest.releaseDate),
      posterUrl,
      bannerUrl,
    })
  } catch (error) {
    if (isSlugConflict(error)) {
      return { fieldErrors: { slug: ["This slug is already in use. Choose a different one."] } }
    }
    throw error
  }

  revalidateSite()
  redirect("/admin/movies")
}

export async function updateMovieAction(
  id: string,
  _prevState: MovieActionState,
  formData: FormData
): Promise<MovieActionState> {
  await requireAdminSession()

  const parsed = movieFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const [uploadedPosterUrl, uploadedBannerUrl] = await Promise.all([
    uploadIfProvided(formData, "poster", "posters"),
    uploadIfProvided(formData, "banner", "banners"),
  ])

  const currentPosterUrl = String(formData.get("currentPosterUrl") ?? "")
  const currentBannerUrl = String(formData.get("currentBannerUrl") ?? "")

  const { ticketUrl, trailerUrl, rating, locationId, isFeatured, archived, ...rest } = parsed.data

  try {
    await updateMovieRecord(id, {
      ...rest,
      ticketUrl: emptyToNull(ticketUrl),
      trailerUrl: emptyToNull(trailerUrl),
      rating: rating === "" || rating === undefined ? null : rating,
      locationId: emptyToNull(locationId),
      isFeatured: isFeatured === "on",
      status: archived === "on" ? "ARCHIVED" : deriveShowingStatus(rest.releaseDate),
      posterUrl: uploadedPosterUrl ?? currentPosterUrl,
      bannerUrl: uploadedBannerUrl ?? currentBannerUrl,
    })
  } catch (error) {
    if (isSlugConflict(error)) {
      return { fieldErrors: { slug: ["This slug is already in use. Choose a different one."] } }
    }
    throw error
  }

  revalidateSite()
  redirect("/admin/movies")
}

export async function deleteMovieAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteMovieRecord(id)
  revalidateSite()
}

export async function archiveMovieAction(id: string): Promise<void> {
  await requireAdminSession()
  await archiveMovieRecord(id)
  revalidateSite()
}

export async function restoreMovieAction(id: string): Promise<void> {
  await requireAdminSession()
  await restoreMovieRecord(id)
  revalidateSite()
}

export async function addScreeningAction(
  movieId: string,
  _prevState: MovieActionState,
  formData: FormData
): Promise<MovieActionState> {
  await requireAdminSession()

  const parsed = screeningFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { startTime, venue, ticketUrl } = parsed.data
  await addScreeningRecord(movieId, {
    startTime,
    venue: emptyToNull(venue),
    ticketUrl: emptyToNull(ticketUrl),
  })

  revalidateSite()
  return {}
}

export async function removeScreeningAction(screeningId: string): Promise<void> {
  await requireAdminSession()
  await removeScreeningRecord(screeningId)
  revalidateSite()
}
