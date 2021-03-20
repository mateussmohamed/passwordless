import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function ProjectsPage(props: ProtectedPageProps) {
  return (
    <AppLayout {...props} pageTitle="Projects Page">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Projects</h2>
    </AppLayout>
  )
}

export default ProjectsPage

export const getServerSideProps = withAuth()
