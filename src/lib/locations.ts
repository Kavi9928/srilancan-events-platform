import { prisma } from "@/lib/prisma"
import type { Location } from "@/lib/types"
import type { Location as PrismaLocation } from "@/generated/prisma/client"

function serializeLocation(location: PrismaLocation): Location {
  return {
    ...location,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString(),
  }
}

export async function listLocations(): Promise<Location[]> {
  const locations = await prisma.location.findMany({ orderBy: { createdAt: "asc" } })
  return locations.map(serializeLocation)
}

export async function getLocation(id: string): Promise<Location | null> {
  const location = await prisma.location.findUnique({ where: { id } })
  return location ? serializeLocation(location) : null
}

export async function createLocationRecord(data: {
  name: string
  icon: string
}): Promise<Location> {
  const location = await prisma.location.create({ data })
  return serializeLocation(location)
}

export async function updateLocationRecord(
  id: string,
  data: { name: string; icon: string }
): Promise<Location> {
  const location = await prisma.location.update({ where: { id }, data })
  return serializeLocation(location)
}

export async function deleteLocationRecord(id: string): Promise<void> {
  await prisma.movie.updateMany({ where: { locationId: id }, data: { locationId: null } })
  await prisma.location.delete({ where: { id } })
}
