import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { validatePassword } from '~/app/api/user/register/password.service'
import { APP_PREVIEW_EMAIL, IS_PREVIEW } from '~/lib/env'

import { exclude } from './utils'

function previewProviders() {
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

function productionProviders() {
  return [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-mail', type: 'text', placeholder: 'E-mail' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          throw new Error('No user Found with Email Please Sign Up...!')
        }

        if (user && user.password) {
          const checkPassword = await validatePassword(password, user.password)

          if (!checkPassword || user.email !== email) {
            throw new Error("Username or Password doesn't match")
          }

          return exclude(user, ['password'])
        }

        return null
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
}

function defineProviders() {
  return IS_PREVIEW ? previewProviders() : productionProviders()
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ token, session }) {
      if (token) {
        session!.user!.name = token.name
        session!.user!.email = token.email
        session!.user!.image = token.picture
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: String(token.email || user.email)
        }
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
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
