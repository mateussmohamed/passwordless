'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface LoginProps {
  csrfToken: string
}

export function LoginEmail({ csrfToken }: LoginProps) {
  const [loading, setLoading] = useState(false)

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

  const onLoginEmail = async ({ email }: { email: string }) => {
    try {
      setLoading(true)
      // await signIn('email', { email, callbackUrl })
    } catch (error) {
      console.error('onLoginEmail ~ error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5">
      <div className="relative flex justify-center p-4">
        <span className="relative z-10 bg-white p-2 text-center text-sm text-gray-600">
          or continue with email
        </span>
        <hr className="absolute top-[50%] z-0 w-full" />
      </div>
      <form onSubmit={handleSubmit(onLoginEmail)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="col-span-6 sm:col-span-3">
          <label className="block pb-1 text-sm font-semibold text-gray-600">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            disabled={loading}
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

        {loading ? (
          <button
            disabled
            className="mt-2 inline-flex w-full cursor-wait justify-center rounded-lg bg-indigo-500 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-indigo-600 hover:shadow-md focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
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
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isDirty}
            className={`${
              !isDirty && 'cursor-not-allowed opacity-50'
            } mt-2 inline-block w-full rounded-lg bg-indigo-500 p-4 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-indigo-600 hover:shadow-md focus:bg-indigo-700 focus:shadow-sm focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            <span className="mr-2 inline-block">Sign in</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="inline-block h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  )
}
