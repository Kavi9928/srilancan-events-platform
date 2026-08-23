import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function RatingBadge({
  rating,
  className,
}: {
  rating: number | null
  className?: string
}) {
  if (rating == null) return null

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-background/90 px-1.5 py-0.5 text-xs font-semibold text-rating backdrop-blur-sm",
        className
      )}
    >
      <StarIcon className="size-3 fill-current" />
      {rating.toFixed(1)}
    </span>
  )
}
