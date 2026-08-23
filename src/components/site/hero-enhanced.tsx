"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, SparklesIcon, PlayIcon } from "lucide-react"
import type { Movie } from "@/lib/types"

export function HeroEnhanced({ movies }: { movies: Movie[] }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const featuredMovie = movies[0]

  return (
    <section className="relative w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] min-h-screen overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950" />

      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05))] bg-[length:40px_40px]" />

      {/* Radial glow effect */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex items-center justify-between px-4 sm:px-8 lg:px-16">
        {/* Left content */}
        <div className={`flex-1 max-w-2xl space-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Top badge with animation */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 backdrop-blur-sm hover:border-red-400/80 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
            <SparklesIcon className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-semibold text-red-300">🎬 Sri Lankan Events & Cinema</span>
          </div>

          {/* Main headline with gradient */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
              <span className="block text-white mb-2">Your Next</span>
              <span className="block bg-gradient-to-r from-red-400 via-rose-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                Unforgettable
              </span>
              <span className="block text-white mt-2">Experience</span>
            </h1>
          </div>

          {/* Compelling subheading */}
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl">
            Discover world-class events, blockbuster movies, and cultural experiences happening across Sri Lanka. Book your tickets and create memories that last a lifetime.
          </p>

          {/* CTA buttons group */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              nativeButton={false}
              render={<Link href="/movies" />}
              className="group rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-2xl hover:shadow-red-500/50 hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 justify-center"
            >
              <span>Explore Now</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/coming-soon" />}
              className="rounded-full border-2 border-red-400/60 bg-white/5 backdrop-blur-sm px-8 py-4 text-lg font-bold text-red-200 hover:bg-red-500/20 hover:border-red-400 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              <PlayIcon className="w-5 h-5" />
              <span>Coming Soon</span>
            </Button>
          </div>

          {/* Social proof / stats */}
          <div className="flex gap-8 pt-8 border-t border-white/10">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-red-400">500+</p>
              <p className="text-sm text-gray-400">Events & Movies</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-orange-400">10K+</p>
              <p className="text-sm text-gray-400">Happy Bookings</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-rose-400">24/7</p>
              <p className="text-sm text-gray-400">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Right side - Featured event showcase */}
        <div className={`hidden lg:flex flex-1 items-center justify-end transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="relative w-full max-w-sm">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse" />

            {/* Card container */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:border-red-400/50 group">
              {/* Featured image */}
              <div className="relative h-96 overflow-hidden">
                <Image
                  src={featuredMovie?.bannerUrl || "https://picsum.photos/seed/featured-event/600/700"}
                  alt="Featured Event"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  Featured
                </div>
              </div>

              {/* Content section */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-red-400 text-sm font-semibold mb-2">NOW SHOWING</p>
                  <h3 className="text-2xl font-bold text-white">{featuredMovie?.title || "Unforgettable Cinema"}</h3>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {featuredMovie?.description || "Experience extraordinary entertainment that captivates your senses and moves your soul."}
                </p>

                <div className="flex gap-2 pt-2">
                  {featuredMovie?.genres.slice(0, 2).map((genre) => (
                    <span key={genre} className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30">
                      {genre}
                    </span>
                  ))}
                </div>

                <Button
                  nativeButton={false}
                  render={<Link href={`/movies/${featuredMovie?.slug || "#"}`} />}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400 font-medium">Scroll to explore</p>
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @media (max-width: 1024px) {
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}
