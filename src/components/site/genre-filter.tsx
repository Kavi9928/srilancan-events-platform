"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL_GENRES = "__all__"

export function GenreFilter({ genres }: { genres: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === ALL_GENRES) {
      params.delete("genre")
    } else {
      params.set("genre", value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={searchParams.get("genre") ?? ALL_GENRES} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_GENRES}>All genres</SelectItem>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
