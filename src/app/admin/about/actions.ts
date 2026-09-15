"use server"

import { revalidatePath } from "next/cache"

import { requireAdminSession } from "@/lib/auth/session-cookie"
import { saveAboutContent } from "@/lib/admin-about"
import { aboutFormSchema } from "@/lib/validation/about"

export type AboutActionState = {
  status?: "success"
  error?: string
  fieldErrors?: Record<string, string[]>
}

function emptyToNull(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export async function updateAboutAction(
  _prevState: AboutActionState,
  formData: FormData
): Promise<AboutActionState> {
  await requireAdminSession()

  const parsed = aboutFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { quote, quoteAuthor, ...rest } = parsed.data

  await saveAboutContent({
    ...rest,
    quote: emptyToNull(quote),
    quoteAuthor: emptyToNull(quoteAuthor),
  })

  revalidatePath("/about")
  revalidatePath("/admin/about")

  return { status: "success" }
}
