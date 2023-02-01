namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_APP_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    DATABASE_URL: string

    VERCEL_ENV: string
    VERCEL_URL: string

    APP_PREVIEW_EMAIL: string
  }
}
