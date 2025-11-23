import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getBudgets, getTransactions } from "../services/api";

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetData, transactionData] = await Promise.all([
          getBudgets(),
          getTransactions({ limit: 5 }),
        ]);
        setBudgets(budgetData);
        setTransactions(transactionData);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Listen for transaction changes
    const handleTransactionChange = () => {
      fetchData();
    };

    window.addEventListener('transactionDeleted', handleTransactionChange);
    return () => {
      window.removeEventListener('transactionDeleted', handleTransactionChange);
    };
  }, []);

  const stats = useMemo(() => {
    const totalBudgeted = budgets.reduce((sum, item) => sum + item.amount, 0);
    const totalSpent = budgets.reduce((sum, item) => sum + item.spent, 0);
    const overspentCount = budgets.filter(
      (item) => item.spent > item.amount
    ).length;

    const inflow = transactions
      .filter((txn) => txn.isIncome)
      .reduce((sum, txn) => sum + txn.amount, 0);

    const outflow = transactions
      .filter((txn) => !txn.isIncome)
      .reduce((sum, txn) => sum + txn.amount, 0);

    return {
      totalBudgeted,
      totalSpent,
      remaining: totalBudgeted - totalSpent,
      overspentCount,
      inflow,
      outflow,
      netFlow: inflow - outflow,
      budgetProgress: totalBudgeted
        ? Math.min((totalSpent / totalBudgeted) * 100, 100)
        : 0,
    };
  }, [budgets, transactions]);

  if (loading) return <p className="muted">Loading overview...</p>;
  if (error)
    return (
      <div className="card">
        <h2>Dashboard</h2>
        <p className="muted">{error}</p>
      </div>
    );

  const overspentBudgets = budgets.filter((item) => item.spent > item.amount);

  return (
    <section className="dashboard-page">
      <div className="card bg-light border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="text-muted text-uppercase small mb-1">
                Monthly outlook
              </p>
              <h1 className="display-4 fw-bold text-dark mb-2">
                ${stats.remaining.toFixed(2)}
              </h1>

              <div className="mb-2">
                <div className="progress" style={{ height: "12px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${stats.budgetProgress}%` }}
                    aria-valuenow={stats.budgetProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="d-flex justify-content-between mt-2 small text-muted">
                  <span>Budget used</span>
                  <span className="fw-semibold">
                    {stats.budgetProgress.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="text-center mb-3">
                <p className="text-muted small mb-1">Net flow</p>
                <h2 className="display-6 fw-bold text-dark">
                  ${stats.netFlow.toFixed(2)}
                </h2>
              </div>
              <Link to="/transactions" className="btn btn-primary w-100 mb-2">
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
              </Link>
              <Link to="/budgets" className="btn btn-outline-secondary w-100">
                Adjust budgets
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "default" }}
          >
            <div className="card-body text-center">
              <div
                className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e7f3ff",
                }}
              >
                <svg width="24" height="24" fill="#0d6efd" viewBox="0 0 16 16">
                  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                </svg>
              </div>
              <p className="text-muted small mb-1">Total Budgeted</p>
              <h3 className="fw-bold text-dark mb-0">
                ${stats.totalBudgeted.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "default" }}
          >
            <div className="card-body text-center">
              <div
                className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#fff3cd",
                }}
              >
                <svg width="24" height="24" fill="#ffc107" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
              </div>
              <p className="text-muted small mb-1">Total Spent</p>
              <h3 className="fw-bold text-dark mb-0">
                ${stats.totalSpent.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ cursor: "default" }}
          >
            <div className="card-body text-center">
              <div
                className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#d1f4e0",
                }}
              >
                <svg width="24" height="24" fill="#198754" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              </div>
              <p className="text-muted small mb-1">Income</p>
              <h3 className="fw-bold text-success mb-0">
                ${stats.inflow.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          {stats.overspentCount > 0 ? (
            <Link
              to="/budgets"
              className="card border-0 shadow-sm h-100 text-decoration-none"
              style={{ transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div className="card-body text-center">
                <div
                  className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#ffe5e5",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="#dc3545"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                  </svg>
                </div>
                <p className="text-muted small mb-1">Overspent</p>
                <h3 className="fw-bold text-danger mb-0">
                  {stats.overspentCount}
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="ms-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    />
                  </svg>
                </h3>
              </div>
            </Link>
          ) : (
            <div
              className="card border-0 shadow-sm h-100"
              style={{ cursor: "default" }}
            >
              <div className="card-body text-center">
                <div
                  className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#d1f4e0",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="#198754"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </div>
                <p className="text-muted small mb-1">Overspent</p>
                <h3 className="fw-bold text-success mb-0">0</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {overspentBudgets.length > 0 && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">Overspent categories</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th style={{ width: "40%" }}>Progress</th>
                    <th className="text-end">Budgeted</th>
                    <th className="text-end">Spent</th>
                    <th className="text-end">Over</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {overspentBudgets.map((item) => {
                    const percentage = Math.min(
                      (item.spent / item.amount) * 100,
                      100
                    );
                    return (
                      <tr key={item._id}>
                        <td className="text-capitalize fw-semibold">
                          {item.category}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="progress flex-grow-1"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span
                              className="badge bg-danger"
                              style={{ minWidth: "50px" }}
                            >
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="text-end">${item.amount.toFixed(2)}</td>
                        <td className="text-end fw-semibold text-danger">
                          ${item.spent.toFixed(2)}
                        </td>
                        <td className="text-end">
                          <span className="badge bg-danger">
                            ${(item.spent - item.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/budgets/edit/${item._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            Adjust
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Latest activity</h5>
          {transactions.length === 0 ? (
            <div className="text-center py-4">
              <svg
                width="48"
                height="48"
                fill="currentColor"
                className="text-muted mb-2"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
              <p className="text-muted">No recent activity</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th className="text-end">Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn._id}>
                      <td>{txn.description}</td>
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
                        ${txn.amount.toFixed(2)}
                      </td>
                      <td className="text-muted small">
                        {new Date(txn.date).toLocaleDateString()}
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

export default Dashboard;
