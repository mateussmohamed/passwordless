'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from 'ui/button'
import { z } from 'zod'

import { loginSchema } from '~/lib/schemas/user'
import { Field } from '~/ui/field'

type LoginFormProps = z.infer<typeof loginSchema>

interface LoginProps {
  csrfToken: string
}

export function LoginEmail({ csrfToken }: LoginProps) {
  const router = useRouter()
  const [isLoading, toggleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<LoginFormProps>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  })

  const onLoginEmail = async ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    try {
      toggleLoading(true)
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (!res?.error && res?.ok && res.status === 200) {
        router.push('/app/dashboard')
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <div>
      <div className="relative flex justify-center py-4">
        <span className="relative z-10 bg-white p-2 text-center text-sm text-gray-600">
          or continue with email
        </span>
        <hr className="absolute top-[50%] z-0 w-full" />
      </div>

      <form onSubmit={handleSubmit(onLoginEmail)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('email')}
            label="E-mail"
            type="text"
            error={errors.email?.message}
          />
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('password')}
            label="Password"
            type="password"
            error={errors.password?.message}
          />
        </div>

        <Button
          disabled={!isDirty || isLoading}
          isLoading={isLoading}
          size="full"
          className={
            !isDirty || isLoading ? 'cursor-not-allowed opacity-50' : ''
          }
        >
          Login
        </Button>
      </form>

      <div className="relative flex justify-center p-4">
        <span className="relative z-10 bg-white  text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register">
            <Button variant="link" className="px-0">
              Register
            </Button>
          </Link>
        </span>
      </div>
    </div>
  )
}
