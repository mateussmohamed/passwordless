import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Logo } from '~/ui/logo'

export function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto grid h-3/4 min-h-screen w-full rounded-md bg-white lg:grid-cols-2">
      <div className="hidden flex-col justify-center bg-indigo-600 lg:flex"></div>
      <div className="flex flex-col justify-center bg-gray-100">
        <div className="xs:p-0 mx-auto rounded-md  bg-white p-10 shadow md:w-full md:max-w-md">
          <h1 className="mb-5 text-center text-2xl font-bold">
            <Logo width={128} height={128} href="/" />
          </h1>

          {children}

          <div className="grid grid-cols-1 gap-1">
            <div className="w-full whitespace-nowrap text-center">
              <Link
                href="/"
                className="mx-5 ml-1 inline-flex cursor-pointer items-center gap-1 rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                <ArrowLeft size={18} />
                Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
