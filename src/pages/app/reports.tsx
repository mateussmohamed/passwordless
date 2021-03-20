import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function ReportsPage(props: ProtectedPageProps) {
  return (
    <AppLayout {...props} pageTitle="Reports Page">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Reports</h2>
    </AppLayout>
  )
}

export default ReportsPage

export const getServerSideProps = withAuth()
