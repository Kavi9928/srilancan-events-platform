import type { MovieStatus } from "@/lib/types"

export const statusLabel: Record<MovieStatus, string> = {
  NOW_SHOWING: "Now Showing",
  COMING_SOON: "Coming Soon",
  ARCHIVED: "Archived",
  DRAFT: "Draft",
}

/**
 * Now Showing vs Coming Soon is never picked manually — it's derived from releaseDate.
 * Compared at UTC calendar-day granularity (not exact instant) since releaseDate only
 * carries a date, not a time — an instant comparison would flip status up to half a day
 * early/late depending on the server's timezone offset from UTC.
 */
export function deriveShowingStatus(releaseDate: Date | string): "NOW_SHOWING" | "COMING_SOON" {
  const release = typeof releaseDate === "string" ? new Date(releaseDate) : releaseDate
  const releaseDay = Date.UTC(release.getUTCFullYear(), release.getUTCMonth(), release.getUTCDate())
  const today = new Date()
  const todayDay = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return releaseDay <= todayDay ? "NOW_SHOWING" : "COMING_SOON"
}

/** Archived and Draft are the only statuses an admin sets manually; everything else is date-derived. */
export function computeEffectiveStatus(
  status: MovieStatus,
  releaseDate: Date | string
): MovieStatus {
  return status === "ARCHIVED" || status === "DRAFT" ? status : deriveShowingStatus(releaseDate)
}
