import Image from 'next/image'

import Spin from 'ui/spin'

type UserAvatarProps = {
  src?: string
  loading?: boolean
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

function UserAvatar({ src, loading, size = 'small' }: UserAvatarProps) {
  if (loading) {
    return <Spin size={size} />
  }

  if (!src) {
    return (
      <span className={`${sizes[size]} inline-block rounded-full overflow-hidden bg-gray-100`}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </span>
    )
  }

  return <Image {...width[size]} className={`${sizes[size]} rounded-full`} src={src} alt="" loading="lazy" />
}

export default UserAvatar
