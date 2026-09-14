import type { Metadata } from "next"

import { LocationFilterBar } from "@/components/site/location-filter-bar"
import { getComingSoonMovies } from "@/lib/movies"
import { listLocations } from "@/lib/locations"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Movies coming soon.",
}

export default async function ComingSoonPage() {
  const [movies, locations] = await Promise.all([getComingSoonMovies(), listLocations()])

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Coming Soon</h1>
      <LocationFilterBar
        movies={movies}
        locations={locations}
        emptyMessage="No upcoming movies announced yet."
        emptyMessageForLocation="No upcoming movies announced for {location} yet."
      />
    </div>
  )
}
