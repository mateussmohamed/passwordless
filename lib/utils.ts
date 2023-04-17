import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exclude<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}

type FetchParams = Parameters<typeof fetch>

const fetcher = (...args: FetchParams) =>
  fetch(...args).then((res) => res.json())
