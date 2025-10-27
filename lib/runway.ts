// Savvly Savings Runway Calculator

import type { SavingsRunway } from "@/types"

/**
 * Calculate savings runway (months remaining)
 */
export function calculateRunway(
  currentSavings: number,
  monthlyExpenses: number
): SavingsRunway {
  if (monthlyExpenses <= 0) {
    return {
      currentSavings,
      monthlyExpenses,
      monthsRemaining: 0,
      projectedDepletion: null,
    }
  }

  const monthsRemaining = currentSavings / monthlyExpenses

  // Calculate projected depletion date
  let projectedDepletion: Date | null = null
  if (monthsRemaining > 0) {
    projectedDepletion = new Date()
    projectedDepletion.setMonth(projectedDepletion.getMonth() + Math.floor(monthsRemaining))
  }

  return {
    currentSavings,
    monthlyExpenses,
    monthsRemaining,
    projectedDepletion,
  }
}

/**
 * Get runway status message (empowering, non-anxious tone)
 */
export function getRunwayMessage(monthsRemaining: number): {
  message: string
  tone: "positive" | "neutral" | "attention"
} {
  if (monthsRemaining >= 12) {
    return {
      message: `Great position! You have ${Math.floor(monthsRemaining)} months of runway.`,
      tone: "positive",
    }
  } else if (monthsRemaining >= 6) {
    return {
      message: `You have ${Math.floor(monthsRemaining)} months of runway - solid cushion.`,
      tone: "positive",
    }
  } else if (monthsRemaining >= 3) {
    return {
      message: `${Math.floor(monthsRemaining)} months of runway. Consider your next steps.`,
      tone: "neutral",
    }
  } else if (monthsRemaining >= 1) {
    return {
      message: `${Math.floor(monthsRemaining)} month(s) of runway. Time to plan ahead.`,
      tone: "attention",
    }
  } else {
    return {
      message: "Less than 1 month of runway. Let's review your options.",
      tone: "attention",
    }
  }
}
