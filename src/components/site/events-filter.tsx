"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { MapPin } from "lucide-react"

import { MovieGrid } from "@/components/site/movie-grid"
import { MovieFiltersSidebar } from "@/components/site/movie-filters-sidebar"
import { filterMoviesByFacets } from "@/lib/movie-filters"
import type { Location, Movie } from "@/lib/types"

export function EventsFilter({
  locations,
  nowShowing,
  comingSoon,
  genres,
  languages,
  formats,
}: {
  locations: Location[]
  nowShowing: Movie[]
  comingSoon: Movie[]
  genres: string[]
  languages: string[]
  formats: string[]
}) {
  const searchParams = useSearchParams()
  const facets = {
    genres: searchParams.getAll("genre"),
    languages: searchParams.getAll("language"),
    formats: searchParams.getAll("format"),
  }

  const facetedNowShowing = filterMoviesByFacets(nowShowing, facets)
  const facetedComingSoon = filterMoviesByFacets(comingSoon, facets)

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8 text-red-400" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Discover Events Near You
          </h2>
        </div>
        <p className="text-lg text-white/70 max-w-2xl">
          Find the best events happening in your city across Canada
        </p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <MovieFiltersSidebar genres={genres} languages={languages} formats={formats} />

        <div className="flex-1 space-y-16">
          {/* Now Showing */}
          <CategoryEventsSection
            title="Now Showing"
            movies={facetedNowShowing}
            locations={locations}
            emptyMessage="Nothing showing right now."
            emptyMessageForLocation={(location) => `Nothing showing in ${location} right now.`}
          />

          {/* Upcoming Shows */}
          <CategoryEventsSection
            title="Upcoming Shows"
            movies={facetedComingSoon}
            locations={locations}
            emptyMessage="No upcoming shows yet."
            emptyMessageForLocation={(location) => `No upcoming shows in ${location} yet.`}
          />
        </div>
      </div>
    </section>
  )
}

function CategoryEventsSection({
  title,
  movies,
  locations,
  emptyMessage,
  emptyMessageForLocation,
}: {
  title: string
  movies: Movie[]
  locations: Location[]
  emptyMessage: string
  emptyMessageForLocation: (location: string) => string
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
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>

      {/* City Filter Buttons */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex flex-wrap gap-3 p-4 rounded-2xl bg-black/40 backdrop-blur-xl transition-all duration-300">
          <button
            onClick={() => setActiveLocation("all")}
            className={`group relative px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
              activeLocation === "all"
                ? "bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 text-white shadow-lg shadow-red-500/50"
                : "bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40"
            }`}
          >
            <span className="mr-2">🌍</span>
            All Cities
            {activeLocation === "all" && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-30 blur -z-10 animate-pulse" />
            )}
          </button>

          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`group relative px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                activeLocation === location.id
                  ? "bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 text-white shadow-lg shadow-red-500/50"
                  : "bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40"
              }`}
            >
              <span className="mr-2">{location.icon}</span>
              {location.name}

              {activeLocation === location.id && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-30 blur -z-10 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      <MovieGrid
        movies={filteredMovies}
        emptyMessage={
          activeLocationLabel ? emptyMessageForLocation(activeLocationLabel) : emptyMessage
        }
      />
    </div>
  )
}
