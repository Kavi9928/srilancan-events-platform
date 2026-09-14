import { z } from "zod"

export const newsletterFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
})
