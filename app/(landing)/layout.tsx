import type { Metadata } from 'next'

import { getCurrentUser } from '~/lib/get-session'

import { LandingFooter } from './_components/landing-footer'
import { LandingHeader } from './_components/landing-header'

export const metadata: Metadata = {
  title: 'Home'
}

interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="relative flex min-h-screen flex-col justify-between bg-white">
      <LandingHeader hasSession={Boolean(user?.email)} />
      <main>{children}</main>
      <LandingFooter />
    </div>
  )
}
