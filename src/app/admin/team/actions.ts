"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { uploadImage } from "@/lib/cloudinary"
import {
  createTeamMemberRecord,
  updateTeamMemberRecord,
  deleteTeamMemberRecord,
} from "@/lib/team"
import { teamMemberFormSchema } from "@/lib/validation/team"

export type TeamMemberActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

function revalidateTeam() {
  revalidatePath("/about")
  revalidatePath("/admin/team")
}

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

async function uploadIfProvided(formData: FormData): Promise<string | null> {
  const file = formData.get("photo")
  if (file instanceof File && file.size > 0) {
    const { secureUrl } = await uploadImage(file, "team")
    return secureUrl
  }
  return null
}

export async function createTeamMemberAction(
  _prevState: TeamMemberActionState,
  formData: FormData
): Promise<TeamMemberActionState> {
  await requireAdminSession()

  const parsed = teamMemberFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const imageUrl = await uploadIfProvided(formData)
  if (!imageUrl) {
    return { error: "A photo is required." }
  }

  const { bio, ...rest } = parsed.data
  await createTeamMemberRecord({ ...rest, bio: emptyToNull(bio), imageUrl })

  revalidateTeam()
  redirect("/admin/team")
}

export async function updateTeamMemberAction(
  id: string,
  _prevState: TeamMemberActionState,
  formData: FormData
): Promise<TeamMemberActionState> {
  await requireAdminSession()

  const parsed = teamMemberFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const uploadedImageUrl = await uploadIfProvided(formData)
  const currentImageUrl = String(formData.get("currentImageUrl") ?? "")

  const { bio, ...rest } = parsed.data
  await updateTeamMemberRecord(id, {
    ...rest,
    bio: emptyToNull(bio),
    imageUrl: uploadedImageUrl ?? currentImageUrl,
  })

  revalidateTeam()
  redirect("/admin/team")
}

export async function deleteTeamMemberAction(id: string): Promise<void> {
  await requireAdminSession()
  await deleteTeamMemberRecord(id)
  revalidateTeam()
}
