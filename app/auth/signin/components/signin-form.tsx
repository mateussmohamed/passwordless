'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { APP_URL } from '~/lib/env'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

const callbackUrl = `${APP_URL}/dashboard`

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type SignInProps = {
  csrfToken: string
}

export default function SigninForm({ csrfToken }: SignInProps) {
  const [loading, setLoading] = useState(false)
  console.log('🚀 ~ file: signin-form.tsx:22 ~ SigninForm ~ loading', loading)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    }
  })

  const onSignInEmail = async ({ email }: { email: string }) => {
    try {
      setLoading(true)
      // await signIn('email', { email, callbackUrl })
    } catch (error) {
      console.log('🚀 ~ file: signin.tsx ~ line 24 ~ handleSignInEmail ~ error', error)
    } finally {
      setLoading(false)
    }
  }

  const onProviderSignIn = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.log('🚀 ~ file: signin-form.tsx:51 ~ onProviderSignIn ~ error', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          <Image className="mx-auto" src="/logo.svg" alt="Logo" width="128" height="128" />
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          {/* <div className="px-5 py-7">
            <form onSubmit={handleSubmit(onSignInEmail)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <div className="col-span-6 sm:col-span-3">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input
                  type="text"
                  id="email"
                  disabled={loading}
                  className="border rounded-lg p-4 mt-1 mb-1 text-sm w-full"
                  {...register('email', {
                    required: 'E-mail is required',
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: 'Invalid e-mail.'
                    }
                  })}
                />
                {errors.email && <span className="text-red-700 text-xs">{errors.email.message}</span>}
              </div>

              {loading ? (
                <button
                  disabled
                  className="transition duration-200 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold inline-flex justify-center cursor-wait mt-2"
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
                  disabled={!isDirty}
                  className={`${
                    !isDirty && 'opacity-50 cursor-not-allowed'
                  } transition duration-200 bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-white w-full p-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-2`}
                >
                  <span className="inline-block mr-2">Sign in</span>
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
          </div> */}

          <div className="p-5">
            <div className="grid grid-cols-1 gap-1">
              <button
                onClick={() => onProviderSignIn('github')}
                className="transition duration-200 flex justify-center items-center w-full p-4 my-2 text-black bg-white border-black rounded-lg shadow ripple waves-light hover:shadow-lg hover:bg-gray-100 focus:outline-none"
              >
                Continue with Github
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
                <Link href="/" className="inline-block ml-1">
                  Back to site
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
