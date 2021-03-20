import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import prisma from 'lib/prisma'

const options = {
  providers: [
    Providers.GitHub({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET)
    }),
    Providers.Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorizationUrl: String(process.env.GOOGLE_AUTHORIZATION_URL)
    }),
    Providers.Email({
      server: {
        host: String(process.env.SMTP_HOST),
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: String(process.env.SMTP_USER),
          pass: String(process.env.SMTP_PASSWORD)
        }
      },
      from: String(process.env.SMTP_FROM)
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: String(process.env.SECRET),
  session: {
    jwt: true
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  }
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
