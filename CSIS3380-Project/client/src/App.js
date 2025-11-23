import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Budgets from "./pages/Budgets";
import BudgetForm from "./pages/BudgetForm";
import Transactions from "./pages/Transactions";
import ExchangeRates from "./pages/ExchangeRates";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-brand">Savvly</div>
          <ul className="nav-links">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/budgets">Budgets</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/exchange-rates">Exchange Rates</Link>
            </li>
          </ul>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/budgets/new" element={<BudgetForm />} />
            <Route path="/budgets/edit/:id" element={<BudgetForm />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
