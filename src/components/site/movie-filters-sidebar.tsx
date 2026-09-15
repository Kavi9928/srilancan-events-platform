"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"

const FACET_KEYS = ["genre", "language", "format"] as const

type FacetKey = (typeof FACET_KEYS)[number]

const FACET_LABELS: Record<FacetKey, string> = {
  genre: "Genre",
  language: "Language",
  format: "Format",
}

export function MovieFiltersSidebar({
  genres,
  languages,
  formats,
}: {
  genres: string[]
  languages: string[]
  formats: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const optionsByKey: Record<FacetKey, string[]> = {
    genre: genres,
    language: languages,
    format: formats,
  }

  function toggle(key: FacetKey, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    const selected = new Set(params.getAll(key))
    if (selected.has(value)) {
      selected.delete(value)
    } else {
      selected.add(value)
    }
    params.delete(key)
    selected.forEach((entry) => params.append(key, entry))
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const visibleFacets = FACET_KEYS.filter((key) => optionsByKey[key].length > 0)
  if (visibleFacets.length === 0) return null

  return (
    <aside className="w-full shrink-0 space-y-8 lg:w-56">
      {visibleFacets.map((key) => (
        <div key={key}>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{FACET_LABELS[key]}</h3>
          <ul className="space-y-2">
            {optionsByKey[key].map((option) => {
              const checked = searchParams.getAll(key).includes(option)
              return (
                <li key={option}>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(key, option)}
                      className="size-4 rounded border-input accent-primary"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </aside>
  )
}
