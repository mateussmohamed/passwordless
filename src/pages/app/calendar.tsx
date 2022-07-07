import React from 'react'

import withAuth from 'lib/with-auth'

import AppLayout from 'layouts/app'

function CalendarPage(props: ProtectedPageProps) {
  return (
    <AppLayout {...props} pageTitle="Calendar Page">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Calendar</h2>
    </AppLayout>
  )
}

export default CalendarPage

export const getServerSideProps = withAuth()
