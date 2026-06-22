import React from "react";
import { 
  UserAddOutlined, 
  FileTextOutlined, 
  EyeOutlined 
} from "@ant-design/icons";
import "../CSS/AgentQuickActions.css";

const AgentQuickActions = ({ onAddFarmer, onViewDeliveries, onCreateDeliveryClick }) => {
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
          onKeyDown={(e) => e.key === 'Enter' && onAddFarmer && onAddFarmer()}
          style={{ cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-dark-green">
            <UserAddOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Add Farmer</span>
        </div>

        {/* Create Transport Request - FIXED HERE */}
        <div 
          className="fg-action-card" 
          onClick={onCreateDeliveryClick} 
          style={{ cursor: "pointer" }}
        >
          <div className="fg-action-icon-box fg-bg-blue">
            <FileTextOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
          </div>
          <span className="fg-action-label">Create Transport Request</span>
        </div>

        {/* View Deliveries */}
        <div className="fg-action-card" onClick={onViewDeliveries} style={{ cursor: "pointer" }}>
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