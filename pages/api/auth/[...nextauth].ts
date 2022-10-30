import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Session, User } from 'next-auth'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

import { prisma } from 'lib/prisma'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: String(process.env.GITHUB_CLIENT_ID),
        clientSecret: String(process.env.GITHUB_CLIENT_SECRET)
      }),
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
      }),
      EmailProvider({
        server: String(process.env.EMAIL_SERVER),
        from: String(process.env.EMAIL_FROM)
      })
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/auth/signin',
      error: '/auth/error',
      verifyRequest: '/auth/verify-request'
    },
    callbacks: {
      async session({ session, user }: { user: User; session: Session }) {
        return { user, expires: session?.expires }
      }
    }
  })
}
