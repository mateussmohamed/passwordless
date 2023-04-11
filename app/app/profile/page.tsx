import type { Metadata } from 'next'

import { getSession } from '~/lib/get-session'

import ProfileForm from './components/profile-fom'
import ProfilePicture from './components/profile-picture'

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function ProfilePage() {
  const session = await getSession()

  if (!session?.user?.email) return null

  const user = {
    email: session?.user?.email,
    name: session?.user?.name,
    image: session?.user?.image
  }

  return (
    <div className="px-12 md:grid md:grid-cols-3 md:gap-6">
      <ProfileForm user={user} />
      <ProfilePicture user={user} />
    </div>
  )
}
