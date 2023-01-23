import Image from 'next/image'
import Link from 'next/link'

export default function AuthVerifyRequestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h1 className="mb-5 text-center text-2xl font-bold">
            <Image
              className="mx-auto"
              src="/logo.svg"
              alt="Logo"
              width="128"
              height="128"
            />
          </h1>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Check your email
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A sign in link has been sent to your email address.
          </p>

          <div className="mt-10 w-full whitespace-nowrap text-center">
            <Link
              href="/"
              className="mx-5 inline-block cursor-pointer rounded-lg px-5 py-4 text-sm font-normal text-gray-500 ring-inset transition duration-200 hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
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

              <span className="ml-1 inline-block">Back to site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
