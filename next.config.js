/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['nextjs-passwordless.s3.amazonaws.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  },
  experimental: {
    appDir: true,
    newNextLinkBehavior: true,
    serverComponentsExternalPackages: ['prisma']
  }
}

module.exports = nextConfig
