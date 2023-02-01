export const IS_PRODUCTION = process.env.VERCEL_ENV === 'production'
export const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export const IS_DEVELOPMENT = process.env.VERCEL_ENV === 'development'

export const IS_PREVIEW_OR_DEVELOPMENT = IS_PREVIEW || IS_DEVELOPMENT

const APP_URL = IS_PREVIEW_OR_DEVELOPMENT
  ? process.env.VERCEL_ENV
  : process.env.NEXT_PUBLIC_APP_URL

export { APP_URL }
