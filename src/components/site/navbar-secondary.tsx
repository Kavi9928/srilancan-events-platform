"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon, Sparkles } from "lucide-react"
import { useState } from "react"

const NAV_LINKS = [
  { label: "Now Showing", href: "/now-showing" },
  { label: "Coming Soon", href: "/coming-soon" },
  { label: "All Movies", href: "/movies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function NavbarSecondary() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-white/40 transition-all group-hover:scale-110 duration-300">
                <Image
                  src="/logo.png"
                  alt="SriLanCAN Events"
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain"
                  priority
                />
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs text-white/60 font-medium">EVENTS</span>
              <span className="text-lg font-black bg-gradient-to-r from-red-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                SriLanCAN
              </span>
            </div>
          </Link>

          {/* Center - Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 group ${
                  pathname === link.href
                    ? "bg-white/20 text-white shadow-lg shadow-red-500/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-1">
                  {pathname === link.href && (
                    <Sparkles className="w-3 h-3 text-red-400" />
                  )}
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right - CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 active:scale-95">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? (
              <XIcon className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === link.href
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
