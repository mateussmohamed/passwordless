import React from 'react'

import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

import ProfileForm from 'components/profile-fom'
import ProfilePicture from 'components/profile-picture'

function ProfilePage(props: ProtectedPageProps) {
  const {
    session: { user }
  } = props

  return (
    <AppLayout {...props} pageTitle="Profile Page">
      <div className="md:grid md:grid-cols-3 md:gap-6 px-12">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <ProfileForm user={user} />
        </div>
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Picture</h3>
            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <ProfilePicture user={user} />
        </div>
      </div>
    </AppLayout>
  )
}

export default ProfilePage

export const getServerSideProps = withAuth()
