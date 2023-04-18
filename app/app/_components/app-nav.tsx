'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { Logo } from 'ui/logo'
import { UserAvatar } from 'ui/user-avatar'

import { env } from '~/lib/env'

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

type AppNavProps = {
  user: UserSessionProps
}

export function AppNav({ user }: AppNavProps) {
  const [isOpenMainMenu, setOpenMainMenu] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: env.APP_URL })
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo href="/app/dashboard" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <AppLink href="/app/dashboard">Dashboard</AppLink>
                <AppLink href="/app/team">Team</AppLink>
                <AppLink href="/app/projects">Projects</AppLink>
                <AppLink href="/app/calendar">Calendar</AppLink>
                <AppLink href="/app/reports">Reports</AppLink>
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
                    onClick={() => setOpenMainMenu((prev) => !prev)}
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
                    href="/app/profile"
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

              {isOpenMainMenu ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <AppLink href="/app/dashboard">Dashboard</AppLink>
          <AppLink href="/app/team">Team</AppLink>
          <AppLink href="/app/projects">Projects</AppLink>
          <AppLink href="/app/calendar">Calendar</AppLink>
          <AppLink href="/app/reports">Reports</AppLink>
        </div>

        <div className="border-t border-gray-700 pb-3 pt-4">
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
              href="/app/profile"
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
