// Savvly Tax Calculation (for Canadian freelancers/contractors)

import type { TaxReservation } from "@/types"

/**
 * Calculate tax reservation for income
 * Default 28% for BC, Canada (federal + provincial)
 */
export function calculateTaxReservation(
  income: number,
  taxRate: number = 0.28
): TaxReservation {
  const reserved = income * taxRate

  return {
    rate: taxRate,
    reserved,
    income,
  }
}

/**
 * Get recommended tax rate by province (Canada)
 */
export function getTaxRateByProvince(province: string): number {
  const rates: Record<string, number> = {
    BC: 0.28, // British Columbia
    AB: 0.25, // Alberta (lowest)
    SK: 0.27, // Saskatchewan
    MB: 0.28, // Manitoba
    ON: 0.29, // Ontario
    QC: 0.32, // Quebec (highest)
    NB: 0.28, // New Brunswick
    NS: 0.29, // Nova Scotia
    PE: 0.28, // Prince Edward Island
    NL: 0.29, // Newfoundland and Labrador
    YT: 0.27, // Yukon
    NT: 0.26, // Northwest Territories
    NU: 0.27, // Nunavut
  }

  return rates[province.toUpperCase()] || 0.28 // Default to BC rate
}

/**
 * Calculate net income after tax reservation
 */
export function getNetIncome(grossIncome: number, taxRate: number = 0.28): number {
  return grossIncome * (1 - taxRate)
}

/**
 * Get tax reminder message (empowering tone)
 */
export function getTaxReminderMessage(reserved: number): string {
  return `${reserved.toFixed(2)} set aside for taxes - you're covered!`
}
