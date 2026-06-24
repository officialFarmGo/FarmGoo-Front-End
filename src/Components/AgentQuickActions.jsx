import React from "react";
import {
  UserAddOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "../CSS/AgentQuickActions.css";
import { useNavigate } from "react-router-dom";

const AgentQuickActions = ({
  onAddFarmer,
  onViewDeliveries,
  onCreateDeliveryClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="fg-quick-actions-container">
      <h3 className="fg-quick-actions-heading">Quick Actions</h3>
      <div className="fg-quick-actions-grid">
        {/* Add Farmer */}
        <div
          className="fg-action-card"
          onClick={onAddFarmer}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onAddFarmer && onAddFarmer()}
          style={{ cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-dark-green">
            <UserAddOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Add Farmer</span>
        </div>

        <div
          className="fg-action-card"
          onClick={() => navigate("/agent/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="fg-action-icon-box fg-bg-blue"
            onClick={() => navigate("/agent/dashboard")}
          >
            <FileTextOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Create Transport Request</span>
        </div>

        {/* View Deliveries */}
        <div
          className="fg-action-card"
          onClick={() => navigate("/agent/dashboard/activedelivery")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="fg-action-icon-box fg-bg-bright-green"
            onClick={() => navigate("/agent/dashboard/activedelivery")}
          >
            <EyeOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">View Deliveries</span>
        </div>
      </div>
    </div>
  );
};

export default AgentQuickActions;
