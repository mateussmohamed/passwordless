// import { getCsrfToken } from 'next-auth/react'
import SigninForm from './components/signin-form'

export default async function AuthSignInPage() {
  // const csrfToken = String(await getCsrfToken())
  // console.log("🚀 ~ file: page.tsx ~ line 6 ~ AuthSignInPage ~ csrfToken", csrfToken)

  return <SigninForm csrfToken={'3213213'} />
}
