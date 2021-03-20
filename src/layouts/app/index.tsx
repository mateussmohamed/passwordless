import { ReactNode, SyntheticEvent } from 'react'
import { signOut } from 'next-auth/client'

import { AppNav, AppHeader, AppContent } from 'ui/app'

type AppLayoutProps = {
  children?: ReactNode
  pageTitle?: string
}

function AppLayout({ children, pageTitle }: AppLayoutProps) {
  const handleSignOut = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    signOut()
  }

  return (
    <div className="relative bg-white overflow-hidden">
      <AppNav handleSignOut={handleSignOut} />

      <AppHeader pageTitle={pageTitle} />

      <AppContent>{children}</AppContent>
    </div>
  )
}

export default AppLayout
