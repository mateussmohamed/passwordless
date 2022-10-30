import { ReactNode } from 'react'
// import { signOut } from 'next-auth/react'

import DashboardNav from './components/dashboard-nav'

type DashboardLayoutProps = {
  children?: ReactNode
  pageTitle?: string
} & ProtectedPageProps

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="relative bg-white overflow-hidden">
      <DashboardNav
        user={{
          id: '12312312312',
          email: 'mateuss.dev@gmail.com',
          name: 'Mateus Santana',
          image: ''
        }}
      />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-2 border-solid border-gray-200 rounded-lg py-12">{children}</div>
        </div>
      </div>
    </div>
  )
}
