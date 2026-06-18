import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/Overviwe.css";

const Overviwe = () => {
  const token = useSelector((state) => state.auth.token);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BaseUrl}/driverDash/getDriverEarnings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setOverview(data.data.earningsOverview);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchEarnings();
  }, [token]);

  const barChart = overview?.barChart ?? [];
  const summary = overview?.summary ?? {};

  const maxAmount = Math.max(...barChart.map((d) => d.amount), 1);

  const getWidth = (amount) => {
    if (maxAmount === 0) return "1%";
    const pct = (amount / maxAmount) * 100;
    return pct < 1 ? "1%" : `${pct.toFixed(0)}%`;
  };

  return (
    <div className="overviwe-container">
      <div className="overview-card">
        <div className="overview-header">
          <h3>Earnings Overview</h3>
          <div className="dropdown-container">
            <select className="time-select" defaultValue="this-week">
              <option value="this-week">This Week</option>
              <option value="last-week">Last Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>

        <div className="chart-wrapper">
          {loading ? (
            <p>Loading chart...</p>
          ) : (
            barChart.map((item, index) => (
              <div className="chart-row" key={index}>
                <div className="day-label">{item.day}</div>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: getWidth(item.amount) }}>
                    {item.amount > 0 && (
                      <span className="bar-amount">₦{Number(item.amount).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <hr className="divider-line" />

        <div className="metrics-row">
          <div className="metric-item">
            <span className="metric-label">Total This Week</span>
            <h4 className="metric-value">{loading ? "--" : summary.totalThisWeek ?? "₦0"}</h4>
          </div>
          <div className="metric-item">
            <span className="metric-label">Average per Day</span>
            <h4 className="metric-value">{loading ? "--" : summary.averagePerDay ?? "₦0"}</h4>
          </div>
          <div className="metric-item">
            <span className="metric-label">Best Day</span>
            <h4 className="metric-value">
              {loading ? "--" : `${summary.bestDay ?? "₦0"} (${summary.bestDayLabel ?? ""})`}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviwe;