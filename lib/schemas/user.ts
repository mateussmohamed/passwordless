import { z } from 'zod'

const emailSchemaa = z.string().min(1, { message: 'Email is required' }).email({
  message: 'Must be a valid email'
})

export const profileSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3).max(32),
  email: emailSchemaa
})

export const loginSchema = z.object({
  email: emailSchemaa,
  password: z.string().min(1, { message: 'Password is required' })
})

export const registerSchema = loginSchema.extend({
  name: z.string({ required_error: 'Name is required' }).min(3).max(32)
})

export const registerSchemaForm = registerSchema
  .extend({
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match"
  })
