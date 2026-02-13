// @ts-nocheck - React 19 type compatibility issues
'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../../lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

const Label = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
      VariantProps<typeof labelVariants>,
    ref: React.ForwardedRef<React.ElementRef<typeof LabelPrimitive.Root>>,
  ) => (
    <LabelPrimitive.Root
      ref={ref as any}
      className={cn(labelVariants(), className)}
      {...(props as any)}
    />
  ),
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
