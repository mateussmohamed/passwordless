export const IS_PRODUCTION =
  process.env.VERCEL_ENV === 'production' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
export const IS_PREVIEW =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
export const IS_DEVELOPMENT =
  process.env.VERCEL_ENV === 'development' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'

export const APP_PREVIEW_EMAIL =
  process.env.APP_PREVIEW_EMAIL || process.env.NEXT_PUBLIC_APP_PREVIEW_EMAIL

export const IS_PREVIEW_OR_DEVELOPMENT = IS_PREVIEW || IS_DEVELOPMENT

const APP_URL = process.env.NEXT_PUBLIC_VERCEL_URL

export { APP_URL }
