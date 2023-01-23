'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

import { APP_URL } from '~/lib/env'
import UserAvatar from '~/ui/user-avatar'

type AppLinkProps = {
  children: React.ReactNode
  href: string
}

function AppLink({ children, href }: AppLinkProps) {
  const pathname = usePathname()

  const className =
    pathname === href
      ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  )
}

type DashboardNavProps = {
  user: {
    id?: string
  } & UserSessionProps
}

export default function DashboardNav({ user }: DashboardNavProps) {
  const [isOpenMainMenu, setOpenMainMenu] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: APP_URL })
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image
                className="mx-auto"
                src="/logo.svg"
                alt="Logo"
                width="48"
                height="48"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <AppLink href="/dashboard">Dashboard</AppLink>
                <AppLink href="/dashboard/team">Team</AppLink>
                <AppLink href="/dashboard/projects">Projects</AppLink>
                <AppLink href="/dashboard/calendar">Calendar</AppLink>
                <AppLink href="/dashboard/reports">Reports</AppLink>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-base font-normal leading-none text-white">
                {user.name}
              </div>
              <div className="relative ml-3">
                <div>
                  <button
                    onClick={() => setOpenMainMenu(!isOpenMainMenu)}
                    type="button"
                    className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserAvatar src={user.image} size="small" />
                  </button>
                </div>

                <div
                  className={`transform transition duration-100 ease-in-out ${
                    !isOpenMainMenu
                      ? 'scale-95 opacity-0'
                      : 'scale-100 opacity-100 ease-in'
                  } absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <a
                    onClick={handleSignOut}
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setOpenMainMenu((prev) => !prev)}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <AppLink href="/dashboard">Dashboard</AppLink>
          <AppLink href="/dashboard/team">Team</AppLink>
          <AppLink href="/dashboard/projects">Projects</AppLink>
          <AppLink href="/dashboard/calendar">Calendar</AppLink>
          <AppLink href="/dashboard/reports">Reports</AppLink>
        </div>

        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <UserAvatar src={user.image} />
            </div>
            <div className="ml-3">
              <div className="text-base font-normal leading-none text-white">
                {user.name}
              </div>
              <div className="text-sm font-normal leading-none text-gray-400">
                {user.email}
              </div>
            </div>
          </div>

          <div
            className={`mt-3 transform space-y-1 px-2 transition duration-100 ease-in-out ${
              !isOpenMainMenu
                ? 'hidden scale-95 opacity-0'
                : 'block scale-100 opacity-100 ease-in'
            }`}
          >
            <Link
              href="/dashboard/profile"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Profile
            </Link>
            <a
              onClick={handleSignOut}
              className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
