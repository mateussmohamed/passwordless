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
    <div className="relative overflow-hidden bg-white">
      <LandingHeader hasSession={Boolean(user?.email)} />
      <div className="py-24 sm:py-32">{children}</div>
      <LandingFooter />
    </div>
  )
}
