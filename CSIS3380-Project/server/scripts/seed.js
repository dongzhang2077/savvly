import dotenv from "dotenv";

import { connectDB } from "../config/db.js";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";
import budgetsData from "../../data/budgets.json" with { type: "json" };
import transactionsData from "../../data/transactions.json" with { type: "json" };

dotenv.config();

async function seedDatabase() {
  try {
    await connectDB();

    await Budget.deleteMany({});
    await Transaction.deleteMany({});

    await Budget.insertMany(budgetsData);
    await Transaction.insertMany(transactionsData);

    console.log(
      `✅ Inserted ${budgetsData.length} budgets and ${transactionsData.length} transactions`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
