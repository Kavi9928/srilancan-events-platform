/**
 * The site's public origin, used for `metadataBase`, the sitemap and robots.
 *
 * Without this, Next resolves relative Open Graph image paths against the
 * request origin — which in development means share previews advertise
 * `http://localhost:3000/...` and render blank on Facebook, Instagram and
 * WhatsApp.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (e.g. a preview deploy).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://srilancanevents.ca"
).replace(/\/$/, "")

export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
}
