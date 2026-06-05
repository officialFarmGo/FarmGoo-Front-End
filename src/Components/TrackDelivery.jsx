import React from "react";
import { CarOutlined } from "@ant-design/icons";
import "../CSS/TrackDelivery.css";

const TrackDelivery = () => {
  return (
    <div className="fg-track-delivery-container">
      
      <div className="fg-track-header">
        <div className="fg-track-title-block">
          <h2 className="fg-track-heading">Track Delivery</h2>
          <span className="fg-track-order-id">Order ID: TRN-001</span>
        </div>
        <button className="fg-track-back-btn">Back to Dashboard</button>
      </div>

      <div className="fg-track-status-card">
        <div className="fg-track-card-top">
          <div className="fg-track-status-info">
            <div className="fg-track-icon-circle">
              <CarOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
            </div>
            <div className="fg-track-status-text">
              <span className="fg-status-title">In Transit</span>
              <span className="fg-status-eta">ETA: 1 hour 30 minutes</span>
            </div>
          </div>
          <div className="fg-track-percentage-block">
            <span className="fg-track-percent-num">60%</span>
            <span className="fg-track-percent-label">Complete</span>
          </div>
        </div>

        <div className="fg-progress-bar-container">
          <div className="fg-progress-bar-fill" style={{ width: "60%" }}></div>
        </div>
      </div>

    </div>
  );
};

export default TrackDelivery;