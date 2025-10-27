// Savvly Budget Rollover Logic

import type { RolloverType } from "@/types"

export interface RolloverCalculation {
  remainingAmount: number
  rolloverAmount: number
  expiredAmount: number
}

/**
 * Calculate rollover amount for next month based on rollover type
 */
export function calculateRollover(
  budgeted: number,
  spent: number,
  rolloverType: RolloverType,
  rolloverPercent: number = 100
): RolloverCalculation {
  const remaining = Math.max(0, budgeted - spent)

  switch (rolloverType) {
    case "full":
      // 100% carries over to next month
      return {
        remainingAmount: remaining,
        rolloverAmount: remaining,
        expiredAmount: 0,
      }

    case "partial":
      // Partial rollover based on percentage
      const rollover = remaining * (rolloverPercent / 100)
      const expired = remaining - rollover
      return {
        remainingAmount: remaining,
        rolloverAmount: rollover,
        expiredAmount: expired,
      }

    case "none":
      // Monthly reset - nothing carries over
      return {
        remainingAmount: remaining,
        rolloverAmount: 0,
        expiredAmount: remaining,
      }

    case "goal":
      // Goal-oriented rollover - accumulates until target
      // (Target checking should be done by caller)
      return {
        remainingAmount: remaining,
        rolloverAmount: remaining,
        expiredAmount: 0,
      }

    default:
      // Default to full rollover
      return {
        remainingAmount: remaining,
        rolloverAmount: remaining,
        expiredAmount: 0,
      }
  }
}

/**
 * Get next month's starting budget including rollover
 */
export function getNextMonthBudget(
  baseAmount: number,
  rolloverAmount: number
): number {
  return baseAmount + rolloverAmount
}
