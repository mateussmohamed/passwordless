import { getCsrfToken } from 'next-auth/react'
import SigninForm from './components/signin-form'

export default async function AuthSignInPage() {
  const csrfToken = String(await getCsrfToken())

  return <SigninForm csrfToken={csrfToken} />
}
