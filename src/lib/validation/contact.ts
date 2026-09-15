import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message is required"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
