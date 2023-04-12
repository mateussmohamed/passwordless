import { UserAvatar } from 'ui/user-avatar'

type ProfilePictureProps = {
  user: UserSessionProps
}

export function ProfilePicture({ user }: ProfilePictureProps) {
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
            <UserAvatar src={user.image} size="large" />
          </div>
        </div>
      </div>
    </>
  )
}
