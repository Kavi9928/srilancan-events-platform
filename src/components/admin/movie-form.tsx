"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Movie } from "@/lib/types"
import type { MovieActionState } from "@/app/admin/movies/actions"

const statusOptions = [
  { value: "NOW_SHOWING", label: "Now Showing" },
  { value: "COMING_SOON", label: "Coming Soon" },
  { value: "ARCHIVED", label: "Archived" },
]

const initialState: MovieActionState = {}

export function MovieForm({
  movie,
  action,
}: {
  movie?: Movie
  action: (prevState: MovieActionState, formData: FormData) => Promise<MovieActionState>
}) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {movie ? (
        <>
          <input type="hidden" name="currentPosterUrl" value={movie.posterUrl} />
          <input type="hidden" name="currentBannerUrl" value={movie.bannerUrl} />
        </>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <FieldContent>
            <Input id="title" name="title" defaultValue={movie?.title} required />
            <FieldError errors={fieldErrors.title?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="slug">Slug</FieldLabel>
          <FieldContent>
            <Input id="slug" name="slug" defaultValue={movie?.slug} required />
            <FieldError errors={fieldErrors.slug?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <FieldContent>
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={movie?.description}
              required
            />
            <FieldError errors={fieldErrors.description?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="genres">Genres</FieldLabel>
          <FieldContent>
            <Input
              id="genres"
              name="genres"
              placeholder="Drama, Family"
              defaultValue={movie?.genres.join(", ")}
              required
            />
            <FieldError errors={fieldErrors.genres?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="durationMinutes">Duration (minutes)</FieldLabel>
          <FieldContent>
            <Input
              id="durationMinutes"
              name="durationMinutes"
              type="number"
              min={1}
              defaultValue={movie?.durationMinutes}
              required
            />
            <FieldError
              errors={fieldErrors.durationMinutes?.map((message) => ({ message }))}
            />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="releaseDate">Release date</FieldLabel>
          <FieldContent>
            <Input
              id="releaseDate"
              name="releaseDate"
              type="date"
              defaultValue={movie?.releaseDate.slice(0, 10)}
              required
            />
            <FieldError errors={fieldErrors.releaseDate?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="rating">Rating (0-10, optional)</FieldLabel>
          <FieldContent>
            <Input
              id="rating"
              name="rating"
              type="number"
              min={0}
              max={10}
              step={0.1}
              defaultValue={movie?.rating ?? undefined}
            />
            <FieldError errors={fieldErrors.rating?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <FieldContent>
            <Select name="status" defaultValue={movie?.status ?? "COMING_SOON"}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue>
                  {(value: string) =>
                    statusOptions.find((option) => option.value === value)?.label
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="ticketUrl">Ticket Tailor URL (optional)</FieldLabel>
          <FieldContent>
            <Input
              id="ticketUrl"
              name="ticketUrl"
              type="url"
              defaultValue={movie?.ticketUrl ?? undefined}
            />
            <FieldError errors={fieldErrors.ticketUrl?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="trailerUrl">Trailer URL (optional)</FieldLabel>
          <FieldContent>
            <Input
              id="trailerUrl"
              name="trailerUrl"
              type="url"
              defaultValue={movie?.trailerUrl ?? undefined}
            />
            <FieldError errors={fieldErrors.trailerUrl?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="poster">
            Poster image {movie ? "(leave blank to keep current)" : ""}
          </FieldLabel>
          <FieldContent>
            {movie ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={movie.posterUrl} alt="" className="mb-2 h-24 w-16 rounded object-cover" />
            ) : null}
            <Input id="poster" name="poster" type="file" accept="image/*" required={!movie} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="banner">
            Banner image {movie ? "(leave blank to keep current)" : ""}
          </FieldLabel>
          <FieldContent>
            {movie ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={movie.bannerUrl}
                alt=""
                className="mb-2 h-16 w-28 rounded object-cover"
              />
            ) : null}
            <Input id="banner" name="banner" type="file" accept="image/*" required={!movie} />
          </FieldContent>
        </Field>

        {state.error ? <FieldError>{state.error}</FieldError> : null}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : movie ? "Save changes" : "Create movie"}
      </Button>
    </form>
  )
}
