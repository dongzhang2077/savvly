import { useEffect, useState } from "react";
import { getExchangeRates } from "../services/api";

const spotlightCurrencies = ["CAD", "EUR", "GBP", "JPY", "AUD"];

const formatRate = (rate) => (rate ? rate.toFixed(4) : "—");

const ExchangeRates = () => {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRates = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getExchangeRates(base);
      setRates(response.rates);
      setTimestamp(response.time_last_update_utc);
    } catch (err) {
      setError(err.message || "Failed to load exchange rates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base]);

  return (
    <section className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Exchange Rates</h1>
        <p className="text-muted">Real-time currency exchange data</p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-semibold">Base currency</label>
              <input
                className="form-control"
                value={base}
                onChange={(event) => setBase(event.target.value.toUpperCase())}
                maxLength={3}
                placeholder="USD"
                style={{ textTransform: "uppercase" }}
              />
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={loadRates}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="me-2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                      />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                    Refresh rates
                  </>
                )}
              </button>
            </div>
          </div>

          {timestamp && (
            <div className="mt-3 text-muted small">
              <svg
                width="14"
                height="14"
                fill="currentColor"
                className="me-1"
                viewBox="0 0 16 16"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
              Last updated: {timestamp}
            </div>
          )}
          {error && (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-4">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="me-2"
              viewBox="0 0 16 16"
            >
              <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
            </svg>
            Spotlight currencies
          </h5>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading rates...</p>
            </div>
          ) : (
            <div className="row g-3">
              {spotlightCurrencies.map((code) => (
                <div className="col-md-4" key={code}>
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body text-center p-3">
                      <div
                        className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          backgroundColor: "#e7f3ff",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="#0d6efd"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                          <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
                        </svg>
                      </div>
                      <p className="text-muted small mb-1">
                        {code} / {base}
                      </p>
                      <h4 className="fw-bold mb-0">{formatRate(rates[code])}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-4">All exchange rates</h5>
          {Object.keys(rates).length === 0 ? (
            <div className="text-center py-5">
              <svg
                width="48"
                height="48"
                fill="currentColor"
                className="text-muted mb-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
                />
                <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
                <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
                <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
              </svg>
              <p className="text-muted">No rates loaded yet</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Currency Code</th>
                    <th className="text-end">Exchange Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rates)
                    .slice(0, 100)
                    .map(([code, rate]) => (
                      <tr key={code}>
                        <td>
                          <span className="badge bg-primary me-2">{code}</span>
                          <span className="text-muted small">
                            {code} per {base}
                          </span>
                        </td>
                        <td className="text-end fw-semibold">{formatRate(rate)}</td>
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

export default ExchangeRates;
