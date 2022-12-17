'use client'

import { useForm } from 'react-hook-form'

type ProfileFormProps = {
  user: UserSessionProps
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              id="name"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              {...register('name', { required: true })}
            />
            {errors.name && <span className="text-red-700 text-xs">This field is required</span>}
          </div>

          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              disabled
              type="text"
              id="email"
              autoComplete="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              {...register('email', { required: true })}
            />
            {errors.email && <span className="text-red-700 text-xs">This field is required</span>}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={!isDirty}
            type="submit"
            className={`${
              !isDirty && 'opacity-50 cursor-not-allowed'
            } inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
