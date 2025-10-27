import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  budgetMode: z.enum(["IRREGULAR_INCOME", "FIXED_INCOME", "RUNWAY_MODE"]).optional(),
  taxRate: z.number().min(0).max(1).optional(),
  currentSavings: z.number().min(0).optional(),
  monthlyExpenses: z.number().min(0).optional(),
});

// GET /api/user/settings - Get user settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    const settings = await prisma.userSettings.findUnique({
      where: {
        userId: session.user.id,
      }
    });

    if (!settings) {
      // Create default settings if not exists
      const newSettings = await prisma.userSettings.create({
        data: {
          userId: session.user.id,
          budgetMode: "IRREGULAR_INCOME",
          taxRate: 0.28, // Default BC rate
          currentSavings: 0,
          monthlyExpenses: 0,
        }
      });

      return NextResponse.json({ settings: newSettings });
    }

    return NextResponse.json({ settings });

  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "获取设置失败" },
      { status: 500 }
    );
  }
}

// PATCH /api/user/settings - Update user settings
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = settingsSchema.parse(body);

    const settings = await prisma.userSettings.upsert({
      where: {
        userId: session.user.id,
      },
      update: validatedData,
      create: {
        userId: session.user.id,
        budgetMode: validatedData.budgetMode || "IRREGULAR_INCOME",
        taxRate: validatedData.taxRate || 0.28,
        currentSavings: validatedData.currentSavings || 0,
        monthlyExpenses: validatedData.monthlyExpenses || 0,
      }
    });

    return NextResponse.json(
      { message: "设置更新成功", settings }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "验证失败", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "更新设置失败" },
      { status: 500 }
    );
  }
}
