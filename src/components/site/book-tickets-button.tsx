import { Button } from "@/components/ui/button"

export function BookTicketsButton({
  ticketUrl,
  className,
}: {
  ticketUrl: string | null
  className?: string
}) {
  if (!ticketUrl) {
    return (
      <Button disabled className={className}>
        Tickets Coming Soon
      </Button>
    )
  }

  return (
    <Button
      className={className}
      nativeButton={false}
      render={
        <a href={ticketUrl} target="_blank" rel="noopener noreferrer" />
      }
    >
      Book Tickets
    </Button>
  )
}
