import type { Metadata } from 'next'

import { getCurrentUser } from '~/lib/get-session'

import { ProfileForm } from './_components/profile-fom'
import { ProfilePicture } from './_components/profile-picture'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user?.email) return null

  return (
    <div className="px-12 md:grid md:grid-cols-3 md:gap-6">
      <ProfileForm user={user} />
      <ProfilePicture user={user} />
    </div>
  )
}
