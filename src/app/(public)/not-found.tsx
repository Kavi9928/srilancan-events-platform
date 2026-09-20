import { NotFoundContent } from "@/components/site/not-found-content"

/**
 * Used when notFound() fires inside a public page (an unknown movie or blog
 * slug), so the visitor keeps the navbar and footer and can carry on browsing.
 */
export default function PublicNotFound() {
  return <NotFoundContent />
}
