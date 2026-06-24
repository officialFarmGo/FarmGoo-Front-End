import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/DetailspageAgent.css";

const DetailspageAgent = () => {
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/agentDashboard/trackdelivery");
        if (response.data && response.data.data) {
          setDeliveryData(response.data.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching delivery data:", err);
        setError("Failed to load delivery details. Please try again.");
        setLoading(false);
      }
    };

    fetchDeliveryData();
  }, []);

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
      {/* Optional Top Summary Section for Extra API Metadata */}
      {deliveryData?.deliveryDetails && (
        <div className="delivery-summary-card">
          <h3>Tracking ID: {deliveryData.trackingId}</h3>
          <div className="summary-grid-flex">
            <div>
              <strong>Produce:</strong> {deliveryData.deliveryDetails.produce} (
              {deliveryData.deliveryDetails.quantity})
            </div>
            <div>
              <strong>Route:</strong>{" "}
              {deliveryData.deliveryDetails.pickupLocation} →{" "}
              {deliveryData.deliveryDetails.destination}
            </div>
            <div>
              <strong>Fee:</strong> {deliveryData.deliveryDetails.agreedFee}
            </div>
            <div>
              <strong>Status:</strong> {deliveryData.status} (
              {deliveryData.estimatedDuration})
            </div>
          </div>
        </div>
      )}

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
                <button className="confirm-btn">Confirm delivery</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailspageAgent;
