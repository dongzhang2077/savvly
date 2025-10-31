import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { CURRENCY_CONFIG, RUNWAY_THRESHOLDS } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
    style: 'currency',
    currency: CURRENCY_CONFIG.currency,
    minimumFractionDigits: CURRENCY_CONFIG.minimumFractionDigits,
    maximumFractionDigits: CURRENCY_CONFIG.maximumFractionDigits,
  }).format(amount)
}

/**
 * Format a date
 */
export function formatDate(
  date: Date | string,
  formatString: string = 'MMM dd, yyyy'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatString)
}

/**
 * Get progress percentage
 */
export function getProgressPercentage(spent: number, budgeted: number): number {
  if (budgeted === 0) return 0
  return Math.min(Math.round((spent / budgeted) * 100), 100)
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(percentage: number): string {
  if (percentage >= 100) return 'bg-attention-400'
  if (percentage >= 90) return 'bg-attention-400'
  if (percentage >= 70) return 'bg-accent-500'
  return 'bg-secondary-500'
}

/**
 * Get progress text color
 */
export function getProgressTextColor(percentage: number): string {
  if (percentage >= 100) return 'text-attention-500'
  if (percentage >= 90) return 'text-attention-500'
  if (percentage >= 70) return 'text-accent-600'
  return 'text-secondary-600'
}

/**
 * Get runway status
 */
export function getRunwayStatus(months: number): {
  status: 'excellent' | 'good' | 'moderate' | 'low' | 'critical'
  color: string
  message: string
} {
  if (months >= RUNWAY_THRESHOLDS.excellent) {
    return {
      status: 'excellent',
      color: 'text-secondary-600',
      message: `Great position! You have ${Math.round(months)} months of runway.`,
    }
  }
  if (months >= RUNWAY_THRESHOLDS.good) {
    return {
      status: 'good',
      color: 'text-secondary-600',
      message: `You have ${Math.round(months)} months of runway - solid cushion.`,
    }
  }
  if (months >= RUNWAY_THRESHOLDS.moderate) {
    return {
      status: 'moderate',
      color: 'text-accent-600',
      message: `${Math.round(months)} months of runway. Consider your next steps.`,
    }
  }
  if (months >= RUNWAY_THRESHOLDS.low) {
    return {
      status: 'low',
      color: 'text-attention-500',
      message: `${Math.round(months)} months of runway. Time to plan ahead.`,
    }
  }
  return {
    status: 'critical',
    color: 'text-attention-500',
    message: "Less than 1 month of runway. Let's review your options.",
  }
}

/**
 * Truncate text
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Calculate percentage change
 */
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return 0
  return Math.round(((current - previous) / previous) * 100)
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
  const date = new Date()
  date.setMonth(month - 1)
  return format(date, 'MMMM')
}

/**
 * Get current month and year
 */
export function getCurrentMonthYear(): { month: number; year: number } {
  const now = new Date()
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
