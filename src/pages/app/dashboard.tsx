import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function DashboardPage(props: ProtectedPageProps) {
  return (
    <AppLayout {...props} pageTitle="Dashboard Page">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Dashboard</h2>
    </AppLayout>
  )
}

export default DashboardPage

export const getServerSideProps = withAuth()
