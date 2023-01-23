'use client'

import { useForm } from 'react-hook-form'

type ProfileFormProps = {
  user: {
    id: string
  } & UserSessionProps
}

function ProfileForm({ user }: ProfileFormProps) {
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
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ id: user.id, name })
      })

      const result = await response.json()

      if (!result?.error) {
        setValue('name', result.name)
        setValue('email', result.email)
        setValue('image', result.image)
      }
    } catch (error) {
      console.error(error)
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:border-slate-200
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm
                  "
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
                disabled={!isDirty}
                type="submit"
                className={`${
                  !isDirty && 'cursor-not-allowed opacity-50'
                } inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileForm
