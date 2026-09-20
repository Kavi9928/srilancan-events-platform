/**
 * Emits a JSON-LD block. Rendered by a Server Component, so the markup is in
 * the initial HTML where crawlers and answer engines will see it without
 * executing JavaScript.
 */
export function JsonLd({ data }: { data: unknown }) {
  if (!data) return null

  return (
    <script
      type="application/ld+json"
      // The payload is our own serialised object, never user input. `<` is
      // escaped so a stray angle bracket in a title cannot close the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
