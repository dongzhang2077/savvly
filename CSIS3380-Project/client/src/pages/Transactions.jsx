import { useEffect, useState } from "react";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../services/api";

const getInitialForm = () => ({
  description: "",
  category: "",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  isIncome: false,
  notes: "",
});

const formatCurrency = (value) => `$${Number(value).toFixed(2)}`;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(getInitialForm);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTransactions = async (overrideLimit = limit) => {
    setLoading(true);
    setError("");

    try {
      const data = await getTransactions({ limit: overrideLimit });
      setTransactions(data);
    } catch (err) {
      setError(err.message || "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
      };
      const created = await createTransaction(payload);
      setTransactions((prev) => [created, ...prev]);
      setForm(getInitialForm());
    } catch (err) {
      setError(err.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('transactionDeleted'));
    } catch (err) {
      setError(err.message || "Failed to delete transaction");
    }
  };

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Transactions</h1>
        <p className="text-muted">Track your income and expenses</p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-4">Add transaction</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input
                  name="description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Coffee run"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <input
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Dining"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Amount</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    name="amount"
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <label className="form-label">Date</label>
                <input
                  name="date"
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Type</label>
                <div className="form-check form-switch mt-2">
                  <input
                    name="isIncome"
                    type="checkbox"
                    className="form-check-input"
                    id="isIncomeSwitch"
                    checked={form.isIncome}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="isIncomeSwitch">
                    {form.isIncome ? "Income" : "Expense"}
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  rows="3"
                  className="form-control"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Optional notes"
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add transaction
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="card-title fw-bold mb-1">Recent activity</h5>
              <p className="text-muted small mb-0">Your latest transactions</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="text-muted small mb-0">Show:</label>
              <select
                className="form-select form-select-sm"
                style={{ width: "auto" }}
                value={limit}
                onChange={(event) => setLimit(Number(event.target.value))}
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {transactions.length === 0 ? (
            <div className="text-center py-5">
              <svg
                width="48"
                height="48"
                fill="currentColor"
                className="text-muted mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              <p className="text-muted">No transactions yet</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th className="text-end">Amount</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn._id}>
                      <td className="fw-semibold">{txn.description}</td>
                      <td className="text-capitalize">{txn.category}</td>
                      <td>
                        <span
                          className={`badge ${
                            txn.isIncome ? "bg-success" : "bg-warning"
                          }`}
                        >
                          {txn.isIncome ? "Income" : "Expense"}
                        </span>
                      </td>
                      <td className="text-end fw-semibold">
                        <span className={txn.isIncome ? "text-success" : "text-dark"}>
                          {formatCurrency(txn.amount)}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(txn._id)}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Transactions;
