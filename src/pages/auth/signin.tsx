import React, { SyntheticEvent, useState } from 'react'
import { NextPageContext } from 'next'
import Image from 'next/image'
import { getCsrfToken, signIn } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import { APP_URL } from 'env'

type SignInProps = {
  csrfToken: string
}
const callbackUrl = `${APP_URL}/app/dashboard`

function AuthSignInPage({ csrfToken }: SignInProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignInEmail = async (e: SyntheticEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      await signIn('email', { email, callbackUrl })
    } catch (error) {
      console.log('🚀 ~ file: signin.tsx ~ line 24 ~ handleSignInEmail ~ error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <Image className="mx-auto" src="/logo.svg" alt="Logo" width="128px" height="128px" />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <form onSubmit={handleSignInEmail}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

              <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                onChange={handleEmail}
              />
              {loading ? (
                <button
                  disabled
                  className="transition duration-200 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold inline-flex justify-center cursor-wait"
                >
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!email}
                  className="transition duration-200 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Signin</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => signIn('github', { callbackUrl })}
                className="transition duration-200 flex justify-center items-center w-full p-4 my-2 text-black bg-white border-black rounded shadow ripple waves-light hover:shadow-lg hover:bg-gray-300 focus:outline-none"
              >
                <FontAwesomeIcon size="lg" icon={['fab', 'github']} />
                &nbsp; Continue with Github
              </button>

              <button
                onClick={() => signIn('google', { callbackUrl })}
                className="transition duration-200 flex justify-center items-center w-full p-4 my-2 text-black bg-white border-black rounded shadow ripple waves-light hover:shadow-lg hover:bg-gray-300 focus:outline-none"
              >
                <FontAwesomeIcon size="lg" icon={['fab', 'google']} />
                &nbsp; Continue with Google
              </button>
            </div>
          </div>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-1 gap-1">
            <div className="text-center w-full whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block align-text-top"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <Link href="/">
                  <a className="inline-block ml-1">Back to home</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }: NextPageContext) {
  const csrfToken = await getCsrfToken({ req })
  return {
    props: {
      csrfToken
    }
  }
}

export default AuthSignInPage
