import React from "react";
import { CarOutlined } from "@ant-design/icons";
import "../CSS/TrackDelivery.css";
import DetailspageAgent from "../Components/DetailspageAgent";
import DeliveryDetailsCard from "../Components/DeliveryDetailsCard";
import { useNavigate } from "react-router-dom";

const TrackDelivery = () => {
  const navigate = useNavigate();
  return (
    <div className="fg-track-delivery-container">
      <div className="fg-track-header">
        <div className="fg-track-title-block">
          <h2 className="fg-track-heading">Track Delivery</h2>
          <span className="fg-track-order-id">Order ID: TRN-001</span>
        </div>
        <button
          className="fg-track-back-btn"
          onClick={() => navigate("/agent/dashboard/activedelivery")}
          style={{ cursor: "pointer" }}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Weather Update Banner from image_8889ef.png */}
      <div className="fg-weather-banner">
        <div className="fg-weather-icon-wrapper">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <line x1="9.22" y1="16" x2="9.22" y2="20" />
            <line x1="13.13" y1="16" x2="13.13" y2="20" />
          </svg>
        </div>
        <div className="fg-weather-content">
          <h4 className="fg-weather-title">Weather Update</h4>
          <p className="fg-weather-text">
            Light rain expected along route. Driver has been notified.
          </p>
        </div>
      </div>
      <DetailspageAgent />
      <DeliveryDetailsCard />
    </div>
  );
};

export default TrackDelivery;
