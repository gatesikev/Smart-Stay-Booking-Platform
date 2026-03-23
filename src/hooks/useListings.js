import { useQuery } from '@tanstack/react-query'
import { fetchListings, fetchListingById } from '../services/api'

export const QUERY_KEYS = {
  listings: (params) => ['listings', params],
  listing: (id) => ['listing', id],
}

export function useListings(params, enabled = true) {
  return useQuery({
    queryKey: QUERY_KEYS.listings(params),
    queryFn: () => fetchListings(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: enabled && !!params?.placeId,
    retry: (failureCount, error) => {
      if (error?.response?.status === 429) return false
      return failureCount < 2
    },
  })
}

export function useListing(id) {
  return useQuery({
    queryKey: QUERY_KEYS.listing(id),
    queryFn: () => fetchListingById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    enabled: !!id,
  })
}