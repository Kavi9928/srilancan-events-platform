"use client"

import { useActionState, useEffect, useState } from "react"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  deleteAllTeamMembersAction,
  type TeamBulkActionState,
} from "@/app/admin/team/actions"

const initialState: TeamBulkActionState = {}

export function DeleteAllTeamButton({ memberCount }: { memberCount: number }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, isPending] = useActionState(
    deleteAllTeamMembersAction,
    initialState
  )

  useEffect(() => {
    // Reacting to a completed Server Action result, not synchronizing render
    // state — "the mutation just finished" cannot be derived during render.
    if (state.deletedCount !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false)
    }
  }, [state])

  // Nothing to clear, so the control would only be a loaded gun.
  if (memberCount === 0) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="destructive" />}>
        <Trash2Icon data-icon="inline-start" />
        Delete all
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete all team members?</DialogTitle>
          <DialogDescription>
            This removes {memberCount === 1 ? "the 1 member" : `all ${memberCount} members`} from
            the Team section of the About page. It cannot be undone — they would have to be added
            back one at a time.
          </DialogDescription>
        </DialogHeader>

        {state.error ? (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        ) : null}

        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" disabled={isPending} />}>
            Cancel
          </DialogClose>
          <form action={formAction}>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? "Deleting…" : `Delete all ${memberCount}`}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
