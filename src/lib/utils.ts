import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isValid } from 'date-fns'
import slugify from 'slugify'
import ms from 'ms'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Time and Date using date-fns
export const timeSince = (date: Date): string => {
  if (!isValid(date)) return 'Invalid date'
  return formatDistanceToNow(date, { addSuffix: true })
}

export const formatDate = (date: Date, formatStr: string = 'PPP'): string => {
  if (!isValid(date)) return 'Invalid date'
  return format(date, formatStr)
}

// Using ms for human-readable time conversions
export const humanizeMs = (milliseconds: number): string => {
  return ms(milliseconds, { long: true })
}

// Using slugify for URL-friendly strings
export const generateSlug = (text: string): string => {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  })
}

// Keep the essential custom utilities that don't have good library alternatives
export const extractInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const formatCompactNumber = (num: number): string => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(num)
}

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (err) {
      console.error('Error reading from localStorage', err)
      return null
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Error writing to localStorage', err)
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      console.error('Error removing from localStorage', err)
    }
  },
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy text: ', err)
    return false
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unknown error occurred'
}

// ... keep other essential custom utilities that don't have good library alternatives
