'use client'

import { signIn } from 'next-auth/react'

export function LoginProvider() {
  const onProviderLogin = async (provider: string) => {
    try {
      await signIn(provider, { callbackUrl: `/app/dashboard` })
    } catch (error) {
      console.error('onProviderLogin ~ error', error)
    }
  }

  return (
    <div className="w-full">
      <div className="p-5">
        <div className="grid grid-cols-1 gap-1">
          <button
            onClick={() => onProviderLogin('github')}
            className="ripple waves-light my-2 flex w-full items-center justify-center rounded-lg border-black bg-neutral-900 p-4 text-white shadow transition duration-200 hover:bg-neutral-700 hover:shadow-lg focus:outline-none"
          >
            Continue with Github
          </button>
        </div>
      </div>
    </div>
  )
}
