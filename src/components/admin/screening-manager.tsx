"use client"

import { useActionState, useEffect, useState } from "react"
import { PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Screening } from "@/lib/types"
import {
  addScreeningAction,
  removeScreeningAction,
  type MovieActionState,
} from "@/app/admin/movies/actions"

const initialState: MovieActionState = {}

function AddScreeningDialog({ movieId }: { movieId: string }) {
  const [open, setOpen] = useState(false)
  const boundAction = addScreeningAction.bind(null, movieId)
  const [state, formAction, isPending] = useActionState(boundAction, initialState)
  const fieldErrors = state.fieldErrors ?? {}

  useEffect(() => {
    // Reacting to a completed Server Action result, not synchronizing render state —
    // there's no way to derive "the mutation just succeeded" during render itself.
    if (open && !isPending && !state.error && !state.fieldErrors && state !== initialState) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" size="sm" />}>
        <PlusIcon className="size-4" />
        Add screening
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add screening</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="startTime">Date &amp; time</FieldLabel>
              <FieldContent>
                <Input id="startTime" name="startTime" type="datetime-local" required />
                <FieldError errors={fieldErrors.startTime?.map((message) => ({ message }))} />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="venue">Venue (optional)</FieldLabel>
              <FieldContent>
                <Input id="venue" name="venue" />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="screeningTicketUrl">
                Ticket URL override (optional)
              </FieldLabel>
              <FieldContent>
                <Input id="screeningTicketUrl" name="ticketUrl" type="url" />
                <FieldError errors={fieldErrors.ticketUrl?.map((message) => ({ message }))} />
              </FieldContent>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding…" : "Add screening"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ScreeningManager({
  movieId,
  screenings,
}: {
  movieId: string
  screenings: Screening[]
}) {
  return (
    <div className="space-y-3 rounded-lg border border-border/60 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Screenings</h2>
        <AddScreeningDialog movieId={movieId} />
      </div>

      {screenings.length === 0 ? (
        <p className="text-sm text-muted-foreground">No screenings added yet.</p>
      ) : (
        <ul className="space-y-2">
          {screenings.map((screening) => (
            <li
              key={screening.id}
              className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2 text-sm"
            >
              <div>
                <p>{new Date(screening.startTime).toLocaleString()}</p>
                {screening.venue ? (
                  <p className="text-muted-foreground">{screening.venue}</p>
                ) : null}
              </div>
              <form action={removeScreeningAction.bind(null, screening.id)}>
                <Button type="submit" variant="ghost" size="icon-sm" aria-label="Remove screening">
                  <TrashIcon className="size-4" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
