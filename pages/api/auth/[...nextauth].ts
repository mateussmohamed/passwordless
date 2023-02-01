import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { IS_PREVIEW } from '~/lib/env'

function previewProvider() {
  return [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' }
      },
      async authorize() {
        const user = await prisma.user.findFirst({
          where: { email: process.env.APP_PREVIEW_EMAIL }
        })
        return user ?? null
      }
    })
  ]
}

function readyProvider() {
  return [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
}

function defineProviders() {
  return IS_PREVIEW ? previewProvider() : readyProvider()
}

export const authOptions: NextAuthOptions = {
  providers: defineProviders(),
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  },
  theme: {
    colorScheme: 'light'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return Promise.resolve(token)
    }
  }
}

export default NextAuth(authOptions)
