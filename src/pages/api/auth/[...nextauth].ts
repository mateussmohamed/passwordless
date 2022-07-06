import NextAuth from 'next-auth'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

import prisma from 'lib/prisma'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

const NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET)
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    }),
    EmailProvider({
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
  adapter: PrismaAdapter(prisma),
  secret: String(process.env.SECRET),
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  }
}

export default NextAuth(NextAuthOptions)
