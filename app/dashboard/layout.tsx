import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'

import DashboardNav from './components/dashboard-nav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const session = await unstable_getServerSession(authOptions)

  return (
    <div className="relative overflow-hidden bg-white">
      <DashboardNav
        user={{
          email: String(session?.user?.email),
          name: String(session?.user?.name),
          image: String(session?.user?.image)
        }}
      />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg border-2 border-solid border-gray-200 py-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
