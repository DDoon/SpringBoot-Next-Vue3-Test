'use client'

import { Provider } from 'jotai'
import { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function ReactQueryJotaiProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          suspense: true,
          keepPreviousData: true,
          refetchOnReconnect: true,
          useErrorBoundary(error: any) {
            return error.reason !== 'INVALID_ARGUMENT'
          },
        },
      },
    })
  )

  return (
    <QueryClientProvider client={queryClient.current}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  )
}
