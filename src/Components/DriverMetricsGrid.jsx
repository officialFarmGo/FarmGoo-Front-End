import React from "react";
import { 
  FolderOpenOutlined, 
  CarOutlined, 
  DollarCircleOutlined, 
  ClockCircleOutlined 
} from "@ant-design/icons";
import "../CSS/DriverMetricsGrid.css";

const DriverMetricsGrid = () => {
  return (
    <div className="fg-metrics-container">
      <div className="fg-metrics-grid">

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Available Jobs</span>
            <span className="fg-metric-value">10</span>
            <span className="fg-metric-subtext">Near you</span>
          </div>
          <div className="fg-metric-icon-box bg-light-blue">
            <FolderOpenOutlined style={{ fontSize: "20px", color: "#1d6bf3" }} />
          </div>
        </div>

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Active Deliveries</span>
            <span className="fg-metric-value">3</span>
            <span className="fg-metric-subtext">In progress</span>
          </div>
          <div className="fg-metric-icon-box bg-light-green">
            <CarOutlined style={{ fontSize: "20px", color: "#044335" }} />
          </div>
        </div>

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Today's Earnings</span>
            <span className="fg-metric-value">₦45,000</span>
            <span className="fg-metric-subtext highlight-green">+15% from yesterday</span>
          </div>
          <div className="fg-metric-icon-box bg-bright-green">
            <DollarCircleOutlined style={{ fontSize: "20px", color: "#00c951" }} />
          </div>
        </div>

        <div className="fg-metric-card">
          <div className="fg-metric-left">
            <span className="fg-metric-label">Pending Escrow</span>
            <span className="fg-metric-value">₦120,000</span>
            <span className="fg-metric-subtext">3 deliveries</span>
          </div>
          <div className="fg-metric-icon-box bg-light-orange">
            <ClockCircleOutlined style={{ fontSize: "20px", color: "#ea580c" }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DriverMetricsGrid;