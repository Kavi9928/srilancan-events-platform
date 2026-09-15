import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { AboutForm } from "@/components/admin/about-form"
import { getAboutContent } from "@/lib/about"

export const dynamic = "force-dynamic"

export default async function AdminAboutPage() {
  const content = await getAboutContent()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">About Page</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit the story, vision, and mission shown on the public About page.
          </p>
        </div>
        <Link
          href="/about"
          target="_blank"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          View page
          <ExternalLinkIcon className="size-3.5" />
        </Link>
      </div>

      <AboutForm content={content} />
    </div>
  )
}
