import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'

import prisma from 'lib/prisma'

const schema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email()
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
      where: { email: body.email },
      data: {
        email: body.email,
        name: body.name
      }
    })

    res.status(200).json({ email: updateUser.email, image: updateUser.image, name: updateUser.name })
  } catch (error) {
    res.status(500).json({
      error: true,
      messagem: error?.message
    })
  }
}

export default handler
