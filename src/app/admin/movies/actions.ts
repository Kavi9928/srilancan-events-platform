"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { uploadMovieImage } from "@/lib/cloudinary"
import {
  createMovieRecord,
  deleteMovieRecord,
  updateMovieRecord,
  setMovieStatus,
  addScreeningRecord,
  removeScreeningRecord,
} from "@/lib/admin-movies"
import { movieFormSchema, screeningFormSchema } from "@/lib/validation/movie"
import type { MovieStatus } from "@/lib/types"

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

async function uploadIfProvided(
  formData: FormData,
  fieldName: string,
  folder: "posters" | "banners"
): Promise<string | null> {
  const file = formData.get(fieldName)
  if (file instanceof File && file.size > 0) {
    const { secureUrl } = await uploadMovieImage(file, folder)
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

  const { ticketUrl, trailerUrl, rating, ...rest } = parsed.data

  await createMovieRecord({
    ...rest,
    ticketUrl: emptyToNull(ticketUrl),
    trailerUrl: emptyToNull(trailerUrl),
    rating: rating === "" || rating === undefined ? null : rating,
    posterUrl,
    bannerUrl,
  })

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

  const { ticketUrl, trailerUrl, rating, ...rest } = parsed.data

  await updateMovieRecord(id, {
    ...rest,
    ticketUrl: emptyToNull(ticketUrl),
    trailerUrl: emptyToNull(trailerUrl),
    rating: rating === "" || rating === undefined ? null : rating,
    posterUrl: uploadedPosterUrl ?? currentPosterUrl,
    bannerUrl: uploadedBannerUrl ?? currentBannerUrl,
  })

  revalidateSite()
  redirect("/admin/movies")
}

export async function deleteMovieAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteMovieRecord(id)
  revalidateSite()
}

export async function setMovieStatusAction(id: string, status: MovieStatus): Promise<void> {
  await requireAdminSession()
  await setMovieStatus(id, status)
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
