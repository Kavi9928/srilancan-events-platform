import Link from "next/link"

import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { logoutAction } from "@/app/admin/login/actions"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[220px_1fr]">
      <aside className="hidden flex-col justify-between border-r border-border/60 p-4 md:flex">
        <div>
          <Link href="/admin" className="mb-6 block text-lg font-semibold">
            Admin Panel
          </Link>
          <AdminNav />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form action={logoutAction} className="flex-1">
            <Button type="submit" variant="ghost" className="w-full justify-start">
              Log out
            </Button>
          </form>
        </div>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  )
}
