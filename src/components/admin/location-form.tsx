"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import type { Location } from "@/lib/types"
import type { LocationActionState } from "@/app/admin/locations/actions"

const initialState: LocationActionState = {}

export function LocationForm({
  location,
  action,
}: {
  location?: Location
  action: (prevState: LocationActionState, formData: FormData) => Promise<LocationActionState>
}) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-md space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" defaultValue={location?.name} required />
            <FieldError errors={fieldErrors.name?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="icon">Icon (single emoji)</FieldLabel>
          <FieldContent>
            <Input
              id="icon"
              name="icon"
              placeholder="📍"
              defaultValue={location?.icon ?? "📍"}
              required
            />
            <FieldError errors={fieldErrors.icon?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        {state.error ? <FieldError>{state.error}</FieldError> : null}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : location ? "Save changes" : "Create location"}
      </Button>
    </form>
  )
}
