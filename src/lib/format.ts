export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`
}

export function formatReleaseDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}
