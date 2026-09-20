import { prisma } from "@/lib/prisma"
import type { TeamMember } from "@/lib/types"
import type { TeamMember as PrismaTeamMember } from "@/generated/prisma/client"

function serializeTeamMember(member: PrismaTeamMember): TeamMember {
  return {
    ...member,
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  }
}

/** Ordered by the sort value admins set, then oldest first as a stable tiebreak. */
export async function listTeamMembers(): Promise<TeamMember[]> {
  const members = await prisma.teamMember.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  })
  return members.map(serializeTeamMember)
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const member = await prisma.teamMember.findUnique({ where: { id } })
  return member ? serializeTeamMember(member) : null
}

export async function createTeamMemberRecord(data: {
  name: string
  role: string | null
  imageUrl: string
  bio: string | null
  sortOrder: number
}): Promise<void> {
  await prisma.teamMember.create({ data })
}

export async function updateTeamMemberRecord(
  id: string,
  data: {
    name: string
    role: string | null
    imageUrl: string
    bio: string | null
    sortOrder: number
  }
): Promise<void> {
  await prisma.teamMember.update({ where: { id }, data })
}

export async function deleteTeamMemberRecord(id: string): Promise<void> {
  await prisma.teamMember.delete({ where: { id } })
}

/** Clears the whole team. Returns how many rows were removed. */
export async function deleteAllTeamMemberRecords(): Promise<number> {
  const { count } = await prisma.teamMember.deleteMany({})
  return count
}
