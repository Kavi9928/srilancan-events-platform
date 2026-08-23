export function SiteFooter() {
  const year = new Date().getUTCFullYear()

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {year} Sri Lankan Events. All rights reserved.</p>
        <p>srilancanevents.ca</p>
      </div>
    </footer>
  )
}
