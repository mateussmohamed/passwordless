import Link from 'next/link'

type HeroLinkProps = { href: string; children: React.ReactNode }

function HeroLink({ href, children }: HeroLinkProps) {
  return (
    <a
      className="bg-transparent font-medium text-indigo-900 underline-offset-4 transition-colors hover:bg-transparent hover:underline"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export function LandingHero() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative lg:w-full lg:max-w-2xl">
        <main className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-indigo-600 xl:inline">
                Passwordless
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Passwordless is a mock application to exemplify how{' '}
              <HeroLink href="https://next-auth.js.org/">NextAuth.js</HeroLink>{' '}
              work with SSO providers and a passwordless approach. Built-in with{' '}
              <HeroLink href="https://next.js.org/">Next.js</HeroLink>,{' '}
              <HeroLink href="https://tailwindcss.com">tailwindcss</HeroLink>,{' '}
              <HeroLink href="https://www.prisma.io">Prisma</HeroLink>,{' '}
              <HeroLink href="https://joi.dev">Joi</HeroLink>,{' '}
              <HeroLink href="https://supabase.com">Supabase</HeroLink>.
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
