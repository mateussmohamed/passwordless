'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

import UserAvatar from '~/ui/user-avatar'

import { APP_URL } from '~/lib/env'

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image className="mx-auto" src="/logo.svg" alt="Logo" width="48" height="48" />
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
              <div className="text-base font-normal leading-none text-white">{user.name}</div>
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setOpenMainMenu(!isOpenMainMenu)}
                    type="button"
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserAvatar src={user.image} size="small" />
                  </button>
                </div>

                <div
                  className={`transition transform ease-in-out duration-100 ${
                    !isOpenMainMenu ? 'opacity-0 scale-95' : 'ease-in opacity-100 scale-100'
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
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
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <AppLink href="/dashboard">Dashboard</AppLink>
          <AppLink href="/dashboard/team">Team</AppLink>
          <AppLink href="/dashboard/projects">Projects</AppLink>
          <AppLink href="/dashboard/calendar">Calendar</AppLink>
          <AppLink href="/dashboard/reports">Reports</AppLink>
        </div>

        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <UserAvatar src={user.image} />
            </div>
            <div className="ml-3">
              <div className="text-base font-normal leading-none text-white">{user.name}</div>
              <div className="text-sm font-normal leading-none text-gray-400">{user.email}</div>
            </div>
          </div>

          <div
            className={`mt-3 px-2 space-y-1 transition transform ease-in-out duration-100 ${
              !isOpenMainMenu ? 'hidden opacity-0 scale-95' : 'block ease-in opacity-100 scale-100'
            }`}
          >
            <Link
              href="/dashboard/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Profile
            </Link>
            <a
              onClick={handleSignOut}
              className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
