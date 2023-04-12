import type { Metadata } from 'next'

import { getCurrentUser } from '~/lib/get-session'

import { AppNav } from './_components/app-nav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'App',
    template: 'Passwordless | App | %s'
  }
}

export default async function DashboardLayout({
  children
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="relative overflow-hidden bg-white">
      <AppNav user={user} />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
