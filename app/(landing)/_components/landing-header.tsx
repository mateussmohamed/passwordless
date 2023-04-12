'use client'

import { cva } from 'class-variance-authority'
import { Logo } from 'ui/logo'
import { LogIn, Menu, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '~/lib/utils'

export function LandingHeader({ hasSession }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={32} />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <LandingHeaderLink href="/about">About</LandingHeaderLink>
          <LandingHeaderLink href="/pricing">Pricing</LandingHeaderLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SigninButton hasSession={hasSession} />
        </div>
      </nav>

      <LandingHeaderNavMobile
        hasSession={hasSession}
        open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      />
    </header>
  )
}

// Helpers components
type LandingHeaderLinkProps = {
  className?: string
  href: string
  children: React.ReactNode
}

function LandingHeaderLink({
  href,
  children,
  className
}: LandingHeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn('text-sm font-semibold leading-6 text-gray-900', className)}
    >
      {children}
    </Link>
  )
}

type LandingHeaderProps = {
  hasSession: boolean
}

type SigninButtonProps = LandingHeaderProps

const signinButtonVariants = cva('inline-flex items-center gap-2', {
  variants: {
    isLoggedIn: {
      true: 'font-medium text-indigo-600 hover:text-indigo-900',
      false: 'text-sm font-semibold leading-6 text-gray-900'
    }
  },
  defaultVariants: {
    isLoggedIn: false
  }
})

function SigninButton({ hasSession }: SigninButtonProps) {
  return (
    <Link
      href={hasSession ? '/app/dashboard' : '/auth/login'}
      className={cn(signinButtonVariants({ isLoggedIn: hasSession }))}
    >
      {hasSession ? 'Go to app' : 'Log in'}
      <span aria-hidden="true">
        <LogIn size={16} />
      </span>
    </Link>
  )
}

function LandingHeaderNavMobile({
  open,
  onClick,
  hasSession
}: {
  open: boolean
  onClick: () => void
  hasSession: boolean
}) {
  if (!open) return null

  return (
    <div className="lg:hidden" role="dialog" aria-modal="true">
      {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
      <div className="fixed inset-0 z-10"></div>
      <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <div className="-m-1.5 p-1.5">
            <Logo />
          </div>

          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={onClick}
          >
            <span className="sr-only">Close menu</span>
            <XIcon size={32} />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <LandingHeaderLink
                href="/about"
                className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-gray-50"
              >
                About
              </LandingHeaderLink>
              <LandingHeaderLink
                href="/pricing"
                className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 hover:bg-gray-50"
              >
                Pricing
              </LandingHeaderLink>
            </div>
            <div className="py-6">
              <SigninButton hasSession={hasSession} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
