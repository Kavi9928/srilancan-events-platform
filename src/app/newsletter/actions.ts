"use server"

import { subscribeEmail } from "@/lib/newsletter"
import { newsletterFormSchema } from "@/lib/validation/newsletter"

export type NewsletterState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function subscribeAction(
  _prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const parsed = newsletterFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email." }
  }

  await subscribeEmail(parsed.data.email.trim().toLowerCase())

  return { status: "success", message: "You're subscribed — thanks for joining!" }
}
