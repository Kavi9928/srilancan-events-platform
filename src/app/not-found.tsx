import { NotFoundContent } from "@/components/site/not-found-content"

/** Catches URLs that match no route at all — rendered without the site chrome. */
export default function NotFound() {
  return <NotFoundContent />
}
