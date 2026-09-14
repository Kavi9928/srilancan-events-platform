import { notFound } from "next/navigation"

import { LocationForm } from "@/components/admin/location-form"
import { getLocation } from "@/lib/locations"
import { updateLocationAction } from "@/app/admin/locations/actions"

type EditLocationPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditLocationPage({ params }: EditLocationPageProps) {
  const { id } = await params
  const location = await getLocation(id)

  if (!location) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit location</h1>
      <LocationForm location={location} action={updateLocationAction.bind(null, id)} />
    </div>
  )
}
