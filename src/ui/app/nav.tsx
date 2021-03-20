import { useState } from 'react'
import { useRouter } from 'next/router'
import { SyntheticEvent } from 'react'
import Link from 'next/link'

type AppLinkProps = {
  children: React.ReactNode
  href: string
}

function AppLink({ children, href }: AppLinkProps) {
  const router = useRouter()
  const className =
    router.pathname === href
      ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'

  const handleClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

type AppNav = {
  handleSignOut: (e: SyntheticEvent<HTMLAnchorElement>) => void
}

function AppNav({ handleSignOut }: AppNav) {
  const [isOpenMainMenu, setOpenMainMenu] = useState(false)

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
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
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
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
                  <Link href="/app/profile">
                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Profile
                    </a>
                  </Link>
                  <a
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => {
                setOpenMainMenu(!isOpenMainMenu)
              }}
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
          <AppLink href="/app/dashboard">Dashboard</AppLink>
          <AppLink href="/app/team">Team</AppLink>
          <AppLink href="/app/projects">Projects</AppLink>
          <AppLink href="/app/calendar">Calendar</AppLink>
          <AppLink href="/app/reports">Reports</AppLink>
        </div>

        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">Tom Cook</div>
              <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
            </div>
          </div>

          <div
            className={`transition transform ease-in-out duration-100 ${
              !isOpenMainMenu ? 'opacity-0 scale-95' : 'ease-in opacity-100 scale-100'
            } mt-3 px-2 space-y-1`}
          >
            <Link href="/app/profile">
              <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                Profile
              </a>
            </Link>
            <a
              onClick={handleSignOut}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppNav
