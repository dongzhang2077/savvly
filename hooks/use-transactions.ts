import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { Transaction } from '@/types'

// Query keys
export const transactionKeys = {
  all: ['transactions'] as const,
  list: (params?: {
    category?: string
    startDate?: Date
    endDate?: Date
    limit?: number
  }) => [...transactionKeys.all, 'list', params] as const,
  detail: (id: string) => [...transactionKeys.all, 'detail', id] as const,
}

// Get all transactions
export function useTransactions(params?: {
  category?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => apiClient.getTransactions(params),
  })
}

// Get single transaction
export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => apiClient.getTransaction(id),
    enabled: !!id,
  })
}

// Create transaction mutation
export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<Transaction>) =>
      apiClient.createTransaction(data),
    onSuccess: () => {
      // Invalidate and refetch transactions list
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      // Also invalidate budgets since transactions affect budget spent amounts
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}

// Update transaction mutation
export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transaction> }) =>
      apiClient.updateTransaction(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific transaction and list
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      // Also invalidate budgets
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}

// Delete transaction mutation
export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteTransaction(id),
    onSuccess: () => {
      // Invalidate transactions list
      queryClient.invalidateQueries({ queryKey: transactionKeys.all })
      // Also invalidate budgets
      queryClient.invalidateQueries({ queryKey: ['budgets'] })
    },
  })
}
