import type { VueQueryPluginOptions } from '@tanstack/vue-query'

export const DEFAULT_CACHE_TIME = 30 * 50 * 1000
export const DEFAULT_STALE_TIME = 25 * 60 * 1000

export const queryClientConfig: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      mutations: {
        retry: false
      },
      queries: {
        staleTime: DEFAULT_STALE_TIME,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
        gcTime: DEFAULT_CACHE_TIME
      }
    }
  },
  enableDevtoolsV6Plugin: true
}
