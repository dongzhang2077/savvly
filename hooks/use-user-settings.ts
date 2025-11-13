import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { UserSettings } from '@/types'

// Query keys
export const userSettingsKeys = {
  all: ['userSettings'] as const,
}

// Get user settings
export function useUserSettings() {
  return useQuery({
    queryKey: userSettingsKeys.all,
    queryFn: () => apiClient.getUserSettings(),
  })
}

// Update user settings mutation
export function useUpdateUserSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<UserSettings>) =>
      apiClient.updateUserSettings(data),
    onSuccess: () => {
      // Invalidate user settings
      queryClient.invalidateQueries({ queryKey: userSettingsKeys.all })
    },
  })
}
