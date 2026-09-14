"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import {
  createLocationRecord,
  updateLocationRecord,
  deleteLocationRecord,
} from "@/lib/locations"
import { locationFormSchema } from "@/lib/validation/location"

export type LocationActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

function revalidateSite() {
  revalidatePath("/", "layout")
  revalidatePath("/admin/locations")
  revalidatePath("/admin/movies")
}

export async function createLocationAction(
  _prevState: LocationActionState,
  formData: FormData
): Promise<LocationActionState> {
  await requireAdminSession()

  const parsed = locationFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  await createLocationRecord(parsed.data)

  revalidateSite()
  redirect("/admin/locations")
}

export async function updateLocationAction(
  id: string,
  _prevState: LocationActionState,
  formData: FormData
): Promise<LocationActionState> {
  await requireAdminSession()

  const parsed = locationFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  await updateLocationRecord(id, parsed.data)

  revalidateSite()
  redirect("/admin/locations")
}

export async function deleteLocationAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteLocationRecord(id)
  revalidateSite()
}
