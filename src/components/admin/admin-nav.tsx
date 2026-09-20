"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  ClapperboardIcon,
  MapPinIcon,
  NewspaperIcon,
  MailIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/movies", label: "Movies", icon: ClapperboardIcon },
  { href: "/admin/locations", label: "Locations", icon: MapPinIcon },
  { href: "/admin/blog", label: "Blog", icon: NewspaperIcon },
  { href: "/admin/about", label: "About Page", icon: FileTextIcon },
  { href: "/admin/team", label: "Team", icon: UsersIcon },
  { href: "/admin/contact", label: "Inquiries", icon: MailIcon },
]

export function AdminNav({ unreadInquiries = 0 }: { unreadInquiries?: number }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {adminLinks.map((link) => {
        const Icon = link.icon
        const isActive =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)
        // Contact inquiries send no notification email, so the badge is the
        // only signal that something new has come in.
        const badge = link.href === "/admin/contact" ? unreadInquiries : 0

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
            )}
          >
            <Icon className="size-4" />
            {link.label}
            {badge > 0 ? (
              <span
                className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-semibold text-white tabular-nums"
                aria-label={`${badge} unread ${badge === 1 ? "inquiry" : "inquiries"}`}
              >
                {badge > 99 ? "99+" : badge}
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
