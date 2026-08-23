import { BookTicketsButton } from "@/components/site/book-tickets-button"
import { getMovieScreenings } from "@/lib/movies"

export async function ScreeningsList({
  movieId,
  fallbackTicketUrl,
}: {
  movieId: string
  fallbackTicketUrl: string | null
}) {
  const screenings = await getMovieScreenings(movieId)

  if (screenings.length === 0) return null

  return (
    <div className="max-w-2xl space-y-2">
      <h2 className="text-lg font-semibold">Showtimes</h2>
      <ul className="space-y-2">
        {screenings.map((screening) => (
          <li
            key={screening.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 px-4 py-3"
          >
            <div>
              <p className="font-medium">
                {new Date(screening.startTime).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              {screening.venue ? (
                <p className="text-sm text-muted-foreground">{screening.venue}</p>
              ) : null}
            </div>
            <BookTicketsButton ticketUrl={screening.ticketUrl ?? fallbackTicketUrl} />
          </li>
        ))}
      </ul>
    </div>
  )
}
