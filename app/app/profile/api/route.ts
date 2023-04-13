import Joi from 'joi'
import { prisma } from 'lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

const schema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().min(2).max(50).required()
})

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req

    const { error } = await schema.validateAsync(body)

    if (error) {
      res.status(400).json({
        message: error
      })
    }

    const updateUser = await prisma.user.update({
      where: { email: body.email },
      data: { name: body.name }
    })

    res.status(200).json(updateUser)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: true,
        message: error?.message
      })
    }
  }
}
