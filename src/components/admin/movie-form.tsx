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
import type { Movie, Location } from "@/lib/types"
import type { MovieActionState } from "@/app/admin/movies/actions"

const initialState: MovieActionState = {}

export function MovieForm({
  movie,
  locations,
  action,
}: {
  movie?: Movie
  locations: Location[]
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

        <Field>
          <FieldLabel htmlFor="languages">Languages (optional)</FieldLabel>
          <FieldContent>
            <Input
              id="languages"
              name="languages"
              placeholder="Tamil, Sinhala"
              defaultValue={movie?.languages.join(", ")}
            />
            <FieldError errors={fieldErrors.languages?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="formats">Formats (optional)</FieldLabel>
          <FieldContent>
            <Input
              id="formats"
              name="formats"
              placeholder="2D, IMAX"
              defaultValue={movie?.formats.join(", ")}
            />
            <FieldError errors={fieldErrors.formats?.map((message) => ({ message }))} />
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
          <FieldLabel htmlFor="locationId">Location</FieldLabel>
          <FieldContent>
            <Select name="locationId" defaultValue={movie?.locationId ?? ""}>
              <SelectTrigger id="locationId" className="w-full">
                <SelectValue>
                  {(value: string) =>
                    value
                      ? locations.find((location) => location.id === value)?.name
                      : "No location"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No location</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.icon} {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <input
            id="isFeatured"
            name="isFeatured"
            type="checkbox"
            defaultChecked={movie?.isFeatured}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="isFeatured" className="font-normal">
            Feature in Hero section
          </FieldLabel>
        </Field>

        <Field orientation="horizontal">
          <input
            id="draft"
            name="draft"
            type="checkbox"
            defaultChecked={movie?.status === "DRAFT"}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="draft" className="font-normal">
            Save as draft (hidden from the site until you publish it)
          </FieldLabel>
        </Field>

        <Field orientation="horizontal">
          <input
            id="archived"
            name="archived"
            type="checkbox"
            defaultChecked={movie?.status === "ARCHIVED"}
            className="size-4 rounded border-input"
          />
          <FieldLabel htmlFor="archived" className="font-normal">
            Archived (hidden from the site — otherwise Now Showing / Coming Soon is set
            automatically from the release date)
          </FieldLabel>
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
