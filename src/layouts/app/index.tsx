import { ReactNode, SyntheticEvent } from 'react'
import { signOut } from 'next-auth/client'

import { AppNav, AppHeader, AppContent } from 'ui/app'

type AppLayoutProps = {
  children?: ReactNode
  pageTitle?: string
} & ProtectedPageProps

function AppLayout({ children, pageTitle, session }: AppLayoutProps) {
  const handleSignOut = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    signOut()
  }

  return (
    <main className="relative bg-white overflow-hidden">
      <AppNav handleSignOut={handleSignOut} user={session.user} />

      <AppHeader pageTitle={pageTitle} />

      <AppContent>{children}</AppContent>
    </main>
  )
}

export default AppLayout
