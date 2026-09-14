import { z } from "zod"

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })

export const locationFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z
    .string()
    .min(1, "Icon is required")
    .refine(
      (value) => [...graphemeSegmenter.segment(value)].length === 1,
      "Enter a single emoji"
    ),
})

export type LocationFormValues = z.infer<typeof locationFormSchema>
