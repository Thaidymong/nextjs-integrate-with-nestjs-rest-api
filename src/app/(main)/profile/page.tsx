import { getProfile } from "@/api/profile/actions"
import { ProfileScreen } from "@/app/features/main/profile"

export default async function ProfilePage() {
  const { data: userProfile, error } = await getProfile()

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
     error
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
      error
      </div>
    )
  }

  return (
    <ProfileScreen data={userProfile} />
  )
}
