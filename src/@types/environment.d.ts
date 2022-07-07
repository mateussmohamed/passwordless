namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_APP_URL: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
    SMTP_FROM: string
    GITHUB_CLIENT_SECRET: string
    GITHUB_CLIENT_ID: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    DATABASE_URL: string
    S3_ACCESS_KEY: string
    S3_SECRET_KEY: string
    S3_REGION: string
    S3_BUCKET_NAME: string
    S3_BUCKET_URL: string
  }
}
