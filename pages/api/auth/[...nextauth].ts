import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'lib/prisma'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  },
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async session({ session, user }) {
      return { expires: session.expires, user }
    }
  }
}

export default NextAuth(authOptions)
