'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
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
      console.error('onLoginEmail ~ error', error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onLoginEmail)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="col-span-6 sm:col-span-3">
          <label className="block pb-1 text-sm font-semibold text-gray-600">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            disabled={isLoading}
            className="my-2 w-full rounded-lg border p-3 text-sm"
            {...register('email', {
              required: 'E-mail is required',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Invalid e-mail.'
              }
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="block pb-1 text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            disabled={isLoading}
            className="my-2 w-full rounded-lg border p-3 text-sm"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </div>

        <button
          disabled={!isDirty || isLoading}
          type="submit"
          className={`${
            (!isDirty || isLoading) && 'cursor-not-allowed opacity-50'
          } inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 p-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          {isLoading ? (
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
          ) : null}
          Save
        </button>
      </form>

      <div className="relative flex justify-center p-4">
        <span className="relative z-10 bg-white p-2 text-center text-sm text-gray-600">
          or continue with email
        </span>
        <hr className="absolute top-[50%] z-0 w-full" />
      </div>
    </div>
  )
}
