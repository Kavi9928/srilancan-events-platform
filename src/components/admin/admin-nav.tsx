"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboardIcon, ClapperboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/movies", label: "Movies", icon: ClapperboardIcon },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {adminLinks.map((link) => {
        const Icon = link.icon
        const isActive =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href)

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
          </Link>
        )
      })}
    </nav>
  )
}
