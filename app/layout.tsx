import './globals.css'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className="min-h-screen">
      <body>{children}</body>
    </html>
  )
}
