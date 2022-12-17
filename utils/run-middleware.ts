import { NextApiRequest, NextApiResponse } from 'next'

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: any) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default runMiddleware
