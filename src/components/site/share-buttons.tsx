"use client"

import { ShareIcon, LinkIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function ShareButtons({ title }: { title: string }) {
  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // user cancelled the share sheet, nothing to do
      }
      return
    }

    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard")
    } catch {
      toast.error("Couldn't copy the link")
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleShare}>
      {typeof navigator !== "undefined" && "share" in navigator ? (
        <ShareIcon className="size-4" />
      ) : (
        <LinkIcon className="size-4" />
      )}
      Share
    </Button>
  )
}
