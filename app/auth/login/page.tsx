import type { Metadata } from 'next'
import Link from 'next/link'
// import { getCsrfToken } from 'next-auth/react'
import { Logo } from 'ui/logo'

import { IS_PREVIEW } from '~/lib/env'

import { LoginEmail } from './_components/login-email'
import { LoginPreview } from './_components/login-preview'
import { LoginProvider } from './_components/login-provider'

export const metadata: Metadata = {
  title: 'Login'
}

export default async function AuthLoginPage() {
  // const csrfToken = String(await getCsrfToken())

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 sm:py-12">
      <div className="xs:p-0 mx-auto rounded-md  bg-white p-10 shadow md:w-full md:max-w-md">
        <h1 className="mb-5 text-center text-2xl font-bold">
          <Logo width={128} height={128} href="/app/dashboard" />
        </h1>

        <LoginProvider />

        {/* <LoginEmail csrfToken={csrfToken} /> */}

        {IS_PREVIEW ? <LoginPreview /> : null}

        <div className="pt-5">
          <div className="grid grid-cols-1 gap-1">
            <div className="w-full whitespace-nowrap text-center">
              <button className="mx-5 cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block h-4 w-4 align-text-top"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <Link href="/" className="ml-1 inline-block">
                  Back to site
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
