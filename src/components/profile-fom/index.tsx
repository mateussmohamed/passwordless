import { useForm } from 'react-hook-form'

type ProfileFormProps = {
  user: UserSessionProps
}

function ProfileForm({ user }: ProfileFormProps) {
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      image: user.image
    }
  })

  const onSubmit = async (data: UserSessionProps) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const user = await response.json()
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('image', user.image)
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
              name="name"
              id="name"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ref={register({ required: true })}
            />
            {errors.name && <span className="text-red-700 text-xs">This field is required</span>}
          </div>

          <div className="col-span-6 sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ref={register({ required: true })}
            />
            {errors.email && <span className="text-red-700 text-xs">This field is required</span>}
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
