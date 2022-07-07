import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

import { prisma } from 'lib/prisma'

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(50).required()
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req

    const { error } = await schema.validateAsync(body)

    if (Boolean(error)) {
      res.status(400).json({
        message: error
      })
    }

    const updateUser = await prisma.user.update({
      where: { id: body.id },
      data: { name: body.name }
    })

    res.status(200).json(updateUser)
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({
        error: true,
        message: error?.message
      })
  }
}

export default handler
