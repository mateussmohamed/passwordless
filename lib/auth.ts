import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { APP_PREVIEW_EMAIL, IS_PREVIEW } from '~/lib/env'

function previewProvider() {
  return [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' }
      },
      async authorize() {
        const user = await prisma.user.findFirst({
          where: { email: APP_PREVIEW_EMAIL }
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
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith('/')) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async session({ token, session }) {
      if (token) {
        session!.user!.name = token.name
        session!.user!.email = token.email
        session!.user!.image = token.picture
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      }
    }
  }
}

export default NextAuth(authOptions)
