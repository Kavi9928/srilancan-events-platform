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
import type { AboutContent } from "@/lib/types"
import { updateAboutAction, type AboutActionState } from "@/app/admin/about/actions"

const initialState: AboutActionState = {}

export function AboutForm({ content }: { content: AboutContent }) {
  const [state, formAction, isPending] = useActionState(updateAboutAction, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <FieldGroup>
        <h2 className="text-lg font-semibold">Our story</h2>

        <Field>
          <FieldLabel htmlFor="storyTitle">Heading</FieldLabel>
          <FieldContent>
            <Input id="storyTitle" name="storyTitle" defaultValue={content.storyTitle} required />
            <FieldError errors={fieldErrors.storyTitle?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="storyBody">Story text</FieldLabel>
          <FieldContent>
            <Textarea
              id="storyBody"
              name="storyBody"
              rows={8}
              defaultValue={content.storyBody}
              required
            />
            <p className="text-xs text-muted-foreground">
              One paragraph per line. Blank lines are ignored.
            </p>
            <FieldError errors={fieldErrors.storyBody?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="quote">Pull quote (optional)</FieldLabel>
          <FieldContent>
            <Textarea id="quote" name="quote" rows={3} defaultValue={content.quote ?? ""} />
            <FieldError errors={fieldErrors.quote?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="quoteAuthor">Quote attribution (optional)</FieldLabel>
          <FieldContent>
            <Input
              id="quoteAuthor"
              name="quoteAuthor"
              placeholder="— The Sri Lankan Events team"
              defaultValue={content.quoteAuthor ?? ""}
            />
            <FieldError errors={fieldErrors.quoteAuthor?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <h2 className="text-lg font-semibold">Vision</h2>

        <Field>
          <FieldLabel htmlFor="visionTitle">Vision statement</FieldLabel>
          <FieldContent>
            <Textarea
              id="visionTitle"
              name="visionTitle"
              rows={2}
              defaultValue={content.visionTitle}
              required
            />
            <FieldError errors={fieldErrors.visionTitle?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="visionBody">Vision description</FieldLabel>
          <FieldContent>
            <Textarea
              id="visionBody"
              name="visionBody"
              rows={4}
              defaultValue={content.visionBody}
              required
            />
            <FieldError errors={fieldErrors.visionBody?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <h2 className="text-lg font-semibold">Mission</h2>

        <Field>
          <FieldLabel htmlFor="missionTitle">Mission statement</FieldLabel>
          <FieldContent>
            <Textarea
              id="missionTitle"
              name="missionTitle"
              rows={2}
              defaultValue={content.missionTitle}
              required
            />
            <FieldError errors={fieldErrors.missionTitle?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="missionPoints">Mission points</FieldLabel>
          <FieldContent>
            <Textarea
              id="missionPoints"
              name="missionPoints"
              rows={6}
              defaultValue={content.missionPoints.join("\n")}
              required
            />
            <p className="text-xs text-muted-foreground">
              One point per line — each becomes a checkmarked bullet.
            </p>
            <FieldError errors={fieldErrors.missionPoints?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>
      </FieldGroup>

      {state.error ? <FieldError>{state.error}</FieldError> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save changes"}
        </Button>
        {state.status === "success" ? (
          <span className="text-sm text-muted-foreground">Saved — the About page is updated.</span>
        ) : null}
      </div>
    </form>
  )
}
