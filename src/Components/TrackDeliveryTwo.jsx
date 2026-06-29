import React, { useEffect, useState } from "react";
import { HiOutlineCloud } from "react-icons/hi";
import "../CSS/TrackDeliveryTwo.css";
import { useSelector } from "react-redux";

const TrackDeliveryTwo = ({ onBack, deliveryId }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !deliveryId) return;
    const fetchTrack = async () => {
      try {
        const res = await fetch(`${BaseUrl}/farmerDash/trackDelivery/${deliveryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) setTrackData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrack();
  }, [token, deliveryId]);

  if (loading) {
    return (
      <div className="td-page-wrapper">
        <div className="td-container">
          <p>Loading tracking info...</p>
        </div>
      </div>
    );
  }

  if (!trackData) {
    return (
      <div className="td-page-wrapper">
        <div className="td-container">
          <p>Could not load delivery details.</p>
          <button type="button" className="td-back-btn" onClick={onBack}>Back</button>
        </div>
      </div>
    );
  }

  const { trackingId, status, deliveryPIN, driverDetails, customerDetails, deliveryDetails, weatherAlert } = trackData;

  return (
    <div className="td-page-wrapper">
      <div className="td-container">

        <div className="td-header">
          <div>
            <h1 className="td-main-title">Track Delivery</h1>
            <p className="td-sub-title">Order ID: {trackingId}</p>
          </div>
          <button type="button" className="td-back-btn" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>

        {weatherAlert?.hasAlert && (
          <div className={`td-alert-banner td-alert-${weatherAlert.type}`}>
            <div className="td-alert-icon-box">
              <HiOutlineCloud size={20} />
            </div>
            <div className="td-alert-text">
              <h3>{weatherAlert.title}</h3>
              <p>{weatherAlert.message}</p>
            </div>
          </div>
        )}

        <div className="td-main-grid">

          <div className="td-card">
            <h2 className="td-card-heading">Driver Details</h2>
            {driverDetails ? (
              <div className="td-profile-row">
                <div className="td-avatar td-avatar-green">
                  {driverDetails.name?.charAt(0) ?? "D"}
                </div>
                <div className="td-profile-info">
                  <h3>{driverDetails.name}</h3>
                  <p className="td-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    {driverDetails.vehicleType ?? "—"}
                  </p>
                  <p className="td-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.88a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    {driverDetails.phoneNumber ?? "—"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="td-meta-item">Driver not yet assigned</p>
            )}
          </div>

          <div className="td-card">
            <h2 className="td-card-heading">Customer's Details</h2>
            <div className="td-profile-row">
              <div className="td-avatar td-avatar-teal">C</div>
              <div className="td-profile-info">
                <p className="td-phone-only">{customerDetails?.phoneNumber ?? "—"}</p>
                {customerDetails?.otherNumber && (
                  <p className="td-phone-only">{customerDetails.otherNumber}</p>
                )}
              </div>
            </div>
          </div>

          <div className="td-card td-pin-card">
            <h2 className="td-card-heading">Your delivery PIN</h2>
            <p className="td-pin-instruction">
              Share this PIN with the Customer only once goods arrive safely.
              Entering it confirms delivery and releases escrow.
            </p>

            <div className="td-pin-display">
              {deliveryPIN?.toString().split("").map((digit, i) => (
                <div className="td-pin-box" key={i}>{digit}</div>
              ))}
            </div>

            <div className="td-divider"></div>

            {/* <p className="td-manual-text">
              Manually confirm delivery if the driver has arrived:
            </p>
            <button type="button" className="td-confirm-btn">
              Confirm delivery
            </button> */}
          </div>

        </div>

        <div className="td-details-row">
          <div className="td-card td-details-card">
            <h2 className="td-card-heading">Delivery Details</h2>

            <div className="td-detail-group">
              <span className="td-detail-label">Produce</span>
              <p className="td-detail-value td-bold-text">{deliveryDetails?.produce}</p>
            </div>

            <div className="td-detail-group">
              <span className="td-detail-label">Pickup Location</span>
              <p className="td-detail-value">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {deliveryDetails?.pickupLocation}
              </p>
            </div>

            {deliveryDetails?.landmark && (
              <div className="td-detail-group">
                <span className="td-detail-label">Landmark</span>
                <p className="td-detail-value">{deliveryDetails.landmark}</p>
              </div>
            )}

            <div className="td-detail-group">
              <span className="td-detail-label">Destination</span>
              <p className="td-detail-value">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {deliveryDetails?.destination}
              </p>
            </div>

            <div className="td-detail-group">
              <span className="td-detail-label">Agreed fee</span>
              <p className="td-detail-value td-bold-text">
                ₦{Number(deliveryDetails?.agreedFee).toLocaleString()}
              </p>
            </div>

            <div className="td-detail-group">
              <span className="td-detail-label">Escrow status</span>
              <div className="td-status-badge">{deliveryDetails?.escrowStatus}</div>
            </div>

            <div className="td-detail-group">
              <span className="td-detail-label">Delivery status</span>
              <div className="td-status-badge">{status}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrackDeliveryTwo;