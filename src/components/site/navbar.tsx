"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Now Showing", href: "/now-showing" },
  { label: "Coming Soon", href: "/coming-soon" },
  { label: "All Movies", href: "/movies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transition when scrolled past 300px
      setIsScrolled(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Spacer for floating navbar */}
      <div className={`transition-all duration-300 ${isScrolled ? "h-20" : "h-0"}`} />

      <nav
        className={`transition-all duration-500 ease-out ${
          isScrolled
            ? "fixed left-1/2 -translate-x-1/2 top-8 w-[95%] max-w-4xl rounded-2xl shadow-2xl shadow-red-500/20"
            : "sticky top-14 w-full rounded-none"
        } z-50`}
      >
        {/* Animated background with gradients */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isScrolled
                ? "bg-black/90 backdrop-blur-3xl rounded-2xl"
                : "bg-black/80 backdrop-blur-3xl"
            }`}
          />
          <div className="absolute top-0 left-0 w-96 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(239,68,68,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(249,115,22,0.05),transparent_50%)]" />
        </div>

        {/* Floating border glow effect on scroll */}
        {isScrolled && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur opacity-30 -z-10" />
        )}

        {/* Content */}
        <div className="relative z-10 border-b border-white/10">
          <div className={`transition-all duration-500 ${
            isScrolled
              ? "max-w-full mx-auto px-8 py-3"
              : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0"
          }`}>
            <div className={`flex items-center justify-between transition-all duration-500 gap-4 ${
              isScrolled ? "h-16" : "h-20"
            }`}>
              {/* Left - Logo (No Background) */}
              <Link href="/" className="flex-shrink-0 group relative">
                {/* Glow effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 rounded-xl blur transition-opacity duration-500 -z-10 ${
                  isScrolled ? "opacity-10" : "opacity-20"
                } group-hover:opacity-40`} />

                <Image
                  src="/logo.png"
                  alt="SriLanCAN Events"
                  width={120}
                  height={60}
                  className={`object-contain group-hover:scale-105 transition-all duration-300 ${
                    isScrolled ? "h-12" : "h-14"
                  } w-auto`}
                  priority
                />
              </Link>

              {/* Center - Navigation Links */}
              <div className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`relative px-4 py-2.5 font-medium text-sm transition-all duration-300 group ${
                      pathname === link.href
                        ? "text-red-400"
                        : "text-white/70 hover:text-white"
                    } ${isScrolled ? "py-2" : "py-2.5"}`}
                  >
                    {pathname === link.href && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg opacity-100 -z-10" />
                        <Sparkles className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-red-400 animate-pulse" />
                      </>
                    )}
                    <span className={pathname === link.href ? "ml-4" : ""}>{link.label}</span>

                    {/* Underline animation */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
                      pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                ))}
              </div>

              {/* Right - CTA Button */}
              <div className="hidden md:flex items-center gap-3">
                <button className="relative group px-6 py-2.5 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 opacity-100 group-hover:opacity-110 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity group-hover:blur-xl" />

                  {/* Text */}
                  <span className="relative block group-hover:scale-105 transition-transform duration-300">
                    Book Now
                  </span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20"
              >
                {isOpen ? (
                  <XIcon className="w-5 h-5 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
              <div className="lg:hidden pb-4 space-y-2 border-t border-white/10 pt-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      pathname === link.href
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30"
                        : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold mt-4 hover:shadow-lg hover:shadow-red-500/50 transition-all">
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
