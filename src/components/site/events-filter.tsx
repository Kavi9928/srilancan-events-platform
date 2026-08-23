"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

const LOCATIONS = [
  { id: "all", label: "All Events", icon: "🌍" },
  { id: "toronto", label: "Toronto", icon: "🏙️" },
  { id: "vancouver", label: "Vancouver", icon: "🏔️" },
  { id: "montreal", label: "Montreal", icon: "🇫🇷" },
  { id: "calgary", label: "Calgary", icon: "⛰️" },
  { id: "ottawa", label: "Ottawa", icon: "🏛️" },
]

export function EventsFilter() {
  const [activeLocation, setActiveLocation] = useState("all")

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
          {LOCATIONS.map((location) => (
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
              {location.label}

              {/* Active indicator */}
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
            {activeLocation === "all" ? "Showing all events" : `Showing events in ${LOCATIONS.find((l) => l.id === activeLocation)?.label}`}
          </span>
          {" "}- Scroll down to explore concerts, movies, festivals, and more!
        </p>
      </div>
    </section>
  )
}
