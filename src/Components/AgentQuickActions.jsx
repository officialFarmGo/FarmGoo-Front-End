import React from "react";
import {
  UserAddOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../CSS/AgentQuickActions.css";
import { Link, useNavigate } from "react-router-dom";

const AgentQuickActions = () => {
  const nav = useNavigate();

  return (
    <div className="fg-quick-actions-container">
      <h3 className="fg-quick-actions-heading">Quick Actions</h3>
      <div className="fg-quick-actions-grid">
        {/* Add Farmer */}
        <Link
          to="/agent/dashboard/NewFarm"
          className="fg-action-card"
          style={{ textDecoration: "none", cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-dark-green">
            <UserAddOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label" style={{ color: "#000000" }}>
            Add Farmer
          </span>
        </Link>

        {/* Create Transport Request */}
        <div
          className="fg-action-card"
          onClick={() => nav("/dashboard/activedelivery")}
          style={{ cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-blue">
            <FileTextOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Create Transport Request</span>
        </div>

        {/* View Deliveries */}
        <div
          className="fg-action-card"
          onClick={() => nav("/dashboard/activedelivery")}
          style={{ cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-bright-green">
            <EyeOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">View Deliveries</span>
        </div>
      </div>
    </div>
  );
};

export default AgentQuickActions;
