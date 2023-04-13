import Joi from 'joi'
import { prisma } from 'lib/prisma'
import { NextResponse } from 'next/server'

const schema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().min(2).max(50).required()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { error } = await schema.validateAsync(body)

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 })
    }

    const updateUser = await prisma.user.update({
      where: { email: body.email },
      data: { name: body.name }
    })

    return NextResponse.json(updateUser, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: true, message: error?.message },
        { status: 500 }
      )
    }
  }
}
