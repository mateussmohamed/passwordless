import type { Metadata } from 'next'
import { getCsrfToken } from 'next-auth/react'

import { AuthContainer } from '../_components/auth-container'
import { LoginEmail } from './_components/login-email'
import { LoginProviders } from './_components/login-providers'

export const metadata: Metadata = {
  title: 'Login'
}

export default async function AuthLoginPage() {
  const csrfToken = String(await getCsrfToken())

  return (
    <AuthContainer>
      <LoginProviders />
      <LoginEmail csrfToken={csrfToken} />
    </AuthContainer>
  )
}
