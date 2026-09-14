"use client"

import { useState } from "react"

import { MovieGrid } from "@/components/site/movie-grid"
import type { Location, Movie } from "@/lib/types"

export function LocationFilterBar({
  locations,
  movies,
  emptyMessage,
  emptyMessageForLocation,
  priorityFirst = false,
}: {
  locations: Location[]
  movies: Movie[]
  /** Shown when "All" is selected. */
  emptyMessage: string
  /** Shown for a specific location; include the literal text "{location}" as a placeholder. */
  emptyMessageForLocation: string
  priorityFirst?: boolean
}) {
  const [activeLocation, setActiveLocation] = useState<string>("all")

  const filteredMovies =
    activeLocation === "all"
      ? movies
      : movies.filter((movie) => movie.locationId === activeLocation)

  const activeLocationLabel =
    activeLocation === "all"
      ? null
      : (locations.find((location) => location.id === activeLocation)?.name ?? "this location")

  return (
    <div className="space-y-6">
      {locations.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveLocation("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeLocation === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            🌍 All
          </button>
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeLocation === location.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {location.icon} {location.name}
            </button>
          ))}
        </div>
      )}

      <MovieGrid
        movies={filteredMovies}
        emptyMessage={
          activeLocationLabel
            ? emptyMessageForLocation.replace("{location}", activeLocationLabel)
            : emptyMessage
        }
        priorityFirst={priorityFirst}
      />
    </div>
  )
}
