import { useForm } from 'react-hook-form'

type ProfileFormProps = {
  user: UserSessionProps
}

function ProfileForm({ user }: ProfileFormProps) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      fullName: user.name,
      email: user.email
    }
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              autoComplete="given-name"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ref={register({ required: true })}
            />
            {errors.fullName && <span className="text-red-700 text-xs">This field is required</span>}
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

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change
              </button>
            </div>
          </div> */}
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
