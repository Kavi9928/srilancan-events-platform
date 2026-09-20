import Link from "next/link"

import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { logoutAction } from "@/app/admin/login/actions"
import { getUnreadInquiryCount } from "@/lib/admin-contact"

// The unread badge has to reflect the database on every navigation.
export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // A database hiccup should not take down the whole admin shell — fall back
  // to hiding the badge rather than throwing from the layout.
  const unreadInquiries = await getUnreadInquiryCount().catch(() => 0)

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[220px_1fr]">
      <aside className="hidden flex-col justify-between border-r border-border/60 p-4 md:flex">
        <div>
          <Link href="/admin" className="mb-6 block text-lg font-semibold">
            Admin Panel
          </Link>
          <AdminNav unreadInquiries={unreadInquiries} />
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
