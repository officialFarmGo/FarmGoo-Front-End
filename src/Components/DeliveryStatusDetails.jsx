import React from "react";
import { 
  EnvironmentOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from "@ant-design/icons";
import "../CSS/DeliveryStatusDetails.css";

const DeliveryStatusDetails = () => {
  return (
    <div className="fg-status-details-container">
      <div className="fg-status-details-grid">

        <div className="fg-status-info-card">
          <h3 className="fg-status-card-title">Delivery Details</h3>
          
          <div className="fg-info-block">
            <span className="fg-info-label">Produce</span>
            <span className="fg-info-value-highlight">Tomatoes - 500kg</span>
          </div>

          <div className="fg-info-block">
            <span className="fg-info-label">Pickup Location</span>
            <div className="fg-location-row">
              <EnvironmentOutlined style={{ color: "#9ca3af", fontSize: "16px" }} />
              <span className="fg-info-value">Ikorodu Farm</span>
            </div>
          </div>

          <div className="fg-info-block">
            <span className="fg-info-label">Destination</span>
            <div className="fg-location-row">
              <EnvironmentOutlined style={{ color: "#9ca3af", fontSize: "16px" }} />
              <span className="fg-info-value">Mile 12 Market</span>
            </div>
          </div>

          <div className="fg-info-block">
            <span className="fg-info-label">Agreed fee</span>
            <span className="fg-info-value-bold">₦28,500</span>
          </div>

          <div className="fg-info-block">
            <span className="fg-info-label">Escrow status</span>
            <div className="fg-status-badge">Held</div>
          </div>
        </div>

        <div className="fg-status-info-card">
          <h3 className="fg-status-card-title">Delivery Timeline</h3>
          <div className="fg-timeline-wrapper">

            <div className="fg-timeline-item active">
              <div className="fg-timeline-icon-box completed">
                <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
              </div>
              <div className="fg-timeline-content">
                <span className="fg-timeline-title">Request Created</span>
                <span className="fg-timeline-time">10:00 AM</span>
              </div>
            </div>

            <div className="fg-timeline-item active">
              <div className="fg-timeline-icon-box completed">
                <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
              </div>
              <div className="fg-timeline-content">
                <span className="fg-timeline-title">Driver Accepted</span>
                <span className="fg-timeline-time">10:15 AM</span>
              </div>
            </div>

            <div className="fg-timeline-item active">
              <div className="fg-timeline-icon-box completed">
                <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
              </div>
              <div className="fg-timeline-content">
                <span className="fg-timeline-title">Loading Produce</span>
                <span className="fg-timeline-time">11:00 AM</span>
              </div>
            </div>

            <div className="fg-timeline-item active">
              <div className="fg-timeline-icon-box completed">
                <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
              </div>
              <div className="fg-timeline-content">
                <span className="fg-timeline-title">In Transit</span>
                <span className="fg-timeline-time">11:30 AM</span>
              </div>
            </div>

            <div className="fg-timeline-item pending">
              <div className="fg-timeline-icon-box gray">
                <ClockCircleOutlined style={{ fontSize: "18px", color: "#9ca3af" }} />
              </div>
              <div className="fg-timeline-content">
                <span className="fg-timeline-title-pending">Delivered</span>
                <span className="fg-timeline-time">Est. 1:00 PM</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DeliveryStatusDetails;