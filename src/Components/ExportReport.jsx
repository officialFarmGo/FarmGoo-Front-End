import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../CSS/ExportReport.css";

const ExportReport = () => {
  const token = useSelector((state) => state.auth.token);
  const [recentEarnings, setRecentEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BaseUrl}/driverDash/getDriverEarnings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setRecentEarnings(data.data.recentEarnings ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchEarnings();
  }, [token]);

  return (
    <div className="export-report-container">
      <div className="earnings-list-card">
        <div className="list-header-row">
          <h3>Recent Earnings</h3>
          <button className="export-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Report
          </button>
        </div>

        <div className="items-stack">
          {loading && <p>Loading recent earnings...</p>}

          {!loading && recentEarnings.length === 0 && (
            <p>No recent earnings yet.</p>
          )}

          {!loading && recentEarnings.map((data, index) => (
            <div className="earning-item" key={data._id || data.id || index}>
              <div className="item-info">
                <div className="title-row">
                  <h4>{data.item || data.produce || data.description || "Delivery"}</h4>
                  <span className="status-badge">{data.status ?? "Released"}</span>
                </div>

                <p className="route-details">
                  {data.weight || data.quantity || ""} <span>•</span> {data.route || ""}
                </p>

                <p className="meta-details">
                  ID: {data.id || data.deliveryId || data.trackingId || "N/A"} <span>•</span>{" "}
                  {data.time || data.date || data.createdAt || ""}
                </p>
              </div>

              <div className="item-amount">
                {data.amount ? `₦${Number(data.amount).toLocaleString()}` : "₦0"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportReport;