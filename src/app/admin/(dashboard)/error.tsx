"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangleIcon, RotateCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[admin] route error:", error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10">
        <AlertTriangleIcon className="size-5 text-destructive" />
      </div>

      <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        This screen could not be loaded. If it keeps happening, check that the database is
        reachable.
      </p>

      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted-foreground">Reference: {error.digest}</p>
      ) : null}

      <div className="mt-6 flex gap-2">
        <Button onClick={reset}>
          <RotateCwIcon className="size-4" />
          Try again
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/admin" />}>
          Dashboard
        </Button>
      </div>
    </div>
  )
}
