import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/Withdrawal.css";

const Withdrawal = () => {
  const token = useSelector((state) => state.auth.token);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BaseUrl}/driverDash/getDriverEarnings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setWithdrawalHistory(data.data.withdrawalHistory ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchEarnings();
  }, [token]);

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="withdrawal-container">
      <div className="history-card">
        <div className="history-header">
          <h3>Withdrawal History</h3>
        </div>

        <div className="history-stack">
          {loading && <p>Loading withdrawal history...</p>}

          {!loading && withdrawalHistory.length === 0 && (
            <p>No withdrawal history yet.</p>
          )}

          {!loading && withdrawalHistory.map((tx, index) => (
            <div className="history-item" key={tx._id || tx.id || index}>
              <div className="history-left">
                <div className="download-icon-bg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0055ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
                <div className="tx-details">
                  <h4>{tx.title || `Withdrawal to ${tx.bankName || "Bank"}`}</h4>
                  <span className="tx-date">{tx.date ? formatDate(tx.date) : formatDate(tx.createdAt)}</span>
                </div>
              </div>

              <div className="history-right">
                <span className="tx-amount">
                  -₦{Number(tx.amount || 0).toLocaleString()}
                </span>
                <span className="tx-status">{tx.status ?? "Completed"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;