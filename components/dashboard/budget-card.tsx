'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MoreHorizontal } from 'lucide-react'
import { formatCurrency, getProgressPercentage, getProgressColor } from '@/lib/utils'
import { BUDGET_CATEGORIES } from '@/lib/constants'

interface BudgetCardProps {
  category: string
  budgeted: number
  spent: number
  rolloverAmount?: number
  onClick?: () => void
}

export function BudgetCard({
  category,
  budgeted,
  spent,
  rolloverAmount = 0,
  onClick,
}: BudgetCardProps) {
  const categoryInfo = BUDGET_CATEGORIES.find((c) => c.value === category)
  const percentage = getProgressPercentage(spent, budgeted)
  const remaining = Math.max(0, budgeted - spent)
  const isOverBudget = spent > budgeted

  return (
    <Card
      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{categoryInfo?.emoji || '📌'}</span>
          <div>
            <h3 className="font-semibold text-gray-900">
              {categoryInfo?.label || category}
            </h3>
            <p className="text-sm text-gray-500">
              {formatCurrency(spent)} / {formatCurrency(budgeted)}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress value={Math.min(percentage, 100)} className="h-2" />
        <div className="mt-2 flex items-center justify-between text-sm">
          <span
            className={
              isOverBudget ? 'text-attention-500' : 'text-secondary-600'
            }
          >
            {percentage}% used
          </span>
          {!isOverBudget ? (
            <span className="text-gray-600">
              {formatCurrency(remaining)} left
            </span>
          ) : (
            <span className="text-attention-500">
              {formatCurrency(Math.abs(remaining))} over
            </span>
          )}
        </div>
      </div>

      {/* Rollover Info */}
      {rolloverAmount > 0 && (
        <div className="mt-3 pt-3 border-t">
          <Badge variant="secondary">
            +{formatCurrency(rolloverAmount)} rolled over
          </Badge>
        </div>
      )}

      {/* Status Message */}
      {isOverBudget && (
        <p className="mt-3 text-sm text-attention-500">
          You're over budget - let's review together
        </p>
      )}
      {!isOverBudget && percentage > 70 && (
        <p className="mt-3 text-sm text-accent-600">
          Getting close to your budget - you got this!
        </p>
      )}
      {!isOverBudget && percentage <= 70 && (
        <p className="mt-3 text-sm text-secondary-600">
          Looking good! You're on track
        </p>
      )}
    </Card>
  )
}
