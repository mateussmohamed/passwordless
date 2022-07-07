import { ReactNode } from 'react'
import { signOut } from 'next-auth/react'

import { AppNav, AppHeader, AppContent } from 'ui/app'

type AppLayoutProps = {
  children?: ReactNode
  pageTitle?: string
} & ProtectedPageProps

function AppLayout({ children, pageTitle, session }: AppLayoutProps) {
  const handleSignOut = () => {
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
