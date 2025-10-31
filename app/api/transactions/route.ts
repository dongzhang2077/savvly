import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for transaction creation
const transactionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Please provide a category"),
  type: z.enum(["INCOME", "EXPENSE"], {
    errorMap: () => ({ message: "Type must be either income or expense" })
  }),
  description: z.string().optional(),
  date: z.string().optional(),
});

// GET /api/transactions - Get user's transactions
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
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build where clause
    const where: any = {
      userId: session.user.id,
    };

    if (category) {
      where.category = category;
    }

    if (type === "INCOME" || type === "EXPENSE") {
      where.type = type;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: {
          date: "desc"
        },
        take: limit,
        skip: offset,
      }),
      prisma.transaction.count({ where })
    ]);

    return NextResponse.json({
      transactions,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      }
    });

  } catch (error) {
    console.error("Get transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Create new transaction
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
    const validatedData = transactionSchema.parse(body);

    // Parse date or use current date
    const transactionDate = validatedData.date
      ? new Date(validatedData.date)
      : new Date();

    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        amount: validatedData.amount,
        category: validatedData.category,
        type: validatedData.type,
        description: validatedData.description || "",
        date: transactionDate,
      }
    });

    // Update budget spent amount if it's an expense
    if (validatedData.type === "EXPENSE") {
      const month = transactionDate.getMonth() + 1;
      const year = transactionDate.getFullYear();

      // Find matching budget
      const budget = await prisma.budget.findUnique({
        where: {
          userId_category_month_year: {
            userId: session.user.id,
            category: validatedData.category,
            month,
            year,
          }
        }
      });

      if (budget) {
        // Update spent amount
        await prisma.budget.update({
          where: {
            id: budget.id,
          },
          data: {
            spent: {
              increment: validatedData.amount,
            }
          }
        });
      }
    }

    return NextResponse.json(
      { message: "Transaction created successfully", transaction },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Create transaction error:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
