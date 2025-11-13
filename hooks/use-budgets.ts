import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Budget } from '@/types'

// Query keys
export const budgetKeys = {
  all: ['budgets'] as const,
  list: (month?: number, year?: number) =>
    [...budgetKeys.all, 'list', month, year] as const,
  detail: (id: string) => [...budgetKeys.all, 'detail', id] as const,
}

// Get all budgets
export function useBudgets(month?: number, year?: number) {
  return useQuery({
    queryKey: budgetKeys.list(month, year),
    queryFn: () => apiClient.getBudgets(month, year),
  })
}

// Get single budget
export function useBudget(id: string) {
  return useQuery({
    queryKey: budgetKeys.detail(id),
    queryFn: () => apiClient.getBudget(id),
    enabled: !!id,
  })
}

// Create budget mutation
export function useCreateBudget() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Budget>) => apiClient.createBudget(data),
    onSuccess: () => {
      // Invalidate and refetch budgets list
      queryClient.invalidateQueries({ queryKey: budgetKeys.all })
    },
  })
}

// Update budget mutation
export function useUpdateBudget() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Budget> }) =>
      apiClient.updateBudget(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific budget and list
      queryClient.invalidateQueries({ queryKey: budgetKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: budgetKeys.all })
    },
  })
}

// Delete budget mutation
export function useDeleteBudget() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteBudget(id),
    onSuccess: () => {
      // Invalidate budgets list
      queryClient.invalidateQueries({ queryKey: budgetKeys.all })
    },
  })
}
