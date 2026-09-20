/**
 * Shown while a force-dynamic page waits on its database queries — without
 * this the visitor sees a blank screen for the length of the round trip.
 */
export default function PublicLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8" aria-busy="true">
      <span className="sr-only">Loading…</span>

      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="h-10 w-3/4 animate-pulse rounded-2xl bg-white/10 sm:w-1/2" />
        <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-white/5" />
        <div className="h-4 w-full max-w-md animate-pulse rounded-full bg-white/5" />
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="aspect-2/3 w-full animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded-full bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
