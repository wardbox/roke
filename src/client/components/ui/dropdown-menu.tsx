import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, CaretRightIcon, CircleIcon } from '@phosphor-icons/react'

import { cn } from '../../../lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = forwardRef(
  (
    {
      className,
      inset,
      children,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
      inset?: boolean
    },
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.SubTrigger>>,
  ) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref as any}
      className={cn(
        'focus:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...(props as any)}
    >
      {children}
      <CaretRightIcon className='ml-auto' size={16} weight='bold' />
    </DropdownMenuPrimitive.SubTrigger>
  ),
)
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = forwardRef(
  (
    {
      className,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>,
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.SubContent>>,
  ) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref as any}
      className={cn(
        'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded-md border p-1 shadow-lg',
        className,
      )}
      {...(props as any)}
    />
  ),
)
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = forwardRef(
  (
    {
      className,
      sideOffset = 4,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.Content>>,
  ) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref as any}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md',
          className,
        )}
        {...(props as any)}
      />
    </DropdownMenuPrimitive.Portal>
  ),
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = forwardRef(
  (
    {
      className,
      inset,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
      inset?: boolean
    },
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.Item>>,
  ) => (
    <DropdownMenuPrimitive.Item
      ref={ref as any}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className,
      )}
      {...(props as any)}
    />
  ),
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = forwardRef(
  (
    {
      className,
      children,
      checked,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>>,
  ) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref as any}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      checked={checked}
      {...(props as any)}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon size={16} weight='bold' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  ),
)
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = forwardRef(
  (
    {
      className,
      children,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>,
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.RadioItem>>,
  ) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref as any}
      className={cn(
        'focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...(props as any)}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon size={8} weight='fill' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  ),
)
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = forwardRef(
  (
    {
      className,
      inset,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
      inset?: boolean
    },
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.Label>>,
  ) => (
    <DropdownMenuPrimitive.Label
      ref={ref as any}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      )}
      {...(props as any)}
    />
  ),
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = forwardRef(
  (
    {
      className,
      ...props
    }: ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>,
    ref: ForwardedRef<ElementRef<typeof DropdownMenuPrimitive.Separator>>,
  ) => (
    <DropdownMenuPrimitive.Separator
      ref={ref as any}
      className={cn('bg-muted -mx-1 my-1 h-px', className)}
      {...(props as any)}
    />
  ),
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
