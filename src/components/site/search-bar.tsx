"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { Input } from "@/components/ui/input"

export function SearchBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search movies…"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={(event) => handleChange(event.target.value)}
        className="pl-8"
      />
    </div>
  )
}
