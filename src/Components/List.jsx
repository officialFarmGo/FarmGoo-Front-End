import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/List.css";
import { useNavigate } from "react-router-dom";

const List = () => {
  const nav = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BaseUrl}/driverDash/getDriverEarnings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setStats(data.data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchEarnings();
  }, [token]);

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-text">
          <h2>Earnings</h2>
          <p>Track your income and payment history</p>
        </div>
        {/* <button className="withdraw-btn" onClick={() =>nav('')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Withdraw Earnings
        </button> */}
      </div>

      <div className="cards-wrapper">
        <div className="card highlight-card">
          <div className="card-top">
            <span className="card-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </span>
            <span className="card-title">This Week</span>
          </div>
          <h1 className="card-amount">
            {loading ? "--" : stats?.thisWeekFormatted ?? "₦0"}
          </h1>
          <div className="card-footer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>Weekly earnings</span>
          </div>
        </div>

        <div className="card">
          <div className="card-top">
            <span className="card-icon check-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span className="card-title text-muted">Cleared Earnings</span>
          </div>
          <h1 className="card-amount text-dark">
            {loading ? "--" : stats?.clearedEarningsFormatted ?? "₦0"}
          </h1>
          <div className="card-footer text-muted">Available to withdraw</div>
        </div>

        <div className="card">
          <div className="card-top">
            <span className="card-icon clock-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <span className="card-title text-muted">Wallet Balance</span>
          </div>
          <h1 className="card-amount text-dark">
            {loading ? "--" : stats?.walletBalanceFormatted ?? "₦0"}
          </h1>
          <div className="card-footer text-muted">Current balance</div>
        </div>
      </div>
    </div>
  );
};

export default List;