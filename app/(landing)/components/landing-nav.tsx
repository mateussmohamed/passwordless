'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type NavProps = {
  hasSession: boolean
}

type SigninButtonProps = NavProps

const SigninButton = ({ hasSession }: SigninButtonProps) =>
  hasSession ? (
    <Link
      href="/app/dashboard"
      className="font-medium text-indigo-600 hover:text-indigo-900"
    >
      Go to app
    </Link>
  ) : (
    <Link
      href="/auth/login"
      className="font-medium text-indigo-600 hover:text-indigo-900"
    >
      Signin
    </Link>
  )

export default function Nav({ hasSession }: NavProps) {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative z-10 bg-white lg:w-full lg:max-w-2xl">
        <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
              <div className="flex w-full items-center justify-between md:w-auto">
                <Link href="/">
                  <span className="sr-only">Workflow</span>
                  <Image
                    className="mx-auto"
                    src="/logo.svg"
                    alt="Logo"
                    width="48"
                    height="48"
                  />
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    onClick={() => setOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
              <Link
                href="/pricing"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
              {/* <a
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
              </a> */}

              <SigninButton hasSession={hasSession} />
            </div>
          </nav>
        </div>

        <div
          className={`${
            !isOpen && 'hidden'
          } absolute inset-x-0 top-0 origin-top-right transform py-2 transition md:hidden`}
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-4 pt-4">
              <div>
                <Image
                  className="mx-auto"
                  src="/logo.svg"
                  alt="Logo"
                  width="48"
                  height="48"
                />
              </div>
              <div className="-mr-2">
                <button
                  onClick={() => setOpen(!isOpen)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a
                href="https://nextjs.org"
                target="_blank"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                rel="noreferrer"
              >
                Next.js
              </a>

              <a
                href="https://next-auth.js.org"
                target="_blank"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                rel="noreferrer"
              >
                NextAuth.js
              </a>

              <a
                href="https://reactjs.org"
                target="_blank"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                rel="noreferrer"
              >
                React.js
              </a>

              <a
                href="https://tailwindcss.com"
                target="_blank"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                rel="noreferrer"
              >
                Tailwindcss
              </a>
            </div>

            <div className="block rounded-md px-5 pb-2">
              <SigninButton hasSession={hasSession} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
