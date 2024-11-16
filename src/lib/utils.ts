import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isValid } from 'date-fns'
import slugify from 'slugify'
import ms from 'ms'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

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

// Add this type for route params
type RouteParams = Record<string, string>

export const generatePath = (path: string, params?: RouteParams): string => {
  if (!params) return path
  return Object.entries(params).reduce((path, [key, value]) => {
    return path.replace(`:${key}`, value)
  }, path)
}

type AssetType = 'image' | 'style' | 'script'

interface PrefetchOptions {
  assets?: boolean
  delay?: number
}

export const usePrefetch = () => {
  const prefetchedUrls = useState(() => new Set<string>())[0]
  const assetUrlCache = useState(() => new Map<string, Set<string>>())[0]
  const location = useLocation()

  const prefetchAssets = useCallback(
    async (url: string) => {
      try {
        // Fetch the page HTML
        const response = await fetch(url)
        const html = await response.text()
        const doc = new DOMParser().parseFromString(html, 'text/html')
        const assets = new Set<string>()

        // Find all assets in the page
        const assetSelectors = {
          image: 'img[src]',
          style: 'link[rel="stylesheet"]',
          script: 'script[src]',
        }

        Object.entries(assetSelectors).forEach(([type, selector]) => {
          doc.querySelectorAll(selector).forEach(element => {
            const assetUrl =
              element.getAttribute('src') || element.getAttribute('href')
            if (assetUrl && !prefetchedUrls.has(assetUrl)) {
              assets.add(assetUrl)
              const link = document.createElement('link')
              link.rel = 'prefetch'
              link.href = assetUrl
              link.as = type as AssetType
              document.head.appendChild(link)
              prefetchedUrls.add(assetUrl)
            }
          })
        })

        assetUrlCache.set(url, assets)
      } catch (error) {
        console.warn(`Failed to prefetch assets for ${url}:`, error)
      }
    },
    [prefetchedUrls, assetUrlCache],
  )

  const handlePrefetch = useCallback(
    (
      path: string,
      params?: RouteParams,
      options: PrefetchOptions = { delay: 50 },
    ) => {
      const url = generatePath(path, params)

      // Don't prefetch if we're already on this page
      if (prefetchedUrls.has(url) || location.pathname === path) return

      const prefetch = () => {
        // Prefetch the HTML document
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = url
        document.head.appendChild(link)
        prefetchedUrls.add(url)

        // Optionally prefetch assets
        if (options.assets) {
          prefetchAssets(url)
        }
      }

      if (options.delay) {
        setTimeout(prefetch, options.delay)
      } else {
        prefetch()
      }
    },
    [prefetchedUrls, prefetchAssets, location.pathname],
  )

  // Cleanup function
  useEffect(() => {
    return () => {
      // Remove prefetch links when component unmounts
      document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
        link.remove()
      })
    }
  }, [])

  return handlePrefetch
}

// ... keep other essential custom utilities that don't have good library alternatives

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.1 },
) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [elementRef, options])

  return isVisible
}

// Add request deduplication
const requestCache = new Map()

export const dedupedFetch = async (url: string, options?: RequestInit) => {
  const cacheKey = `${url}-${JSON.stringify(options)}`

  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)
  }

  const promise = fetch(url, options).then(async res => {
    requestCache.delete(cacheKey)
    return res
  })

  requestCache.set(cacheKey, promise)
  return promise
}

// Add performance measurement
export const measurePageLoad = () => {
  const timing = window.performance.timing
  const loadTime = timing.loadEventEnd - timing.navigationStart

  console.log({
    'Total Load Time': `${loadTime}ms`,
    'DOM Content Loaded': `${
      timing.domContentLoadedEventEnd - timing.navigationStart
    }ms`,
    'First Paint': `${timing.responseStart - timing.navigationStart}ms`,
  })
}
