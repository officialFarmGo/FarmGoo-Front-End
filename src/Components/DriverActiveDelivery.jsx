import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "../CSS/DriverActiveDelivery.css";

const DriverActiveDelivery = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = useSelector((s) => s.auth.token);
  const delivery = state?.delivery;

  const [pin, setPin] = useState("");
  const [completing, setCompleting] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCompleteDelivery = async () => {
    if (!pin.trim()) {
      setErrorMsg("Please enter your PIN.");
      return;
    }
    setCompleting(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BaseUrl}/delivery/completeDelivery/${delivery._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ PIN: pin }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to complete delivery");
      setSuccessMsg(`Delivery completed! You earned ${data.data.amountEarned}`);
      setShowPinInput(false);
      setPin("");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setCompleting(false);
    }
  };

  const initials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "?";

  if (!delivery) {
    return (
      <div className="fg-delivery-details-view">
        <button className="fg-delivery-back-nav" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
          <span>Back to Deliveries</span>
        </button>
        <p>No delivery data found.</p>
      </div>
    );
  }

  return (
    <div className="fg-delivery-details-view">

      <button className="fg-delivery-back-nav" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
        <span>Back to Deliveries</span>
      </button>

      <div className="fg-delivery-hero-summary">
        <div className="fg-hero-title-block">
          <div className="fg-hero-title-row">
            <h1 className="fg-hero-main-title">{delivery.productType}</h1>
            <span className="fg-status-pill-transit">{delivery.status}</span>
          </div>
          <p className="fg-hero-meta-subtitle">
            {delivery.quantity} • Delivery ID: {delivery.trackingId}
          </p>
        </div>

        <div className="fg-earnings-badge-card">
          <span className="fg-badge-label-tag">Payment</span>
          <h2 className="fg-badge-price-value">
            ₦{Number(delivery.totalFare ?? 0).toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="fg-delivery-two-column-grid">

        <div className="fg-delivery-primary-column">

          {/* <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title">Delivery Progress</h3>

            <div className="fg-timeline-stepper-container"> */}

              {/* <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line is-completed"></div>
                <div className="fg-timeline-status-icon-box completed">
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Delivery Accepted</h4>
                  <span className="fg-timeline-step-timestamp">Confirmed</span>
                </div>
              </div> */}

              {/* <div className="fg-timeline-node-row">
                <div className={`fg-timeline-vector-line ${delivery.status?.toLowerCase() !== "accepted" ? "is-completed" : ""}`}></div>
                <div className={`fg-timeline-status-icon-box ${delivery.status?.toLowerCase() !== "accepted" ? "completed" : "pending"}`}>
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Arrived at Pickup</h4>
                  <span className="fg-timeline-step-timestamp">{delivery.AddressOrpickUpLocation}</span>
                </div>
              </div> */}

              {/* <div className="fg-timeline-node-row">
                <div className={`fg-timeline-vector-line ${delivery.status?.toLowerCase() === "in transit" || delivery.status?.toLowerCase() === "completed" ? "is-completed" : ""}`}></div>
                <div className={`fg-timeline-status-icon-box ${delivery.status?.toLowerCase() === "in transit" || delivery.status?.toLowerCase() === "completed" ? "completed" : "pending"}`}>
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Produce Loaded</h4>
                  <span className="fg-timeline-step-timestamp">
                    {delivery.status?.toLowerCase() === "in transit" ? "Loaded" : "Pending"}
                  </span>
                </div>
              </div> */}

              {/* <div className="fg-timeline-node-row">
                <div className={`fg-timeline-vector-line ${delivery.status?.toLowerCase() === "completed" ? "is-completed" : ""}`}></div>
                <div className={`fg-timeline-status-icon-box ${delivery.status?.toLowerCase() === "in transit" ? "current" : delivery.status?.toLowerCase() === "completed" ? "completed" : "pending"}`}>
                  <EnvironmentOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">In Transit</h4>
                  <span className="fg-timeline-step-timestamp">
                    {delivery.estimatedDuration}
                  </span>
                  {delivery.status?.toLowerCase() === "in transit" && (
                    <div className="fg-timeline-live-indicator-pill">
                      <span className="fg-live-pulse-dot"></span>
                      <span>Active</span>
                    </div>
                  )}
                </div>
              </div> */}

              {/* <div className="fg-timeline-node-row">
                <div className={`fg-timeline-vector-line ${delivery.status?.toLowerCase() === "completed" ? "is-completed" : ""}`}></div>
                <div className={`fg-timeline-status-icon-box ${delivery.status?.toLowerCase() === "completed" ? "completed" : "pending"}`}>
                  <EnvironmentOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className={`fg-timeline-step-heading ${delivery.status?.toLowerCase() !== "completed" ? "pending" : ""}`}>
                    Arrive at Destination
                  </h4>
                  <span className="fg-timeline-step-timestamp">{delivery.Destination}</span>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className={`fg-timeline-status-icon-box ${delivery.status?.toLowerCase() === "completed" ? "completed" : "pending"}`}>
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className={`fg-timeline-step-heading ${delivery.status?.toLowerCase() !== "completed" ? "pending" : ""}`}>
                    Delivery Complete
                  </h4>
                  <span className="fg-timeline-step-timestamp">
                    {delivery.status?.toLowerCase() === "completed" ? "Done" : "Pending"}
                  </span>
                </div>
              </div> */}

             {/* </div>
          </div>  */}

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title">Route Details</h3>

            <div className="fg-route-locations-stack">
              <div className="fg-route-connector-vector"></div>

              <div className="fg-route-point-row">
                <div className="fg-route-marker-icon-wrapper pickup">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-route-text-details">
                  <span className="fg-route-node-tag-label">Pickup Location</span>
                  <h4 className="fg-route-specific-title">{delivery.AddressOrpickUpLocation}</h4>
                  <div className="fg-route-dynamic-status-row pickup">
                    <CheckCircleOutlined style={{ fontSize: "12px" }} />
                    <span>Pickup confirmed</span>
                  </div>
                </div>
              </div>

              <div className="fg-route-point-row">
                <div className="fg-route-marker-icon-wrapper destination">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-route-text-details">
                  <span className="fg-route-node-tag-label">Delivery Location</span>
                  <h4 className="fg-route-specific-title">{delivery.Destination}</h4>
                  <div className="fg-route-dynamic-status-row destination">
                    <ClockCircleOutlined style={{ fontSize: "12px" }} />
                    <span>Est. duration: {delivery.estimatedDuration}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="fg-delivery-secondary-column">

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Quick Actions</h3>

            {successMsg && (
              <div className="fg-success-alert" style={{ marginBottom: "12px", color: "#16a34a", fontWeight: 600 }}>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="fg-error-alert" style={{ marginBottom: "12px", color: "#dc2626", fontWeight: 500 }}>
                {errorMsg}
              </div>
            )}

            <div className="fg-actions-vertical-group">
              {!showPinInput && !successMsg && (
                <button
                  className="fg-action-btn-primary-solid"
                  onClick={() => setShowPinInput(true)}
                  disabled={delivery.status?.toLowerCase() === "completed"}
                >
                  <CheckCircleOutlined />
                  <span>Complete Delivery</span>
                </button>
              )}

              {showPinInput && (
                <>
                  <input
                    type="password"
                    placeholder="Enter delivery PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="fg-pin-input"
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "8px", fontSize: "15px" }}
                  />
                  <button
                    className="fg-action-btn-primary-solid"
                    onClick={handleCompleteDelivery}
                    disabled={completing}
                  >
                    <CheckCircleOutlined />
                    <span>{completing ? "Completing..." : "Confirm"}</span>
                  </button>
                  <button
                    className="fg-action-btn-secondary-outline"
                    onClick={() => { setShowPinInput(false); setPin(""); setErrorMsg(null); }}
                  >
                    <span>Cancel</span>
                  </button>
                </>
              )}

              <button className="fg-action-btn-secondary-outline">
                <CameraOutlined />
                <span>Upload Photo</span>
              </button>
              <button className="fg-action-btn-secondary-outline">
                <WarningOutlined />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Contact Owner</h3>
            <div className="fg-contact-card-profile-row">
              <div className="fg-contact-avatar-circle">
                {initials(delivery.ownerName)}
              </div>
              <div className="fg-contact-meta-info">
                <h4 className="fg-contact-display-name">{delivery.ownerName}</h4>
                <p className="fg-contact-phone-digits">{delivery.ownerPhone}</p>
              </div>
            </div>
          </div>

          <div className="fg-delivery-panel-card" style={{ border: "1px solid #dcfce7", backgroundColor: "#f0fdf4" }}>
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Payment Status</h3>
            <div className="fg-escrow-breakdown-table">
              <div className="fg-escrow-data-row">
                <span className="fg-escrow-row-label">Escrow Status</span>
                <span className="fg-escrow-row-value status-secured">Secured</span>
              </div>
              <div className="fg-escrow-data-row total-line">
                <span className="fg-escrow-row-label bold">Amount</span>
                <span className="fg-escrow-row-value bold-total">
                  ₦{Number(delivery.totalFare ?? 0).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="fg-escrow-disclaimer-text">
              Payment will be released automatically upon successful delivery confirmation
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DriverActiveDelivery;