import { z } from 'zod'

const isServer = typeof window === 'undefined'

const serverEnvVariables = z.object({
  GITHUB_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production'])
})

const universalVariables = z.object({
  APP_URL: z.string().url(),
  APP_PREVIEW: z.boolean(),
  APP_PREVIEW_EMAIL: z.string()
})

let env = {
  APP_URL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL,
  APP_PREVIEW: [
    process.env.VERCEL_ENV,
    process.env.NEXT_PUBLIC_VERCEL_ENV
  ].includes('preview'),

  APP_PREVIEW_EMAIL:
    process.env.APP_PREVIEW_EMAIL || process.env.NEXT_PUBLIC_APP_PREVIEW_EMAIL,

  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,

  NODE_ENV: process.env.NODE_ENV
}

const merged = serverEnvVariables.merge(universalVariables)

const parsed = isServer
  ? merged.safeParse(env)
  : universalVariables.safeParse(env)

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsed.error.flatten().fieldErrors)
  )
  throw new Error('Invalid environment variables')
} else {
  env = parsed.data as Required<z.infer<typeof merged>>
}

export { env }
