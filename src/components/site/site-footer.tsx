import Image from "next/image"
import Link from "next/link"
import { MailIcon, MapPinIcon } from "lucide-react"

import { SOCIAL_LINKS } from "@/lib/social-links"

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Movies", href: "/movies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

const CONTACT_DETAILS = [
  { icon: MailIcon, label: "info@srilancanevents.ca", href: "mailto:info@srilancanevents.ca" },
  { icon: MapPinIcon, label: "Toronto, Ontario, Canada", href: null },
]

export function SiteFooter() {
  const year = new Date().getUTCFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-black">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(239,68,68,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(249,115,22,0.06),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group relative inline-block">
              <div className="absolute -inset-2 -z-10 rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-rose-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-40" />
              <Image
                src="/logo.png"
                alt="SriLanCAN Events"
                width={140}
                height={70}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Your home for Sri Lankan movies, concerts, and cultural events across Canada. Book
              your tickets in seconds and never miss a moment.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/10 hover:text-red-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-red-400 uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-red-500/60 transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-wider text-red-400 uppercase">Contact</h3>
            <ul className="mt-4 space-y-3">
              {CONTACT_DETAILS.map((detail) => {
                const Icon = detail.icon
                const content = (
                  <>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                    <span>{detail.label}</span>
                  </>
                )

                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="flex gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex gap-2.5 text-sm text-white/60">{content}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Sri Lankan Events. All rights reserved.</p>
          <p>srilancanevents.ca</p>
        </div>
      </div>
    </footer>
  )
}
