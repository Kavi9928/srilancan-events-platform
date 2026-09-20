import Link from "next/link"
import { CompassIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Shared by the root 404 and the one inside the public route group. */
export function NotFoundContent() {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.15),transparent_65%)]" />

      <div className="relative mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <CompassIcon className="h-6 w-6 text-red-400" />
        </div>

        <p className="bg-gradient-to-r from-red-500 via-orange-400 to-rose-500 bg-clip-text text-6xl font-black text-transparent">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 text-white/60">
          The link may be out of date, or the event may have finished its run.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/movies" />}
            className="bg-gradient-to-r from-red-600 to-orange-500 shadow-lg shadow-red-500/20 hover:from-red-700 hover:to-orange-600"
          >
            Browse events
            <ArrowRightIcon className="h-4 w-4" />
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
