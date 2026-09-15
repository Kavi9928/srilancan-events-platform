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
import type { TeamMember } from "@/lib/types"
import type { TeamMemberActionState } from "@/app/admin/team/actions"

const initialState: TeamMemberActionState = {}

export function TeamMemberForm({
  member,
  action,
}: {
  member?: TeamMember
  action: (
    prevState: TeamMemberActionState,
    formData: FormData
  ) => Promise<TeamMemberActionState>
}) {
  const [state, formAction, isPending] = useActionState(action, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {member ? <input type="hidden" name="currentImageUrl" value={member.imageUrl} /> : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <FieldContent>
            <Input id="name" name="name" defaultValue={member?.name} required />
            <FieldError errors={fieldErrors.name?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="role">Designation</FieldLabel>
          <FieldContent>
            <Input
              id="role"
              name="role"
              placeholder="Founder & Creative Director"
              defaultValue={member?.role}
              required
            />
            <FieldError errors={fieldErrors.role?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="bio">Short bio (optional)</FieldLabel>
          <FieldContent>
            <Textarea id="bio" name="bio" rows={3} defaultValue={member?.bio ?? ""} />
            <p className="text-xs text-muted-foreground">
              Shown under the name on the About page.
            </p>
            <FieldError errors={fieldErrors.bio?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="sortOrder">Display order</FieldLabel>
          <FieldContent>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              min={0}
              defaultValue={member?.sortOrder ?? 0}
            />
            <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
            <FieldError errors={fieldErrors.sortOrder?.map((message) => ({ message }))} />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="photo">
            Photo {member ? "(leave blank to keep current)" : ""}
          </FieldLabel>
          <FieldContent>
            {member ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.imageUrl}
                alt=""
                className="mb-2 h-24 w-24 rounded-lg object-cover"
              />
            ) : null}
            <Input id="photo" name="photo" type="file" accept="image/*" required={!member} />
            <p className="text-xs text-muted-foreground">
              A square or portrait photo works best.
            </p>
          </FieldContent>
        </Field>

        {state.error ? <FieldError>{state.error}</FieldError> : null}
      </FieldGroup>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : member ? "Save changes" : "Add member"}
      </Button>
    </form>
  )
}
