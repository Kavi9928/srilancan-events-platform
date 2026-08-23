"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ALL_STATUSES = "__all__"

const statusOptions = [
  { value: "NOW_SHOWING", label: "Now Showing" },
  { value: "COMING_SOON", label: "Coming Soon" },
]

export function StatusFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === ALL_STATUSES) {
      params.delete("status")
    } else {
      params.set("status", value)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select value={searchParams.get("status") ?? ALL_STATUSES} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Status">
          {(value: string) =>
            value === ALL_STATUSES
              ? "All statuses"
              : statusOptions.find((option) => option.value === value)?.label
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_STATUSES}>All statuses</SelectItem>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
