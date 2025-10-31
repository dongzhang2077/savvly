'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { StatCard } from '@/components/dashboard/stat-card'
import { BudgetCard } from '@/components/dashboard/budget-card'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DollarSign,
  TrendingUp,
  Wallet,
  PiggyBank,
  Plus,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Mock data - will be replaced with real API calls
const mockStats = {
  availableIncome: 5240.0,
  totalBudgeted: 4500.0,
  totalSpent: 3125.5,
  savingsRunway: {
    monthsRemaining: 8.5,
    currentSavings: 25000.0,
    monthlyExpenses: 2940.0,
  },
}

const mockBudgets = [
  {
    id: '1',
    category: 'food',
    budgeted: 600,
    spent: 425.5,
    rolloverAmount: 50,
  },
  {
    id: '2',
    category: 'transport',
    budgeted: 300,
    spent: 280.0,
    rolloverAmount: 0,
  },
  {
    id: '3',
    category: 'entertainment',
    budgeted: 200,
    spent: 145.25,
    rolloverAmount: 25,
  },
  {
    id: '4',
    category: 'housing',
    budgeted: 1800,
    spent: 1800.0,
    rolloverAmount: 200,
  },
  {
    id: '5',
    category: 'utilities',
    budgeted: 150,
    spent: 142.75,
    rolloverAmount: 0,
  },
  {
    id: '6',
    category: 'healthcare',
    budgeted: 100,
    spent: 85.0,
    rolloverAmount: 0,
  },
]

export default function DashboardPage() {
  const hasBudgets = mockBudgets.length > 0
  const savingsRate = Math.round(
    ((mockStats.availableIncome - mockStats.totalSpent) /
      mockStats.availableIncome) *
      100
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              👋 Welcome back!
            </h1>
            <p className="text-gray-500 mt-1">
              Here's how your budget is looking this month
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Available Income"
            value={formatCurrency(mockStats.availableIncome)}
            description="This month"
            icon={DollarSign}
          />
          <StatCard
            title="Total Spent"
            value={formatCurrency(mockStats.totalSpent)}
            description={`${Math.round((mockStats.totalSpent / mockStats.totalBudgeted) * 100)}% of budget`}
            icon={Wallet}
          />
          <StatCard
            title="Savings Rate"
            value={`${savingsRate}%`}
            description="Looking good!"
            icon={PiggyBank}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Runway"
            value={`${mockStats.savingsRunway.monthsRemaining} months`}
            description="Solid cushion"
            icon={TrendingUp}
          />
        </div>

        {/* Budget Health Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Budget Health
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You're on track this month!
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-secondary-50 rounded-lg p-4">
              <p className="text-sm font-medium text-secondary-900">
                On Track
              </p>
              <p className="text-2xl font-bold text-secondary-600 mt-1">4</p>
              <p className="text-xs text-secondary-700 mt-1">categories</p>
            </div>
            <div className="bg-accent-50 rounded-lg p-4">
              <p className="text-sm font-medium text-accent-900">
                Getting Close
              </p>
              <p className="text-2xl font-bold text-accent-600 mt-1">2</p>
              <p className="text-xs text-accent-700 mt-1">categories</p>
            </div>
            <div className="bg-attention-50 rounded-lg p-4">
              <p className="text-sm font-medium text-attention-900">
                Over Budget
              </p>
              <p className="text-2xl font-bold text-attention-500 mt-1">0</p>
              <p className="text-xs text-attention-700 mt-1">categories</p>
            </div>
          </div>
        </Card>

        {/* Budget Cards Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Budgets
            </h2>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create Budget
            </Button>
          </div>

          {hasBudgets ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockBudgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  category={budget.category}
                  budgeted={budget.budgeted}
                  spent={budget.spent}
                  rolloverAmount={budget.rolloverAmount}
                  onClick={() => console.log('Budget clicked:', budget.id)}
                />
              ))}
            </div>
          ) : (
            <Card>
              <EmptyState
                icon={Wallet}
                title="No budgets yet"
                description="Ready to create your first budget? Let's get started!"
                action={{
                  label: 'Create Your First Budget',
                  onClick: () => console.log('Create budget'),
                }}
              />
            </Card>
          )}
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="space-y-3">
            {/* Mock transaction items */}
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span>🍔</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Grocery Store</p>
                  <p className="text-sm text-gray-500">Food & Dining</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(85.5)}
                </p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span>🚗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Gas Station</p>
                  <p className="text-sm text-gray-500">Transportation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {formatCurrency(45.0)}
                </p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                  <span>💰</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Freelance Payment</p>
                  <p className="text-sm text-gray-500">Income</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-secondary-600">
                  +{formatCurrency(2500.0)}
                </p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
