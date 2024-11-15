import { configureQueryClient } from 'wasp/client/operations'

export async function setupClient(): Promise<void> {
  configureQueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 2, // 2 minutes
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 1000 * 60, // 1 minute
      },
    },
  })
}

export default setupClient
