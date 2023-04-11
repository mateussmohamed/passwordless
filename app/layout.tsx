import './globals.css'

import type { Metadata } from 'next'

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
    <html className="min-h-screen">
      <body>{children}</body>
    </html>
  )
}
