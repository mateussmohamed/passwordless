'use client'

import { signIn } from 'next-auth/react'

import { APP_URL } from '~/lib/env'

const callbackUrl = `${APP_URL}/dashboard`

export function LoginPreview() {
  const onProviderLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.error('onProviderLogin ~ error', error)
    }
  }

  return (
    <div className="w-full">
      <div className="p-5">
        <div className="grid grid-cols-1 gap-1">
          <button
            onClick={() => onProviderLogin('credentials')}
            className="ripple waves-light my-2 flex w-full items-center justify-center rounded-lg border-black bg-red-600 p-4 text-white shadow transition duration-200 hover:bg-red-500 hover:shadow-lg focus:outline-none"
          >
            Preview Login
          </button>
        </div>
      </div>
    </div>
  )
}
