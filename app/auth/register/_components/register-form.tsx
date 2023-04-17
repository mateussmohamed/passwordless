'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from 'ui/button'
import { Field } from 'ui/field'
import { z } from 'zod'

import { registerSchemaForm } from '~/lib/schemas/user'

type FormProps = z.infer<typeof registerSchemaForm>

export function RegisterForm({ csrfToken }: { csrfToken: string }) {
  const [isLoading, toggleLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchemaForm)
  })

  const onRegisterForm = async ({ name, email, password }: FormProps) => {
    try {
      toggleLoading(true)

      const response = await fetch('/api/user/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })

      if (response?.ok && response.status === 201) {
        toast.success('Account created successfully')

        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      }

      const errorMessage = await response.json()

      if (!response.ok && typeof errorMessage === 'string') {
        toast.error(errorMessage)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('name')}
            label="Name"
            type="text"
            error={errors.name?.message}
          />
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('email')}
            label="E-mail"
            type="text"
            error={errors.email?.message}
          />
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('password')}
            label="Password"
            type="password"
            error={errors.password?.message}
          />
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          <Field
            {...register('confirmPassword')}
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          {errors.root?.serverError && (
            <p className="text-center text-xs text-red-700">
              {errors.root?.serverError?.message}
            </p>
          )}
        </div>

        <div className="col-span-6 mb-4 sm:col-span-3">
          <Button
            disabled={!isDirty || isLoading}
            isLoading={isLoading}
            size="full"
            className={
              !isDirty || isLoading ? 'cursor-not-allowed opacity-50' : ''
            }
          >
            Save
          </Button>
        </div>
      </form>

      <div className="relative flex justify-center p-4">
        <span className="relative z-10 bg-white  text-center text-sm text-gray-600">
          Has an account?{' '}
          <Link href="/auth/login">
            <Button variant="link" className="px-0">
              Login
            </Button>
          </Link>
        </span>
      </div>
    </>
  )
}
