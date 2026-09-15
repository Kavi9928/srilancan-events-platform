import { z } from "zod"

/** One item per line, blank lines dropped. */
const linesToArray = z
  .string()
  .optional()
  .transform((value) =>
    (value ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
  )

export const aboutFormSchema = z.object({
  storyTitle: z.string().min(1, "Story heading is required"),
  storyBody: z.string().min(1, "Story text is required"),
  quote: z.string().optional(),
  quoteAuthor: z.string().optional(),
  visionTitle: z.string().min(1, "Vision statement is required"),
  visionBody: z.string().min(1, "Vision description is required"),
  missionTitle: z.string().min(1, "Mission statement is required"),
  missionPoints: linesToArray.refine(
    (points) => points.length > 0,
    "Add at least one mission point"
  ),
})

export type AboutFormValues = z.infer<typeof aboutFormSchema>
