import { prisma } from 'lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { profileSchema } from '~/lib/schemas/user'

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const payload = profileSchema.parse(body)

    const updateUser = await prisma.user.update({
      where: { email: payload.email },
      data: { name: payload.name }
    })

    return NextResponse.json(updateUser, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 403 })
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: true, message: error?.message },
        { status: 500 }
      )
    }
  }
}
