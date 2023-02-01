import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

function previewProvider() {
  return [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Mateus' }
      },
      async authorize() {
        const user = await prisma.user.findFirst({
          where: { email: 'mateus@passwordless.io' }
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
  return process.env.APP_PREVIEW === 'preview'
    ? previewProvider()
    : readyProvider()
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
