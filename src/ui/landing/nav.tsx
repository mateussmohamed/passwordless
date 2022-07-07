// import { signIn, signOut, useSession } from 'next-auth/client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Header() {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 bg-white lg:max-w-2xl lg:w-full">
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="#">
                  <span className="sr-only">Workflow</span>
                  <Image className="mx-auto" src="/logo.svg" alt="Logo" width="48px" height="48px" />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    onClick={() => setOpen(!isOpen)}
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <a
                href="https://nextjs.org/"
                target="_blank"
                className="font-medium text-gray-500 hover:text-gray-900"
                rel="noreferrer"
              >
                Next.js
              </a>

              <a
                href="https://next-auth.js.org"
                target="_blank"
                className="font-medium text-gray-500 hover:text-gray-900"
                rel="noreferrer"
              >
                NextAuth.js
              </a>

              <a
                href="https://reactjs.org"
                target="_blank"
                className="font-medium text-gray-500 hover:text-gray-900"
                rel="noreferrer"
              >
                React.js
              </a>

              <a
                href="https://tailwindcss.com"
                target="_blank"
                className="font-medium text-gray-500 hover:text-gray-900"
                rel="noreferrer"
              >
                Tailwindcss
              </a>

              <Link href="/auth/signin">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a>
              </Link>
            </div>
          </nav>
        </div>

        <div
          className={`${
            !isOpen && 'hidden'
          } absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden`}
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <Image className="mx-auto" src="/logo.svg" alt="Logo" width="48px" height="48px" />
              </div>
              <div className="-mr-2">
                <button
                  onClick={() => setOpen(!isOpen)}
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close main menu</span>
                  <svg
                    className="h-6 w-6"
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="https://nextjs.org"
                target="_blank"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                rel="noreferrer"
              >
                Next.js
              </a>

              <a
                href="https://next-auth.js.org"
                target="_blank"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                rel="noreferrer"
              >
                NextAuth.js
              </a>

              <a
                href="https://reactjs.org"
                target="_blank"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                rel="noreferrer"
              >
                React.js
              </a>

              <a
                href="https://tailwindcss.com"
                target="_blank"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                rel="noreferrer"
              >
                Tailwindcss
              </a>
            </div>

            <Link href="/auth/signin">
              <a className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
                Log in
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
