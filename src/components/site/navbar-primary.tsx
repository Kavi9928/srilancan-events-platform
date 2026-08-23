"use client"

import { Share2, Send, Heart, Star, Zap } from "lucide-react"

export function NavbarPrimary() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-red-950/20 to-black opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(249,115,22,0.1),transparent_50%)]" />

      {/* Main content */}
      <div className="relative z-10 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left - Social Media */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-red-500/30">
                <Star className="w-3 h-3 text-red-400 animate-pulse" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Follow</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10 hover:from-red-500/40 hover:to-red-600/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110 border border-red-500/20 hover:border-red-500/50"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 hover:from-orange-500/40 hover:to-orange-600/20 text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-110 border border-orange-500/20 hover:border-orange-500/50"
                  aria-label="Send"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 rounded-lg bg-gradient-to-br from-rose-500/20 to-rose-600/10 hover:from-rose-500/40 hover:to-rose-600/20 text-rose-400 hover:text-rose-300 transition-all duration-300 hover:scale-110 border border-rose-500/20 hover:border-rose-500/50"
                  aria-label="Like"
                >
                  <Heart className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right - Contact Info */}
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="tel:+94112345678"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300 group text-xs font-medium"
              >
                <Zap className="w-3.5 h-3.5 text-orange-400 group-hover:animate-pulse" />
                <span className="hidden md:inline">+94 (0) 112-345-678</span>
              </a>
              <a
                href="mailto:info@srilancanevents.ca"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-300 text-xs font-medium"
              >
                <span className="text-red-400">✉</span>
                <span className="hidden lg:inline">info@srilancanevents.ca</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
    </div>
  )
}
