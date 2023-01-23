import { prisma } from 'lib/prisma'
import multer from 'multer'
import { NextApiRequest, NextApiResponse } from 'next'
import s3Upload from 'utils/aws/s3-upload'
import runMiddleware from 'utils/run-middleware'

const { S3_BUCKET_URL } = process.env

type NextApiRequestWithFormData = NextApiRequest & {
  file: any
}

const upload = multer({
  storage: multer.memoryStorage()
})

export const config = {
  api: {
    bodyParser: false
  }
}

async function handler(req: NextApiRequestWithFormData, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      await runMiddleware(req, res, upload.single('image'))

      const { originalname, mimetype, buffer } = req.file
      const { email } = req.body

      if (!buffer) {
        return res.status(400).json({ error: true, message: 'File empty' })
      }

      if (!originalname) {
        return res.status(400).json({ error: true, message: 'FileName empty' })
      }

      await s3Upload(originalname.toLowerCase(), buffer, mimetype)

      const updatedUser = await prisma.user.update({
        where: {
          email
        },
        data: {
          image: `${S3_BUCKET_URL}/${originalname.toLowerCase()}`
        }
      })

      return res.status(200).json(updatedUser)
    }
    return res.status(404).json({ error: true, message: '404 not found' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: true,
        message: error?.message
      })
    }
  }
}

export default handler
