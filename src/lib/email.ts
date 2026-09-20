import { Resend } from "resend"

// Resend isn't configured with a real API key yet (local dev only) — skip
// sending instead of failing. Mirrors the Cloudinary fallback in cloudinary.ts.
const HAS_RESEND_CREDENTIALS = (process.env.RESEND_API_KEY?.length ?? 0) > 4

const resend = HAS_RESEND_CREDENTIALS ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactInquiryEmail(inquiry: {
  name: string
  email: string
  subject: string | null
  message: string
}): Promise<void> {
  // Kept separate from ADMIN_EMAIL, which is the admin *login* identity —
  // the inbox that should receive enquiries is a different decision from
  // who signs in. Falls back to ADMIN_EMAIL when unset.
  const to = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL
  const from = process.env.RESEND_FROM_EMAIL

  if (!resend || !to || !from) {
    console.warn(
      "[email] Resend isn't configured (RESEND_API_KEY/RESEND_FROM_EMAIL) — skipping the contact notification email. The inquiry is still saved."
    )
    return
  }

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: inquiry.email,
      subject: `New contact inquiry: ${inquiry.subject || "General inquiry"}`,
      text: `From: ${inquiry.name} <${inquiry.email}>\n\n${inquiry.message}`,
    })
  } catch (error) {
    // Never let an email delivery failure block the inquiry from being saved.
    console.error("[email] Failed to send contact notification email:", error)
  }
}
