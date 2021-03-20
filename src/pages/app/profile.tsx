import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function ProfilePage() {
  return (
    <AppLayout pageTitle="Profile Page">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Profile</h2>
    </AppLayout>
  )
}

export default ProfilePage

export const getServerSideProps = withAuth()
