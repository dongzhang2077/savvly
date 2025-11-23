import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.js";
import budgetsRouter from "./routes/budgets.js";
import transactionsRouter from "./routes/transactions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/budgets", budgetsRouter);
app.use("/api/transactions", transactionsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Savvly API is running" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
