import * as argon2 from 'argon2'

export function bcryptSaltRounds(): string | number {
  const saltOrRounds = 10

  return Number.isInteger(Number(saltOrRounds))
    ? Number(saltOrRounds)
    : saltOrRounds
}

export function validatePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return argon2.verify(hashedPassword, password)
}

export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password, { hashLength: 48, saltLength: 32 })
}
