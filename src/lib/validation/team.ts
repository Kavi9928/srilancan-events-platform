import { z } from "zod"

export const teamMemberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  bio: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0, "Must be 0 or higher").default(0),
})

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>
