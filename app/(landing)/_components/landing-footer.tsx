import { Github, Linkedin, Twitter } from 'lucide-react'

import { cn } from '~/lib/utils'

type LandingFooterLinkProps = {
  className?: string
  href: string
  children: React.ReactNode
}

function LandingFooterLink({
  href,
  children,
  className
}: LandingFooterLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'text-gray-300 transition-colors duration-200 hover:text-gray-500 dark:hover:text-white',
        className
      )}
    >
      {children}
    </a>
  )
}

export function LandingFooter() {
  return (
    <footer className="fixed bottom-0 w-full bg-indigo-700 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="mx-auto flex max-w-xs items-center justify-center gap-4 py-4">
          <LandingFooterLink href="https://twitter.com/mateussmohamed">
            <Twitter />
          </LandingFooterLink>
          <LandingFooterLink href="https://github.com/mateussmohamed">
            <Github />
          </LandingFooterLink>
          <LandingFooterLink href="https://www.linkedin.com/in/mateussantana">
            <Linkedin />
          </LandingFooterLink>
        </div>

        <div className="flex items-center justify-center text-center font-light text-gray-200 dark:text-gray-200">
          Created with&nbsp;<span aria-label="hear">❤️</span>&nbsp;by&nbsp;
          <LandingFooterLink
            className="font-medium underline underline-offset-4"
            href="https://www.linkedin.com/in/mateussantana"
          >
            @mateussmohamed
          </LandingFooterLink>
          &nbsp; | Hosted on&nbsp;
          <LandingFooterLink
            href="https://vercel.com"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </LandingFooterLink>
        </div>
      </div>
    </footer>
  )
}
