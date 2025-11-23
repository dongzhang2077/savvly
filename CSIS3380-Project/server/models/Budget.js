import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    spent: {
      type: Number,
      default: 0,
      min: 0,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
    },
    rolloverType: {
      type: String,
      enum: ["full", "partial", "none", "goal"],
      default: "full",
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", budgetSchema);
