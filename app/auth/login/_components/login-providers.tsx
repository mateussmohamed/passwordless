'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { env } from '~/lib/env'
import { Button } from '~/ui/button'

export function LoginProviders() {
  const onProviderLogin = async (provider: string, redirect = true) => {
    try {
      await signIn(provider, { callbackUrl: '/app/dashboard', redirect })
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <div className="w-full py-4">
      <div className="grid grid-cols-1 gap-4">
        {env.APP_PREVIEW ? (
          <Button
            className="ripple waves-light"
            size="full"
            variant="destructive"
            onClick={() => onProviderLogin('credentials')}
          >
            Preview Login
          </Button>
        ) : (
          <Button
            className="ripple waves-light bg-neutral-900 hover:bg-neutral-700"
            size="full"
            onClick={() => onProviderLogin('github')}
          >
            Continue with Github
          </Button>
        )}
      </div>
    </div>
  )
}
