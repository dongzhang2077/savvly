import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/user/stats - Get user statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Get current month's budgets
    const budgets = await prisma.budget.findMany({
      where: {
        userId: session.user.id,
        month: currentMonth,
        year: currentYear,
      }
    });

    // Calculate total budget and spent
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

    // Get tax reserve budget
    const taxReserve = budgets.find(b => b.isTaxReserve);

    // Get recent transactions
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0);

    const [income, expenses] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId: session.user.id,
          type: "INCOME",
          date: {
            gte: startOfMonth,
            lte: endOfMonth,
          }
        },
        _sum: {
          amount: true,
        }
      }),
      prisma.transaction.aggregate({
        where: {
          userId: session.user.id,
          type: "EXPENSE",
          date: {
            gte: startOfMonth,
            lte: endOfMonth,
          }
        },
        _sum: {
          amount: true,
        }
      })
    ]);

    const totalIncome = income._sum.amount || 0;
    const totalExpenses = expenses._sum.amount || 0;
    const netCashFlow = totalIncome - totalExpenses;

    // Get user settings for runway calculation
    const settings = await prisma.userSettings.findUnique({
      where: {
        userId: session.user.id,
      }
    });

    let savingsRunway = 0;
    if (settings && settings.monthlyExpenses > 0) {
      savingsRunway = settings.currentSavings / settings.monthlyExpenses;
    }

    return NextResponse.json({
      stats: {
        currentMonth: {
          income: totalIncome,
          expenses: totalExpenses,
          netCashFlow,
        },
        budget: {
          total: totalBudget,
          spent: totalSpent,
          remaining: totalBudget - totalSpent,
          percentUsed: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
        },
        taxReserve: taxReserve ? {
          amount: taxReserve.amount,
          reserved: taxReserve.spent,
        } : null,
        savingsRunway: {
          months: savingsRunway,
          currentSavings: settings?.currentSavings || 0,
          monthlyExpenses: settings?.monthlyExpenses || 0,
        },
        budgetCategories: budgets.map(b => ({
          category: b.category,
          budgeted: b.amount,
          spent: b.spent,
          remaining: b.amount - b.spent,
          percentUsed: b.amount > 0 ? (b.spent / b.amount) * 100 : 0,
        }))
      }
    });

  } catch (error) {
    console.error("Get stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
