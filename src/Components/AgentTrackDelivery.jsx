import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { 
  HiOutlineArrowLeft, 
  HiOutlinePhone, 
  HiOutlineTruck, 
  HiOutlineLocationMarker 
} from "react-icons/hi";
import { WiDayCloudy } from "react-icons/wi";
import "../CSS/TrackDelivery.css";

const STATUS_PROGRESS = {
  pending: 10,
  accepted: 35,
  "in transit": 60,
  delivered: 100,
};

const getProgress = (status) => {
  if (!status) return 0;
  return STATUS_PROGRESS[status.toLowerCase()] ?? 20;
};

const AgentTrackDelivery = ({ deliveryId, onBackClick }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl || "https://farmgoo-backend-1.onrender.com/api/v1";

  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${BaseUrl}/agentDashboard/trackdelivery/${deliveryId}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data?.data) {
          setTrackingData(response.data.data);
        } else {
          throw new Error("Tracking payload structural mismatch.");
        }
      } catch (err) {
        console.error("API tracking failure:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (deliveryId) fetchTracking();
  }, [deliveryId, token, BaseUrl]);

  if (loading) return <div className="fg-track-loading">Fetching live tracking data...</div>;
  if (error) return <div className="fg-track-error">Error loading tracking panel: {error}</div>;
  if (!trackingData) return null;

  const { trackingId, status, estimatedDuration, paymentStatus, driver, customer, pin, deliveryDetails } = trackingData;
  const pinDigits = pin ? String(pin).split("") : ["-", "-", "-", "-"];
  const progress = getProgress(status);

  return (
    <div className="fg-track-page-wrapper">
      
      <div className="fg-track-breadcrumb-row">
        <div className="fg-track-title-stack">
          <h1 className="fg-track-main-title">Track Delivery</h1>
          <span className="fg-track-order-id">Order ID: {trackingId}</span>
        </div>
        <button type="button" className="fg-track-back-btn" onClick={onBackClick}>
          <HiOutlineArrowLeft size={16} />
          Back to Dashboard
        </button>
      </div>

      <div className="fg-track-progress-card">
        <div className="fg-track-progress-content">
          <div className="fg-track-status-icon-circle">
            <HiOutlineTruck size={24} color="#ffffff" />
          </div>
          <div className="fg-track-eta-stack">
            <h3 className="fg-track-status-text">{status}</h3>
            <p className="fg-track-eta-sub">ETA: {estimatedDuration}</p>
          </div>
        </div>
        <div className="fg-track-percentage-display-block">
          <span className="fg-track-pct-value">{progress}%</span>
          <span className="fg-track-pct-lbl">Complete</span>
        </div>
        <div className="fg-track-bar-rail">
          <div className="fg-track-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="fg-track-weather-alert-banner">
        <div className="fg-track-weather-icon-side"><WiDayCloudy size={24} /></div>
        <div className="fg-track-weather-text-side">
          <h4>Weather Update</h4>
          <p>Light rain expected along route. Driver has been notified.</p>
        </div>
      </div>

      <div className="fg-track-details-row-grid">
        
        <div className="fg-track-info-panel-card">
          <h3 className="fg-panel-inner-title">Driver Details</h3>
          <div className="fg-track-user-profile-row">
            <div className="fg-track-avatar-initials green-initials">
              {driver?.name ? driver.name.charAt(0).toUpperCase() : "D"}
            </div>
            <div className="fg-track-user-meta">
              <h4>{driver?.name || "Not Assigned"}</h4>
              <p className="fg-meta-subtext"><HiOutlineTruck /> {driver?.vehicleType || "N/A"}</p>
              <p className="fg-meta-subtext"><HiOutlinePhone /> {driver?.phone || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="fg-track-info-panel-card">
          <h3 className="fg-panel-inner-title">Customer Details</h3>
          <div className="fg-track-user-profile-row">
            <div className="fg-track-avatar-initials blue-initials">
              {deliveryDetails?.farmer ? deliveryDetails.farmer.charAt(0).toUpperCase() : "C"}
            </div>
            <div className="fg-track-user-meta">
              <h4>{deliveryDetails?.farmer || "Unknown"}</h4>
              <p className="fg-meta-subtext"><HiOutlinePhone /> {customer?.details || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="fg-track-info-panel-card fg-pin-panel">
          <h3 className="fg-panel-inner-title">Your delivery PIN</h3>
          <p className="fg-pin-instructions-p">
            Share this PIN with the Customer only once goods arrive safely. Entering it confirms delivery and releases escrow.
          </p>
          <div className="fg-pin-boxes-container">
            {pinDigits.map((digit, index) => (
              <div key={index} className="fg-pin-digit-box">{digit}</div>
            ))}
          </div>
          <div className="fg-pin-divider-line" />
          <p className="fg-manual-confirm-prompt">Manually confirm delivery if the driver has arrived:</p>
          <button type="button" className="fg-manual-confirm-action-btn">Confirm delivery</button>
        </div>

      </div>

      <div className="fg-track-footer-details-panel">
        <h3 className="fg-panel-inner-title">Delivery Details</h3>
        
        <div className="fg-footer-data-field">
          <label>Produce</label>
          <p className="fg-bold-field-data">{deliveryDetails?.produce} - {deliveryDetails?.quantity}</p>
        </div>

        <div className="fg-footer-data-field">
          <label>Pickup Location</label>
          <p className="fg-iconic-field-data"><HiOutlineLocationMarker className="loc-grn" /> {deliveryDetails?.pickupLocation}</p>
        </div>

        <div className="fg-footer-data-field">
          <label>Destination</label>
          <p className="fg-iconic-field-data"><HiOutlineLocationMarker className="loc-red" /> {deliveryDetails?.destination}</p>
        </div>

        <div className="fg-footer-data-field">
          <label>Agreed fee</label>
          <p className="fg-bold-field-data">{deliveryDetails?.agreedFee}</p>
        </div>

        <div className="fg-footer-data-field">
          <label>Escrow status</label>
          <span className="fg-escrow-status-badge">{paymentStatus}</span>
        </div>
      </div>

    </div>
  );
};

export default AgentTrackDelivery;