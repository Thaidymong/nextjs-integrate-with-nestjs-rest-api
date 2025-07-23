import { getProfile } from "@/api/profile/actions"

export default async function ProfilePage() {
  const { data: userProfile, error } = await getProfile()
  console.log({ userProfile })

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
     profile page
    </div>
  )
}
