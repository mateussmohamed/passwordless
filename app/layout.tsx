import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '~/ui/toaster'

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: '',
    template: 'Passwordless | %s'
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
