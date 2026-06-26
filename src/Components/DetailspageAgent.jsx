import React, { useState, useEffect } from "react";
import { apiInstance } from "../Api/Api";
import "../CSS/DetailspageAgent.css";

const DetailspageAgent = ({ deliveryId, onBackClick }) => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (!deliveryId) {
      setLoading(false);
      setError("No delivery selected. Please go back and select a delivery.");
      return;
    }

    const fetchDeliveryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiInstance.get(
          `/agentDashboard/trackdelivery/${deliveryId}`
        );
        if (response.data && response.data.data) {
          setDeliveryData(response.data.data);
        } else {
          setError("Invalid response from server.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching delivery data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load delivery details. Please try again."
        );
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, [deliveryId]);

  if (loading) {
    return <div className="loading-state">Loading delivery details...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  // Fallback structures handle null or missing values gracefully
  const driver = deliveryData?.driver || {
    name: "Assigning Driver...",
    subText: "Pending Allocation",
    phone: "N/A",
    initial: "?",
  };

  const customer = deliveryData?.customer || {
    details: "N/A",
  };

  const pinDigits = deliveryData?.pin
    ? String(deliveryData.pin).split("")
    : ["-", "-", "-", "-"];

  const cardsData = [
    {
      id: 1,
      type: "driver",
      title: "Driver Details",
      initial: driver.initial || driver.name.charAt(0),
      name: driver.name,
      subText: driver.subText || null,
      phone: driver.phone,
    },
    {
      id: 2,
      type: "customer",
      title: "Customer's Details",
      initial: "C",
      name: `Customer (${deliveryData?.deliveryDetails?.farmer || "Farmer"})`,
      phone: customer.details,
    },
    {
      id: 3,
      type: "pin",
      title: "Your delivery PIN",
      pinDigits: pinDigits,
    },
  ];

  return (
    <div className="details-wrapper">

      <div className="details-container">
        {cardsData.map((card) => (
          <div key={card.id} className="details-card">
            <h2 className="card-title">{card.title}</h2>

            {card.type !== "pin" ? (
              <div className="info-section">
                <div className="avatar">{card.initial}</div>
                <div className="info-text">
                  <span className="profile-name">{card.name}</span>
                  {card.subText && (
                    <span className="sub-text">{card.subText}</span>
                  )}
                  <span className="phone-text">{card.phone}</span>
                </div>
              </div>
            ) : (
              <div className="pin-section">
                <p className="pin-instruction">
                  Share this PIN with the Customer only once goods arrive
                  safely. Entering it confirms delivery and releases escrow.
                </p>
                <div className="pin-display">
                  {card.pinDigits.map((digit, index) => (
                    <div key={index} className="pin-box">
                      {digit}
                    </div>
                  ))}
                </div>
                <hr className="divider" />
                <p className="manual-text">
                  Manually confirm delivery if the driver has arrived:
                </p>
                <button className="confirm-btn" onClick={() => setShowConfirmModal(true)}>Confirm delivery</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Delivery Modal Popup */}
      {showConfirmModal && (
        <div className="fg-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="fg-confirm-modal animate-popup" onClick={(e) => e.stopPropagation()}>
            <h2 className="fg-confirm-modal-title">Confirm Delivery</h2>

            <div className="fg-confirm-modal-note">
              <p className="fg-confirm-note-text">
                Please review the delivery details below before confirming. Once confirmed, the PIN will be validated and escrow will be released to the driver.
              </p>
            </div>

            <div className="fg-confirm-modal-details">
              <div className="fg-confirm-detail-row">
                <span className="fg-confirm-detail-label">Driver</span>
                <span className="fg-confirm-detail-value">{driver.name}</span>
              </div>
              <div className="fg-confirm-detail-row">
                <span className="fg-confirm-detail-label">Driver Phone</span>
                <span className="fg-confirm-detail-value">{driver.phone}</span>
              </div>
              <div className="fg-confirm-detail-row">
                <span className="fg-confirm-detail-label">Customer</span>
                <span className="fg-confirm-detail-value">{deliveryData?.deliveryDetails?.farmer || "Farmer"}</span>
              </div>
              <div className="fg-confirm-detail-row">
                <span className="fg-confirm-detail-label">Delivery PIN</span>
                <span className="fg-confirm-detail-value fg-confirm-pin">{pinDigits.join(" ")}</span>
              </div>
            </div>

            <div className="fg-confirm-modal-actions">
              <button className="fg-confirm-btn-cancel" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button className="fg-confirm-btn-submit" onClick={() => onBackClick && onBackClick()}>
                Yes, Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailspageAgent;