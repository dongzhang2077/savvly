import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBudget, getBudgets } from "../services/api";

const getInitialFilters = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
};

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const rolloverStyles = {
  MONTHLY: "rollover-monthly",
  ANNUAL: "rollover-annual",
  NONE: "rollover-none",
};

const getRolloverPill = (type = "NONE") =>
  rolloverStyles[type] || rolloverStyles.NONE;

const Budgets = () => {
  const [filters, setFilters] = useState(getInitialFilters);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBudgets = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getBudgets(filters);
      setBudgets(data);
    } catch (err) {
      setError(err.message || "Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.month, filters.year]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this budget?")) return;

    try {
      await deleteBudget(id);
      setBudgets((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete budget");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-1">Budgets</h2>
              <div className="d-flex gap-2 align-items-center">
                <select
                  name="month"
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                  value={filters.month}
                  onChange={handleFilterChange}
                >
                  {Array.from({ length: 12 }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {new Date(2025, index).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
                <input
                  name="year"
                  type="number"
                  className="form-control form-control-sm"
                  style={{ width: "100px" }}
                  value={filters.year}
                  onChange={handleFilterChange}
                  min="2020"
                  max="2100"
                />
              </div>
            </div>
            <Link className="btn btn-primary" to="/budgets/new">
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              New Budget
            </Link>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {budgets.length === 0 ? (
            <div className="text-center py-5">
              <svg
                width="64"
                height="64"
                fill="currentColor"
                className="text-muted mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
              </svg>
              <p className="text-muted">No budgets for this period</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th style={{ width: "40%" }}>Progress</th>
                    <th className="text-end">Budgeted</th>
                    <th className="text-end">Spent</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {budgets.map((budget) => {
                    const percentage = Math.min(
                      (budget.spent / budget.amount) * 100,
                      100
                    );
                    const isOverspent = budget.spent > budget.amount;
                    return (
                      <tr key={budget._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                              style={{
                                width: "32px",
                                height: "32px",
                                backgroundColor: isOverspent
                                  ? "#fee"
                                  : "#e7f3ff",
                              }}
                            >
                              <span style={{ fontSize: "18px" }}>
                                {getCategoryIcon(budget.category)}
                              </span>
                            </div>
                            <span className="fw-semibold text-capitalize">
                              {budget.category}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                            >
                              <div
                                className={`progress-bar ${
                                  isOverspent ? "bg-danger" : "bg-primary"
                                }`}
                                role="progressbar"
                                style={{ width: `${percentage}%` }}
                                aria-valuenow={percentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                            <span
                              className={`badge ${
                                isOverspent ? "bg-danger" : "bg-secondary"
                              }`}
                              style={{ minWidth: "50px" }}
                            >
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-end fw-semibold">
                          {formatCurrency(budget.amount)}
                        </td>
                        <td className="text-end">
                          <span
                            className={
                              isOverspent ? "text-danger fw-semibold" : ""
                            }
                          >
                            {formatCurrency(budget.spent)}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center">
                            <Link
                              className="btn btn-sm btn-outline-secondary"
                              to={`/budgets/edit/${budget._id}`}
                            >
                              <svg
                                width="14"
                                height="14"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                              </svg>
                            </Link>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(budget._id)}
                            >
                              <svg
                                width="14"
                                height="14"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    food: "🍔",
    housing: "🏠",
    transportation: "🚗",
    utilities: "💡",
    internet: "🌐",
    entertainment: "🎬",
    "personal care": "💅",
    insurance: "🛡️",
    health: "⚕️",
    education: "📚",
    gifts: "🎁",
    travel: "✈️",
    subscriptions: "📺",
    "emergency fund": "🚨",
    "tax reserve": "📋",
  };
  return icons[category.toLowerCase()] || "💰";
};

export default Budgets;
