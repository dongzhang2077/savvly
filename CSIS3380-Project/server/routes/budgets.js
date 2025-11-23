import { Router } from "express";
import Budget from "../models/Budget.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/budgets
router.get("/", async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = { userId: req.user.id };

    if (month) query.month = Number(month);
    if (year) query.year = Number(year);

    const budgets = await Budget.find(query).sort({
      year: -1,
      month: -1,
      category: 1,
    });
    res.json(budgets);
  } catch (error) {
    console.error("List budgets failed:", error);
    res.status(500).json({ error: "Failed to load budgets" });
  }
});

// GET /api/budgets/:id
router.get("/:id", async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!budget) return res.status(404).json({ error: "Budget not found" });
    res.json(budget);
  } catch (error) {
    console.error("Get budget failed:", error);
    res.status(500).json({ error: "Failed to load budget" });
  }
});

// POST /api/budgets
router.post("/", async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(budget);
  } catch (error) {
    console.error("Create budget failed:", error);
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/budgets/:id
router.put("/:id", async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!budget) return res.status(404).json({ error: "Budget not found" });

    res.json(budget);
  } catch (error) {
    console.error("Update budget failed:", error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/budgets/:id
router.delete("/:id", async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Delete budget failed:", error);
    res.status(500).json({ error: "Failed to delete budget" });
  }
});

export default router;
