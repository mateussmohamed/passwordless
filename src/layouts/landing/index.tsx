import { ReactNode } from 'react'

import { LandingNav, LandingFooter } from 'ui/landing'

type LandingLayoutProps = {
  children: ReactNode
}

function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      <LandingNav />

      {children}

      <LandingFooter />
    </div>
  )
}

export default LandingLayout
