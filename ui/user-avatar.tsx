'use client'

import Image from 'next/image'
import React from 'react'

import { cn } from '~/lib/utils'

type UserAvatarProps = {
  src?: string
  size?: 'small' | 'medium' | 'large'
}

const sizes = {
  small: 'h-10 w-10',
  medium: 'h-16 w-16',
  large: 'h-32 w-32'
}

const width = {
  small: { width: 40, height: 40 },
  medium: { width: 64, height: 64 },
  large: { width: 128, height: 128 }
}

export function UserAvatar({ src, size = 'small' }: UserAvatarProps) {
  if (!src) {
    return (
      <span
        className={cn(
          sizes[size],
          'inline-block overflow-hidden rounded-full bg-gray-100'
        )}
      >
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    )
  }

  return (
    <Image
      {...width[size]}
      className={cn(sizes[size], 'rounded-full')}
      src={src}
      alt="User profile picture"
      loading="lazy"
    />
  )
}

// const userAvatarVariants = cva('span', {
//   variants: {
//     width: {
//       small: ['w-[40px]', 'h-[40px]'],
//       medium: ['w-[64px]', 'h-[64px]'],
//       large: ['w-[128px]', 'h-[128px]']
//     },
//     size: {
//       small: ['h-10', 'w-10'],
//       medium: ['h-16', 'w-16'],
//       large: ['h-32', 'w-32']
//     }
//   },
//   defaultVariants: {
//     width: 'medium',
//     size: 'medium'
//   }
// })

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof button> {}

// export const Button: React.FC<ButtonProps> = ({
//   className,
//   intent,
//   size,
//   ...props
// }) => <button className={button({ intent, size, className })} {...props} />
