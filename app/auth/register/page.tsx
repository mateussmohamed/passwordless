import type { Metadata } from 'next'
import { getCsrfToken } from 'next-auth/react'

import { AuthContainer } from '../_components/auth-container'
import { RegisterForm } from './_components/register-form'

export const metadata: Metadata = {
  title: 'Register'
}

export default async function RegisterPage() {
  const csrfToken = String(await getCsrfToken())

  return (
    <AuthContainer>
      <RegisterForm csrfToken={csrfToken} />
    </AuthContainer>
  )
}
