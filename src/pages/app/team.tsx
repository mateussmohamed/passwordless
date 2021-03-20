import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function TeamPage() {
  return (
    <AppLayout pageTitle="Team Page">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Team</h2>
    </AppLayout>
  )
}

export default TeamPage

export const getServerSideProps = withAuth()
