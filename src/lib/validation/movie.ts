import { z } from "zod"

export const movieFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().min(1, "Description is required"),
  genres: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((genre) => genre.trim())
        .filter(Boolean)
    )
    .refine((genres) => genres.length > 0, "Add at least one genre"),
  languages: z
    .string()
    .optional()
    .transform((value) =>
      (value ?? "")
        .split(",")
        .map((language) => language.trim())
        .filter(Boolean)
    ),
  formats: z
    .string()
    .optional()
    .transform((value) =>
      (value ?? "")
        .split(",")
        .map((format) => format.trim())
        .filter(Boolean)
    ),
  durationMinutes: z.coerce.number().int().positive("Must be a positive number"),
  releaseDate: z.coerce.date(),
  ticketUrl: z.union([z.literal(""), z.string().url()]).optional(),
  trailerUrl: z.union([z.literal(""), z.string().url()]).optional(),
  rating: z
    .union([z.literal(""), z.coerce.number().min(0).max(10)])
    .optional(),
  locationId: z.string().optional(),
  isFeatured: z.literal("on").optional(),
  archived: z.literal("on").optional(),
  draft: z.literal("on").optional(),
})

export type MovieFormValues = z.infer<typeof movieFormSchema>

export const screeningFormSchema = z.object({
  startTime: z.coerce.date(),
  venue: z.string().optional(),
  ticketUrl: z.union([z.literal(""), z.string().url()]).optional(),
})

export type ScreeningFormValues = z.infer<typeof screeningFormSchema>
