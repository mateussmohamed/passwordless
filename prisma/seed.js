const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  if (!Boolean(process.env.APP_PREVIEW)) {
    throw new Error('Seed can run on preview mode.')
  }

  await prisma.user.upsert({
    where: { email: 'mateus@passwordless.io' },
    update: {},
    create: {
      email: 'mateus@passwordless.io',
      emailVerified: new Date(),
      name: 'Mateus',
      image: 'https://placehold.co/200x200/000000/FFF',
      accounts: {
        create: {
          providerAccountId: '1',
          provider: 'credentials',
          type: 'credentials'
        }
      }
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
