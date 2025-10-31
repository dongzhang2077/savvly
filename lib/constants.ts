/**
 * Constants for Savvly App
 */

// Budget Categories with emojis
export const BUDGET_CATEGORIES = [
  { value: 'housing', label: 'Housing', emoji: '🏠', color: 'blue' },
  { value: 'food', label: 'Food & Dining', emoji: '🍔', color: 'green' },
  { value: 'transport', label: 'Transportation', emoji: '🚗', color: 'purple' },
  { value: 'utilities', label: 'Utilities', emoji: '💡', color: 'yellow' },
  { value: 'healthcare', label: 'Healthcare', emoji: '🏥', color: 'red' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬', color: 'pink' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️', color: 'orange' },
  { value: 'education', label: 'Education', emoji: '📚', color: 'indigo' },
  { value: 'personal', label: 'Personal Care', emoji: '💆', color: 'teal' },
  { value: 'savings', label: 'Savings', emoji: '💰', color: 'emerald' },
  { value: 'debt', label: 'Debt Payment', emoji: '💳', color: 'gray' },
  { value: 'insurance', label: 'Insurance', emoji: '🛡️', color: 'cyan' },
  { value: 'other', label: 'Other', emoji: '📌', color: 'slate' },
] as const

export type BudgetCategory = (typeof BUDGET_CATEGORIES)[number]['value']

// Rollover Strategies
export const ROLLOVER_STRATEGIES = [
  {
    value: 'full',
    label: 'Full Rollover',
    description: '100% of unspent budget carries to next month',
    emoji: '📈',
    useCase: 'Best for irregular expenses like rent or annual fees',
  },
  {
    value: 'partial',
    label: 'Partial Rollover',
    description: 'A percentage carries forward, rest resets',
    emoji: '📊',
    useCase: 'Good for flexible spending like entertainment',
  },
  {
    value: 'none',
    label: 'No Rollover',
    description: 'Budget resets completely each month',
    emoji: '🔄',
    useCase: 'Traditional monthly budgeting approach',
  },
  {
    value: 'goal',
    label: 'Goal-Based',
    description: 'Accumulates until target amount is reached',
    emoji: '🎯',
    useCase: 'Perfect for saving towards specific goals',
  },
] as const

export type RolloverStrategy = (typeof ROLLOVER_STRATEGIES)[number]['value']

// Budget Modes
export const BUDGET_MODES = [
  {
    value: 'accumulation',
    label: 'Accumulation Mode',
    description: 'Save and accumulate unspent budget',
    icon: '📈',
  },
  {
    value: 'runway',
    label: 'Runway Mode',
    description: 'Track how many months of savings you have',
    icon: '🛬',
  },
] as const

export type BudgetMode = (typeof BUDGET_MODES)[number]['value']

// Income Patterns
export const INCOME_PATTERNS = [
  { value: 'regular', label: 'Regular Income', description: 'Steady monthly income' },
  {
    value: 'irregular',
    label: 'Irregular Income',
    description: 'Freelance/contract work',
  },
] as const

// Canadian Province Tax Rates
export const PROVINCE_TAX_RATES = [
  { code: 'AB', name: 'Alberta', rate: 0.25 },
  { code: 'BC', name: 'British Columbia', rate: 0.28 },
  { code: 'MB', name: 'Manitoba', rate: 0.28 },
  { code: 'NB', name: 'New Brunswick', rate: 0.28 },
  { code: 'NL', name: 'Newfoundland and Labrador', rate: 0.29 },
  { code: 'NT', name: 'Northwest Territories', rate: 0.26 },
  { code: 'NS', name: 'Nova Scotia', rate: 0.29 },
  { code: 'NU', name: 'Nunavut', rate: 0.27 },
  { code: 'ON', name: 'Ontario', rate: 0.29 },
  { code: 'PE', name: 'Prince Edward Island', rate: 0.28 },
  { code: 'QC', name: 'Quebec', rate: 0.32 },
  { code: 'SK', name: 'Saskatchewan', rate: 0.27 },
  { code: 'YT', name: 'Yukon', rate: 0.27 },
] as const

// Runway Thresholds (in months)
export const RUNWAY_THRESHOLDS = {
  excellent: 12,
  good: 6,
  moderate: 3,
  low: 1,
} as const

// Currency Format
export const CURRENCY_CONFIG = {
  locale: 'en-CA',
  currency: 'CAD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const

// Date Formats
export const DATE_FORMATS = {
  display: 'MMM dd, yyyy',
  input: 'yyyy-MM-dd',
  monthYear: 'MMMM yyyy',
  short: 'MMM dd',
} as const

// Pagination
export const PAGINATION = {
  defaultLimit: 20,
  transactionLimit: 50,
  budgetLimit: 12, // One year
} as const

// Colors for charts and progress
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
  },
  accent: {
    50: '#fffbeb',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
  },
  attention: {
    400: '#fb923c',
    500: '#f97316',
  },
} as const

// Validation Rules
export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 100,
  },
  budget: {
    minAmount: 0,
    maxAmount: 1000000,
  },
  transaction: {
    minAmount: 0.01,
    maxAmount: 1000000,
    maxDescriptionLength: 200,
  },
  rollover: {
    minPercent: 0,
    maxPercent: 100,
  },
} as const

// Messages - Encouraging tone
export const MESSAGES = {
  budgetExceeded: "You're over budget - let's review together",
  budgetNearLimit: "Getting close to your budget - you got this!",
  budgetOnTrack: "Looking good! You're on track",
  taxReserved: "set aside for taxes - you're covered!",
  runwayExcellent: "Great position! You have {months} months of runway.",
  runwayGood: "You have {months} months of runway - solid cushion.",
  runwayModerate: "{months} months of runway. Consider your next steps.",
  runwayLow: "{months} months of runway. Time to plan ahead.",
  runwayCritical: "Less than 1 month of runway. Let's review your options.",
  emptyBudgets: "Ready to create your first budget?",
  emptyTransactions: "No transactions yet - let's add your first one!",
  emptyGoals: 'Set a goal and start working towards it!',
} as const
