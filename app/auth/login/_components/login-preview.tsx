'use client'

import { signIn } from 'next-auth/react'

export function LoginPreview() {
  const onProviderLogin = async () => {
    try {
      await signIn('credentials', { callbackUrl: `/app/dashboard` })
    } catch (error) {
      console.error('onProviderLogin ~ error', error)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-1">
        <button
          onClick={onProviderLogin}
          className="ripple waves-light my-2 flex w-full items-center justify-center rounded-lg border-red-600 bg-red-600 p-4 text-white shadow transition duration-200 hover:bg-red-500 hover:shadow-lg focus:outline-none"
        >
          Preview Login
        </button>
      </div>
    </div>
  )
}
