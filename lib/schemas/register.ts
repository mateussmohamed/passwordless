import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3).max(32),
  email: z.string({ required_error: 'E-mail is required' }).email(),
  password: z.string({ required_error: 'Password is required' })
})
