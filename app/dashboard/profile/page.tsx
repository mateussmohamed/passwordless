import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

import ProfileForm from './components/profile-fom'
// import ProfilePicture from './components/profile-picture'

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions)) as SessionProps

  const user = {
    id: String(session?.user?.id),
    email: String(session?.user?.email),
    name: String(session?.user?.name),
    image: String(session?.user?.image)
  }

  return (
    <div className="px-12 md:grid md:grid-cols-3 md:gap-6">
      <ProfileForm user={user} />
      {/* <ProfilePicture user={user} /> */}
    </div>
  )
}
