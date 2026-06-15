import React from "react";
import "../CSS/DashboardHeader.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const DashboardHeader = ({ data }) => {
  const nav = useNavigate();
  const authState = useSelector((state) => state.auth);
  const user = authState?.profile || authState?.user || authState;

  const userName = user?.fullName || user?.name || "Jola Ogeremu";

  return (
    <div className="dashboard-header">
      <div className="dashboard-top-row">
        <div className="dashboard-welcome">
          <h1>
            Welcome back, {userName} <span className="wave-emoji">👋</span>
          </h1>
          <p>Here's what's happening with your farm today</p>
        </div>
        <button
          className="request-btn"
          onClick={() => nav("/request")}
        >
          <LuPlus /> Request Transport
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span>Ongoing Request</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <span className="stat-value">{data?.activeDeliveries ?? 0}</span>
          <span className="stat-sub">In progress</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Pending Requests</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <span className="stat-value">{data?.pendingRequests ?? 0}</span>
          <span className="stat-sub">Awaiting driver</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Completed This Month</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <span className="stat-value">{data?.completedThisMonth ?? 0}</span>
          <span className="stat-sub">+3 from last month</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span>Total Spent</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <span className="stat-value">
            {data?.totalSpentThisMonth
              ? `₦${Number(data.totalSpentThisMonth).toLocaleString()}`
              : "₦285k"}
          </span>
          <span className="stat-sub">This month</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
