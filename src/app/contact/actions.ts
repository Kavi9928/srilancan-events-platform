"use server"

import { createContactInquiry } from "@/lib/contact"
import { sendContactInquiryEmail } from "@/lib/email"
import { contactFormSchema } from "@/lib/validation/contact"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message?: string
}

function emptyToNull(value: string | undefined): string | null {
  return value ? value : null
}

export async function submitContactInquiryAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid submission." }
  }

  const { name, email, subject, message } = parsed.data
  const inquiry = await createContactInquiry({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: emptyToNull(subject?.trim()),
    message: message.trim(),
  })

  await sendContactInquiryEmail(inquiry)

  return { status: "success", message: "Thanks for reaching out — we'll get back to you soon." }
}
