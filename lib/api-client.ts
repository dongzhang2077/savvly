/**
 * API Client for Savvly App
 * Handles all API requests with authentication
 */

import { Budget, Transaction, Goal, UserSettings } from '@/types'

class ApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api'

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Budget APIs
  async getBudgets(month?: number, year?: number) {
    const params = new URLSearchParams()
    if (month) params.append('month', month.toString())
    if (year) params.append('year', year.toString())

    return this.request<Budget[]>(`/budgets?${params}`)
  }

  async getBudget(id: string) {
    return this.request<Budget>(`/budgets/${id}`)
  }

  async createBudget(data: Partial<Budget>) {
    return this.request<Budget>('/budgets', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateBudget(id: string, data: Partial<Budget>) {
    return this.request<Budget>(`/budgets/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteBudget(id: string) {
    return this.request<void>(`/budgets/${id}`, {
      method: 'DELETE',
    })
  }

  // Transaction APIs
  async getTransactions(params?: {
    category?: string
    startDate?: Date
    endDate?: Date
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.append('category', params.category)
    if (params?.startDate)
      searchParams.append('startDate', params.startDate.toISOString())
    if (params?.endDate)
      searchParams.append('endDate', params.endDate.toISOString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    return this.request<Transaction[]>(`/transactions?${searchParams}`)
  }

  async getTransaction(id: string) {
    return this.request<Transaction>(`/transactions/${id}`)
  }

  async createTransaction(data: Partial<Transaction>) {
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateTransaction(id: string, data: Partial<Transaction>) {
    return this.request<Transaction>(`/transactions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteTransaction(id: string) {
    return this.request<void>(`/transactions/${id}`, {
      method: 'DELETE',
    })
  }

  // Goal APIs
  async getGoals() {
    return this.request<Goal[]>('/goals')
  }

  async getGoal(id: string) {
    return this.request<Goal>(`/goals/${id}`)
  }

  async createGoal(data: Partial<Goal>) {
    return this.request<Goal>('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateGoal(id: string, data: Partial<Goal>) {
    return this.request<Goal>(`/goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteGoal(id: string) {
    return this.request<void>(`/goals/${id}`, {
      method: 'DELETE',
    })
  }

  // User Settings APIs
  async getUserSettings() {
    return this.request<UserSettings>('/user/settings')
  }

  async updateUserSettings(data: Partial<UserSettings>) {
    return this.request<UserSettings>('/user/settings', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Dashboard Stats
  async getDashboardStats() {
    return this.request<{
      availableIncome: number
      totalBudgeted: number
      totalSpent: number
      savingsRunway: {
        monthsRemaining: number
        currentSavings: number
        monthlyExpenses: number
      }
    }>('/dashboard/stats')
  }
}

export const apiClient = new ApiClient()
