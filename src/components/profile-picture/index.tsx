import React, { useState, SyntheticEvent } from 'react'
import UserAvatar from 'ui/user-avatar'

type ProfilePictureProps = {
  user: UserSessionProps
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
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <div className="mt-1 flex items-center">
            <UserAvatar src={image} loading={loading} size="large" />

            <div className="relative ">
              <label
                htmlFor="image"
                role="button"
                className="relative ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleUpdatePicture}
                accept="image/jpeg, image/png"
                className="cursor-pointer absolute block opacity-0 pin-r pin-t"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePicture
