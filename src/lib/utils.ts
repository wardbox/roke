import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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

  useEffect(() => {
    return () => {
      document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
        link.remove()
      })
    }
  }, [])

  return handlePrefetch
}

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
