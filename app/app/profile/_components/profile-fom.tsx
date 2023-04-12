'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type ProfileFormProps = {
  user: UserSessionProps
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, toggleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image
    }
  })

  const onSubmit = async ({ name }: { name: string }) => {
    try {
      toggleLoading(true)
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, name })
      })

      const result = await response.json()

      if (!result?.error) {
        setValue('name', result.name)
        setValue('email', result.email)
        setValue('image', result.image)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>

      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  autoComplete="given-name"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-xs text-red-700">
                    This field is required
                  </span>
                )}
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  disabled
                  type="text"
                  id="email"
                  autoComplete="email"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50
                  disabled:text-slate-500 disabled:opacity-50 disabled:shadow-none"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-xs text-red-700">
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                disabled={!isDirty || isLoading}
                type="submit"
                className={`${
                  (!isDirty || isLoading) && 'cursor-not-allowed opacity-50'
                } inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
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
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
