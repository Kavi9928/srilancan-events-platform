import { notFound } from "next/navigation"

import { TeamMemberForm } from "@/components/admin/team-member-form"
import { getTeamMember } from "@/lib/team"
import { updateTeamMemberAction } from "@/app/admin/team/actions"

type EditTeamMemberPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditTeamMemberPage({ params }: EditTeamMemberPageProps) {
  const { id } = await params
  const member = await getTeamMember(id)

  if (!member) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Edit team member</h1>
      <TeamMemberForm member={member} action={updateTeamMemberAction.bind(null, id)} />
    </div>
  )
}
