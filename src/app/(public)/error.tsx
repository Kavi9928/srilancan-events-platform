"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangleIcon, RotateCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/**
 * Every public page is force-dynamic and database-backed, so a Mongo hiccup
 * would otherwise drop the visitor on Next's unstyled error screen.
 */
export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[public] route error:", error)
  }, [error])

  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_65%)]" />

      <div className="relative mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <AlertTriangleIcon className="h-6 w-6 text-red-400" />
        </div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">Something went wrong</h1>
        <p className="mt-3 text-white/60">
          We hit a problem loading this page. Trying again usually sorts it out.
        </p>

        {error.digest ? (
          <p className="mt-4 font-mono text-xs text-white/30">Reference: {error.digest}</p>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-red-600 to-orange-500 shadow-lg shadow-red-500/20 hover:from-red-700 hover:to-orange-600"
          >
            <RotateCwIcon className="h-4 w-4" />
            Try again
          </Button>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/" />}
            className="border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Back home
          </Button>
        </div>
      </div>
    </div>
  )
}
