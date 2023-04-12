import { FileEdit, FileLineChart, Folders, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About'
}

const features = [
  {
    name: 'Projects',
    description:
      'Create custom project templates, assign tasks to team members, set due dates, and track progress with ease.',
    icon: Folders
  },
  {
    name: 'Tasks',
    description:
      'Tasks can be assigned to team members with due dates and reminders, ensuring that everyone is on the same page and working towards the same goals.',
    icon: FileEdit
  },
  {
    name: 'Team',
    description:
      'Team performance can be tracked and analyzed through various reporting tools, allowing for continuous improvement and optimization of team workflows.',
    icon: Users
  },
  {
    name: 'Leads',
    description:
      'Our intuitive interface makes it easy to track and nurture leads through the entire sales funnel.',
    icon: FileLineChart
  }
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">
          CRM faster
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to grow you sales
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Create custom project templates, assign tasks to team members, set due
          dates, and track progress with ease. Our intuitive interface makes it
          easy to see what needs to be done, who&apos;s responsible, and when
          it&apos;s due. Plus, with powerful reporting tools, you can track team
          performance, identify bottlenecks, and optimize your workflows for
          maximum efficiency.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
