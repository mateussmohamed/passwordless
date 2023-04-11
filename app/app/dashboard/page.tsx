import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard'
}

export default function DashboardPage() {
  return (
    <h2 className="text-center text-3xl font-extrabold text-gray-900">
      Dashboard
    </h2>
  )
}
