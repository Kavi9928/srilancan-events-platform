import { LocationForm } from "@/components/admin/location-form"
import { createLocationAction } from "@/app/admin/locations/actions"

export default function NewLocationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add location</h1>
      <LocationForm action={createLocationAction} />
    </div>
  )
}
