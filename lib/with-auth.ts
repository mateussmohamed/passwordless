import { GetServerSidePropsContext } from 'next'

import { getSession } from 'next-auth/react'

export default function withAuth() {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context)

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: '/auth/signin',
          permanent: false
        }
      }
    }

    return { props: { session } }
  }
}
