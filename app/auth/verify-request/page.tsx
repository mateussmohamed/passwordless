import Link from 'next/link'
import Image from 'next/image'

export default function AuthVerifyRequestPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h1 className="font-bold text-center text-2xl mb-5">
            <Image className="mx-auto" src="/logo.svg" alt="Logo" width="128" height="128" />
          </h1>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Check your email
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A sign in link has been sent to your email address.
          </p>

          <div className="text-center w-full whitespace-nowrap mt-10">
            <Link
              href="/"
              className="inline-block transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block align-text-top"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>

              <span className="inline-block ml-1">Back to site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
