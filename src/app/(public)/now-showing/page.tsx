import type { Metadata } from "next"

import { LocationFilterBar } from "@/components/site/location-filter-bar"
import { getNowShowingMovies } from "@/lib/movies"
import { listLocations } from "@/lib/locations"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Now Showing",
  description:
    "Sri Lankan films and events playing right now in Toronto and across Canada. Check showtimes and book tickets.",
  alternates: { canonical: "/now-showing" },
}

export default async function NowShowingPage() {
  const [movies, locations] = await Promise.all([getNowShowingMovies(), listLocations()])

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Now Showing</h1>
      <LocationFilterBar
        movies={movies}
        locations={locations}
        emptyMessage="Nothing showing right now — check back soon."
        emptyMessageForLocation="Nothing showing in {location} right now — check back soon."
        priorityFirst
      />
    </div>
  )
}
