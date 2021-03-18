import { ReactNode } from 'react'

import { AppNav, AppHeader, AppContent } from 'ui/app'

type AppLayoutProps = {
  children?: ReactNode
  pageTitle?: string
}

function AppLayout({ children, pageTitle }: AppLayoutProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      <AppNav />

      <AppHeader pageTitle={pageTitle} />

      <AppContent>{children}</AppContent>
    </div>
  )
}

export default AppLayout
