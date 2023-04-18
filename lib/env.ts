// credits: https://create.t3.gg/en/usage/env-variables
import { z } from 'zod'

const isServer = typeof window === 'undefined'

const IS_PREVIEW = [
  process.env.VERCEL_ENV,
  process.env.NEXT_PUBLIC_VERCEL_ENV
].includes('preview')

const server = z.object({
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  GITHUB_CLIENT_ID: z.string().nonempty(),
  NODE_ENV: z.enum(['development', 'test', 'production'])
})

const client = z.object({
  APP_URL: z.string().url().nonempty(),
  APP_PREVIEW: z.boolean(),
  APP_PREVIEW_EMAIL: z.string().nonempty()
})

const processEnv = {
  APP_URL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL,
  APP_PREVIEW: IS_PREVIEW,
  APP_PREVIEW_EMAIL:
    process.env.APP_PREVIEW_EMAIL || process.env.NEXT_PUBLIC_APP_PREVIEW_EMAIL,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV
}

const merged = server.merge(client)

type Merged = z.infer<typeof merged>

const parsed = isServer
  ? merged.safeParse(processEnv)
  : client.safeParse(processEnv)

console.log(`🚀 ~ file: env.ts:41 ~ parsed:`, parsed)

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  )
  throw new Error('Invalid environment variables')
}

const data = parsed.data as Merged

const env = new Proxy(data, {
  get(target, prop) {
    return target[prop as keyof typeof data]
  }
})

export { env }
