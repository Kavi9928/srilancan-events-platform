import { TeamMemberForm } from "@/components/admin/team-member-form"
import { createTeamMemberAction } from "@/app/admin/team/actions"

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Add team member</h1>
      <TeamMemberForm action={createTeamMemberAction} />
    </div>
  )
}
