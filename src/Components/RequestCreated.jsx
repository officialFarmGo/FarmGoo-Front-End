import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/RequestCreated.css";

const RequestCreated = ({ onCreateAnother, onViewDeliveries, pricing }) => {
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const handleViewDeliveriesClick = () => {
    if (onViewDeliveries) onViewDeliveries();
    navigate("/agent/dashboard"); // Straight route navigation directly back to agent workspace panel
  };

  return (
    <div className="fg-request-container" style={{ width: "100%", padding: 0 }}>
      <div className="fg-request-card" style={{ margin: 0, maxWidth: "460px" }}>
        {/* Success Checkmark Circle */}
        <div className="fg-success-circle">
          <svg
            className="fg-success-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text Details */}
        <h2 className="fg-request-title">Request Created!</h2>
        <p className="fg-request-subtitle">
          Drivers will receive this transport request shortly
        </p>

        {/* Mapped Pricing Matrix Breakdown display view block inside pop-up */}
        {pricing && (
          <div
            className="fg-pricing-summary"
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              padding: "16px",
              margin: "20px 0",
              textAlign: "left",
              border: "1px solid #eee",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#666" }}>Estimated Price:</span>
              <span style={{ fontWeight: "600", color: "#333" }}>
                {formatCurrency(pricing.estimatedPrice)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#666" }}>Service Fee:</span>
              <span style={{ fontWeight: "600", color: "#333" }}>
                {formatCurrency(pricing.serviceFee)}
              </span>
            </div>
            <div
              style={{ borderTop: "1px dashed #ddd", margin: "10px 0" }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              <span style={{ color: "#2e7d32" }}>Total Price:</span>
              <span style={{ color: "#2e7d32" }}>
                {formatCurrency(pricing.total)}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="fg-request-actions">
          <button
            type="button"
            className="fg-btn-secondary"
            onClick={onCreateAnother}
          >
            Create Another
          </button>
          <button
            type="button"
            className="fg-btn-primary"
            onClick={handleViewDeliveriesClick}
          >
            View Deliveries
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCreated;
