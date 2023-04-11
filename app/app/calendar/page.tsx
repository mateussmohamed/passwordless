import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calendar'
}
export default function CalendarPage() {
  return (
    <h2 className="text-center text-3xl font-extrabold text-gray-900">
      Calendar
    </h2>
  )
}
