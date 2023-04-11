import { getServerSession } from 'next-auth/next'

import { authOptions } from './auth'

export async function getSession() {
  return (await getServerSession(authOptions)) as SessionProps
}

export async function getCurrentUser() {
  const session = await getSession()

  return session?.user
}
