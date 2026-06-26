import React, { useState, useEffect } from "react";
import { apiInstance } from "../Api/Api";
import "../CSS/DeliveryDetailsCard.css";

const DeliveryDetailsCard = ({ deliveryId }) => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!deliveryId) {
      setLoading(false);
      return;
    }

    const fetchDelivery = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiInstance.get(
          `/agentDashboard/trackdelivery/${deliveryId}`
        );
        if (response.data && response.data.data) {
          setDeliveryData(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching delivery details:", err);
        setError("Failed to load delivery details.");
        setLoading(false);
      }
    };

    fetchDelivery();
  }, [deliveryId]);

  if (loading) {
    return (
      <div className="delivery-card">
        <h2 className="delivery-title">Delivery Details</h2>
        <p className="loading-text">Loading delivery details...</p>
      </div>
    );
  }

  if (error || !deliveryData) {
    return (
      <div className="delivery-card">
        <h2 className="delivery-title">Delivery Details</h2>
        <p className="error-text">{error || "No delivery data available."}</p>
      </div>
    );
  }

  const details = deliveryData.deliveryDetails || {};
  const status = deliveryData.paymentStatus || "Pending";

  return (
    <div className="delivery-card">
      <h2 className="delivery-title">Delivery Details</h2>

      <div className="delivery-section">
        <span className="section-label">Produce</span>
        <span className="section-value bold-text">
          {details.produce} - {details.quantity}
        </span>
      </div>

      <div className="delivery-section">
        <span className="section-label">Pickup Location</span>
        <div className="location-wrapper">
          <svg
            className="location-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="section-value">{details.pickupLocation}</span>
        </div>
      </div>

      <div className="delivery-section">
        <span className="section-label">Destination</span>
        <div className="location-wrapper">
          <svg
            className="location-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="section-value">{details.destination}</span>
        </div>
      </div>

      <div className="delivery-section">
        <span className="section-label">Agreed fee</span>
        <span className="section-value price-text">{details.agreedFee}</span>
      </div>

      <div className="delivery-section">
        <span className="section-label">Escrow status</span>
        <div className="status-badge">{status}</div>
      </div>
    </div>
  );
};

export default DeliveryDetailsCard;
