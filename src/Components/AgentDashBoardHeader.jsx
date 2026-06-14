import React from "react";
import {
  UsergroupAddOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import "../CSS/AgentDashBoardHeader.css";
import "../CSS/DashboardHeader.css";
import { useNavigate } from "react-router-dom";

const AgentDashBoardHeader = () => {
  const nav = useNavigate();
  return (
    <div className="fg-agent-dashboard-header">
      <div className="fg-agent-welcome-section">
        <h2 className="fg-agent-welcome-title">
          Welcome Obi Amaka <span className="fg-wave-emoji">👋</span>
        </h2>
        <p className="fg-agent-welcome-subtitle">
          Here's what's happening with your farmers today
        </p>
      </div>

      <div className="fg-agent-stats-grid">
        <div
          className="fg-agent-stat-card"
          style={{ background: "red" }}
          onClick={() => {
            nav("MyFarmersNum");
          }}
        >
          <div className="fg-card-icon-wrapper fg-icon-blue">
            <UsergroupAddOutlined
              style={{ fontSize: "20px", color: "#2563eb" }}
            />
          </div>
          <div className="fg-card-metrics-row">
            <span className="fg-card-stat-number">24</span>
          </div>
          <span className="fg-card-stat-label">Farmers Managed</span>
        </div>

        <div className="fg-agent-stat-card">
          <div className="fg-card-icon-wrapper fg-icon-green">
            <CarOutlined style={{ fontSize: "20px", color: "#044335" }} />
          </div>
          <div className="fg-card-metrics-row">
            <span className="fg-card-stat-number">8</span>
          </div>
          <span className="fg-card-stat-label">In Progress</span>
        </div>

        <div className="fg-agent-stat-card">
          <div className="fg-card-top-header">
            <span className="fg-card-stat-label-top">Completed This Month</span>
            <CheckCircleOutlined
              style={{ fontSize: "18px", color: "#22c55e" }}
            />
          </div>
          <div className="fg-card-metrics-row-stacked">
            <span className="fg-card-stat-number-small">15</span>
            <span className="fg-card-stat-subtext text-green">
              +3 from last month
            </span>
          </div>
        </div>

        <div className="fg-agent-stat-card">
          <div className="fg-card-top-header">
            <span className="fg-card-stat-label-top">Total Spent</span>
            <ArrowUpOutlined
              style={{
                fontSize: "16px",
                color: "#a855f7",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div className="fg-card-metrics-row-stacked">
            <span className="fg-card-stat-number-small">₦285k</span>
            <span className="fg-card-stat-subtext">This month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashBoardHeader;
