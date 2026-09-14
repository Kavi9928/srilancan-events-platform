"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

import { MovieGrid } from "@/components/site/movie-grid"
import type { Location, Movie } from "@/lib/types"

export function EventsFilter({
  locations,
  nowShowing,
  comingSoon,
}: {
  locations: Location[]
  nowShowing: Movie[]
  comingSoon: Movie[]
}) {
  const [activeLocation, setActiveLocation] = useState<string>("all")

  const filterByLocation = (movies: Movie[]) =>
    activeLocation === "all"
      ? movies
      : movies.filter((movie) => movie.locationId === activeLocation)

  const filteredNowShowing = filterByLocation(nowShowing)
  const filteredComingSoon = filterByLocation(comingSoon)

  const activeLocationLabel =
    activeLocation === "all"
      ? "all events"
      : (locations.find((location) => location.id === activeLocation)?.name ?? "this location")

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

      {/* Filter Buttons */}
      <div className="relative">
        {/* Background glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex flex-wrap gap-4 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
          <button
            onClick={() => setActiveLocation("all")}
            className={`group relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
              activeLocation === "all"
                ? "bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 text-white shadow-lg shadow-red-500/50"
                : "bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40"
            }`}
          >
            <span className="mr-2">🌍</span>
            All Events
            {activeLocation === "all" && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-30 blur -z-10 animate-pulse" />
            )}
          </button>

          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setActiveLocation(location.id)}
              className={`group relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
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

      {/* Results Info */}
      <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="text-sm text-white/70">
          <span className="text-red-400 font-semibold">
            {activeLocation === "all" ? "Showing all events" : `Showing events in ${activeLocationLabel}`}
          </span>
          {" "}- Scroll down to explore concerts, movies, festivals, and more!
        </p>
      </div>

      {/* Now Showing */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6">Now Showing</h3>
        <MovieGrid
          movies={filteredNowShowing}
          emptyMessage={`Nothing showing in ${activeLocationLabel} right now.`}
        />
      </div>

      {/* Upcoming Shows */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6">Upcoming Shows</h3>
        <MovieGrid
          movies={filteredComingSoon}
          emptyMessage={`No upcoming shows in ${activeLocationLabel} yet.`}
        />
      </div>
    </section>
  )
}
