'use client'

import { SyntheticEvent, useState } from 'react'
import UserAvatar from 'ui/user-avatar'

type ProfilePictureProps = {
  user: {
    id: string
  } & UserSessionProps
}

function ProfilePicture({ user }: ProfilePictureProps) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(user.image)

  const handleUpdatePicture = async (e: SyntheticEvent<HTMLInputElement>) => {
    try {
      if (e.currentTarget?.files) {
        setLoading(true)
        const file = e.currentTarget.files[0]
        const formData = new FormData()
        formData.append('email', String(user.email))
        formData.append('image', file)

        const response = await fetch('/api/profile/upload-photo', {
          method: 'POST',
          body: formData
        })

        const userResponse = await response.json()

        setImage(userResponse.image)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Picture
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <UserAvatar src={image} loading={loading} size="large" />

                <div className="relative ">
                  <label
                    htmlFor="image"
                    role="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleUpdatePicture}
                    accept="image/jpeg, image/png"
                    className="pin-r pin-t absolute block cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePicture
