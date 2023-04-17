import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  href?: '/' | '/app/dashboard' | '#'
  width?: number
  height?: number
}

export function Logo({ href = '/', width = 48, height = 48 }: LogoProps) {
  return (
    <Link href={href}>
      <span className="sr-only">Passwordless</span>
      <Image
        className="mx-auto"
        src="/logo.svg"
        alt="Logo"
        width={width}
        height={height}
      />
    </Link>
  )
}
