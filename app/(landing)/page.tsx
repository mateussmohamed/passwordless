import Link from 'next/link'

export default function IndexPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative bg-white lg:w-full lg:max-w-2xl">
        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-indigo-600 xl:inline">
                Passwordless
              </span>
              {/* <span className="block text-indigo-600 xl:inline">
                NextAuth.js
              </span> */}
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Passwordless is a mock application to exemplify how{' '}
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://next-auth.js.org/"
                target="_blank"
                rel="noreferrer"
              >
                NextAuth.js
              </a>{' '}
              work with SSO providers and a passwordless approach. Built-in with{' '}
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
              >
                Next.js
              </a>
              ,{' '}
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
              >
                tailwindcss
              </a>
              ,{' '}
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://www.prisma.io"
                target="_blank"
                rel="noreferrer"
              >
                Prisma
              </a>
              ,{' '}
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://joi.dev"
                target="_blank"
                rel="noreferrer"
              >
                Joi,{' '}
              </a>
              <a
                className="bg-transparent font-medium text-indigo-900 underline-offset-4 hover:bg-transparent hover:underline"
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
              >
                Supabase
              </a>
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
