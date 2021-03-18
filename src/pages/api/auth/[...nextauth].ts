import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const options = {
  providers: [
    Providers.GitHub({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET)
    }),
    Providers.Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
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
  database: process.env.DATABASE_URL,
  secret: String(process.env.SECRET),
  session: {
    jwt: true
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/app/dashboard' // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn(user: Record<string, any>, account: Record<string, any>, profile: Record<string, any>) {
      console.log('callbacks -> signIn')
      console.log({ account, profile })
    },
    async redirect(url: string, baseUrl: string) {
      console.log('callbacks -> redirect')
      console.log({ url, baseUrl })
      return baseUrl
    },
    async session(session: Record<string, any>, user: Record<string, any>) {
      console.log('callbacks -> session')
      console.log({ session, user })
      return session
    }
  }
}

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler
