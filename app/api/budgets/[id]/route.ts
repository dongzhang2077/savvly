import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateBudgetSchema = z.object({
  amount: z.number().positive().optional(),
  spent: z.number().min(0).optional(),
  rolloverStrategy: z.enum(["FULL", "PARTIAL", "NONE", "GOAL"]).optional(),
});

// GET /api/budgets/[id] - Get single budget
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

    const budget = await prisma.budget.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!budget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ budget });

  } catch (error) {
    console.error("Get budget error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}

// PATCH /api/budgets/[id] - Update budget
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
    const validatedData = updateBudgetSchema.parse(body);

    // Verify budget ownership
    const existingBudget = await prisma.budget.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!existingBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    const budget = await prisma.budget.update({
      where: {
        id: params.id,
      },
      data: validatedData,
    });

    return NextResponse.json(
      { message: "Budget updated successfully", budget }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Update budget error:", error);
    return NextResponse.json(
      { error: "Failed to update budget" },
      { status: 500 }
    );
  }
}

// DELETE /api/budgets/[id] - Delete budget
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

    // Verify budget ownership
    const existingBudget = await prisma.budget.findUnique({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    });

    if (!existingBudget) {
      return NextResponse.json(
        { error: "Budget not found" },
        { status: 404 }
      );
    }

    await prisma.budget.delete({
      where: {
        id: params.id,
      }
    });

    return NextResponse.json(
      { message: "Budget deleted successfully" }
    );

  } catch (error) {
    console.error("Delete budget error:", error);
    return NextResponse.json(
      { error: "Failed to delete budget" },
      { status: 500 }
    );
  }
}
