import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for budget creation
const budgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020),
  rolloverStrategy: z.enum(["FULL", "PARTIAL", "NONE", "GOAL"]).optional(),
  isTaxReserve: z.boolean().optional(),
});

// GET /api/budgets - Get user's budgets
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    let budgets;

    if (month && year) {
      // Get budgets for specific month
      budgets = await prisma.budget.findMany({
        where: {
          userId: session.user.id,
          month: parseInt(month),
          year: parseInt(year),
        },
        orderBy: {
          category: "asc"
        }
      });
    } else {
      // Get current month's budgets
      const now = new Date();
      budgets = await prisma.budget.findMany({
        where: {
          userId: session.user.id,
          month: now.getMonth() + 1,
          year: now.getFullYear(),
        },
        orderBy: {
          category: "asc"
        }
      });
    }

    return NextResponse.json({ budgets });

  } catch (error) {
    console.error("Get budgets error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

// POST /api/budgets - Create new budget
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = budgetSchema.parse(body);

    // Check if budget already exists for this category/month/year
    const existingBudget = await prisma.budget.findUnique({
      where: {
        userId_category_month_year: {
          userId: session.user.id,
          category: validatedData.category,
          month: validatedData.month,
          year: validatedData.year,
        }
      }
    });

    if (existingBudget) {
      return NextResponse.json(
        { error: "Budget already exists for this category" },
        { status: 400 }
      );
    }

    const budget = await prisma.budget.create({
      data: {
        userId: session.user.id,
        category: validatedData.category,
        amount: validatedData.amount,
        spent: 0,
        month: validatedData.month,
        year: validatedData.year,
        rolloverStrategy: validatedData.rolloverStrategy || "FULL",
        isTaxReserve: validatedData.isTaxReserve || false,
      }
    });

    return NextResponse.json(
      { message: "Budget created successfully", budget },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Create budget error:", error);
    return NextResponse.json(
      { error: "Failed to create budget" },
      { status: 500 }
    );
  }
}
