import React from "react";
import { 
  UserAddOutlined, 
  FileTextOutlined, 
  EyeOutlined 
} from "@ant-design/icons";
import "../CSS/AgentQuickActions.css";

const AgentQuickActions = () => {
  return (
    <div className="fg-quick-actions-container">
      <h3 className="fg-quick-actions-heading">Quick Actions</h3>
      <div className="fg-quick-actions-grid">
        
        <div className="fg-action-card">
          <div className="fg-action-icon-box fg-bg-dark-green">
            <UserAddOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Add Farmer</span>
        </div>

        <div className="fg-action-card">
          <div className="fg-action-icon-box fg-bg-blue">
            <FileTextOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Create Transport Request</span>
        </div>

        <div className="fg-action-card">
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