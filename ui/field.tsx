import * as React from 'react'

import { cn } from '~/lib/utils'

import { Input } from './input'

export interface FieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="col-span-6 sm:col-span-3">
        <label className="block pb-1 text-sm font-semibold text-gray-600">
          {label}
        </label>

        <Input {...props} ref={ref} />

        {error && <span className="text-xs text-red-700">{error}</span>}
      </div>
    )
  }
)

Field.displayName = 'Field'

export { Field }
