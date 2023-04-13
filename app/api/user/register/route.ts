import { Prisma } from '@prisma/client'
import { prisma } from 'lib/prisma'
// import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { registerSchema } from '~/lib/schemas/register'

import { hashPassword } from './password.service'

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const payload = registerSchema.parse(body)

    const hashedPassword = await hashPassword(payload.password)

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email.toLowerCase(),
        password: hashedPassword
      }
    })

    return NextResponse.json('', { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 })
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(`Email ${body.email} already used.`, {
        status: 422
      })
    } else {
      return NextResponse.json(null, { status: 422 })
    }
  }
}
