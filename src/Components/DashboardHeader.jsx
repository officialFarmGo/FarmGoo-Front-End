import React from "react";
import "../CSS/DashboardHeader.css";
import { LuPlus, LuBox, LuClock3, LuTrendingUp } from "react-icons/lu";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div className="dashboard-top-row">
        <div className="dashboard-welcome">
          <h1>Welcome back Jola Ogeremu</h1>
          <p>Here's what's happening with your farm today</p>
        </div>
        <button className="request-btn">
          <LuPlus /> Request Transport
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Active Deliveries</span>
            <LuBox style={{ color: "#3b82f6", fontSize: "18px" }} />
          </div>
          <span className="stat-value">2</span>
          <span className="stat-sub">In progress</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Pending Requests</span>
            <LuClock3 style={{ color: "#f59e0b", fontSize: "18px" }} />
          </div>
          <span className="stat-value">1</span>
          <span className="stat-sub">Awaiting driver</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Completed This Month</span>
            {/* <LuCheckCircle2 style={{ color: "#10b981", fontSize: "18px" }} /> */}
          </div>
          <span className="stat-value">15</span>
          <span className="stat-sub">+3 from last month</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Spent</span>
            <LuTrendingUp style={{ color: "#8b5cf6", fontSize: "18px" }} />
          </div>
          <span className="stat-value">₦285k</span>
          <span className="stat-sub">This month</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;