import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects'
}

export default function ProjectsPage() {
  return (
    <h2 className="text-center text-3xl font-extrabold text-gray-900">
      Projects
    </h2>
  )
}
