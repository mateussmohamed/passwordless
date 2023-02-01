namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_APP_URL: string
    NEXT_PUBLIC_APP_PREVIEW: string
    APP_PREVIEW: string
    APP_PREVIEW_EMAIL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    GITHUB_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    DATABASE_URL: string
  }
}
