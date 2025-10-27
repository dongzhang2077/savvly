// Savvly Type Definitions

export type BudgetMode = "accumulation" | "runway"

export type RolloverType = "full" | "partial" | "none" | "goal"

export type IncomePattern = "regular" | "irregular"

export interface BudgetCategory {
  name: string
  icon?: string
  defaultRolloverType: RolloverType
  isFixed?: boolean
}

export interface SavingsRunway {
  currentSavings: number
  monthlyExpenses: number
  monthsRemaining: number
  projectedDepletion: Date | null
}

export interface TaxReservation {
  rate: number
  reserved: number
  income: number
}

export interface BudgetSummary {
  totalBudgeted: number
  totalSpent: number
  remaining: number
  categoryBreakdown: {
    category: string
    budgeted: number
    spent: number
    remaining: number
    rolloverAmount: number
  }[]
}
