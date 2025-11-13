import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// Query keys
export const dashboardKeys = {
  stats: ['dashboard', 'stats'] as const,
}

// Get dashboard statistics
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: () => apiClient.getDashboardStats(),
    // Refetch every 5 minutes to keep data fresh
    staleTime: 5 * 60 * 1000,
  })
}
