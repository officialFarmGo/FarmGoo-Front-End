import React, { useState, useEffect } from "react";
import {
  FolderOpenOutlined,
  CarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import "../CSS/DriverMetricsGrid.css";
import { useSelector } from "react-redux";

const DriverMetricsGrid = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BaseUrl}/driverDash/driverDashBoard`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          setMetrics(data.data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="fg-metrics-container">
        <div className="fg-metrics-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="fg-metric-card" style={{ opacity: 0.5 }}>
              <div className="fg-metric-left">
                <span className="fg-metric-label">Loading...</span>
                <span className="fg-metric-value">0</span>
                <span className="fg-metric-subtext">Please wait</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fg-metrics-container">
      <div className="fg-metrics-grid">
        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Available Jobs</span>
            <span className="fg-metric-value">
              {metrics?.availableJobs ?? "0"}
            </span>
            <span className="fg-metric-subtext">Near you</span>
          </div>
          <div className="fg-metric-icon-box bg-light-blue">
            <FolderOpenOutlined style={{ fontSize: "20px", color: "#1d6bf3" }} />
          </div>
        </div>

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Active Deliveries</span>
            <span className="fg-metric-value">
              {metrics?.activeDeliveries ?? "0"}
            </span>
            <span className="fg-metric-subtext">In progress</span>
          </div>
          <div className="fg-metric-icon-box bg-light-green">
            <CarOutlined style={{ fontSize: "20px", color: "#044335" }} />
          </div>
        </div>

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Today's Earnings</span>
            <span className="fg-metric-value">
              {metrics?.todaysEarnings != null
                ? `₦${Number(metrics.todaysEarnings).toLocaleString()}`
                : "₦0"}
            </span>
            <span className="fg-metric-subtext highlight-green">
              {metrics?.earningsChange ?? ""}
            </span>
          </div>
          <div className="fg-metric-icon-box bg-bright-green">
            <DollarCircleOutlined style={{ fontSize: "20px", color: "#00c951" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverMetricsGrid;