import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateTransactionSchema = z.object({
  amount: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  description: z.string().optional(),
  date: z.string().optional(),
});

// GET /api/transactions/[id] - Get single transaction
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaction });

  } catch (error) {
    console.error("Get transaction error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}

// PATCH /api/transactions/[id] - Update transaction
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateTransactionSchema.parse(body);

    // Verify transaction ownership
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // If amount or category changed and it's an expense, update budget
    if (
      existingTransaction.type === "EXPENSE" &&
      (validatedData.amount || validatedData.category)
    ) {
      const oldMonth = existingTransaction.date.getMonth() + 1;
      const oldYear = existingTransaction.date.getFullYear();

      // Revert old budget spent
      const oldBudget = await prisma.budget.findUnique({
        where: {
          userId_category_month_year: {
            userId: session.user.id,
            category: existingTransaction.category,
            month: oldMonth,
            year: oldYear,
          }
        }
      });

      if (oldBudget) {
        await prisma.budget.update({
          where: { id: oldBudget.id },
          data: {
            spent: {
              decrement: existingTransaction.amount,
            }
          }
        });
      }

      // Add to new budget
      const newCategory = validatedData.category || existingTransaction.category;
      const newAmount = validatedData.amount || existingTransaction.amount;

      const newBudget = await prisma.budget.findUnique({
        where: {
          userId_category_month_year: {
            userId: session.user.id,
            category: newCategory,
            month: oldMonth,
            year: oldYear,
          }
        }
      });

      if (newBudget) {
        await prisma.budget.update({
          where: { id: newBudget.id },
          data: {
            spent: {
              increment: newAmount,
            }
          }
        });
      }
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: {
        ...validatedData,
        date: validatedData.date ? new Date(validatedData.date) : undefined,
      },
    });

    return NextResponse.json(
      { message: "Transaction updated successfully", transaction }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Update transaction error:", error);
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/[id] - Delete transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify transaction ownership
    const existingTransaction = await prisma.transaction.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // If it's an expense, update budget
    if (existingTransaction.type === "EXPENSE") {
      const month = existingTransaction.date.getMonth() + 1;
      const year = existingTransaction.date.getFullYear();

      const budget = await prisma.budget.findUnique({
        where: {
          userId_category_month_year: {
            userId: session.user.id,
            category: existingTransaction.category,
            month,
            year,
          }
        }
      });

      if (budget) {
        await prisma.budget.update({
          where: { id: budget.id },
          data: {
            spent: {
              decrement: existingTransaction.amount,
            }
          }
        });
      }
    }

    await prisma.transaction.delete({
      where: {
        id: params.id,
      }
    });

    return NextResponse.json(
      { message: "Transaction deleted successfully" }
    );

  } catch (error) {
    console.error("Delete transaction error:", error);
    return NextResponse.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
