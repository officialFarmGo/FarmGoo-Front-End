import React, { useEffect, useState } from "react";
import "../CSS/ActiveDeliveries.css";
import { LuArrowRight, LuMapPin, LuPackageOpen } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActiveDeliveries = ({ onTrack }) => {
  const nav =useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BaseUrl}/farmerDash/activeDeliveries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) {
          setData(json.data.activeDeliveries ?? []);
          setStatus(json.data.status ?? null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDeliveries();
  }, [token]);

  const hasNoDeliveries = data.length === 0;

  return (
    <div className="activedeliveries-body">
      <div className="active-deliveries-container">
        <div className="deliveries-card-wrapper">
          <div className="deliveries-header-row">
            <h2>Active Deliveries</h2>
            {status && (
              <div className="deliveries-status-pills">
                {/* <span>Total: {status.total}</span>
                <span>Pending: {status.pending}</span>
                <span>Accepted: {status.Accepted}</span>
                <span>Delivered: {status.Delivered}</span> */}
              </div>
            )}
            {!hasNoDeliveries && (
              <a href="#view-all" className="view-all-link" onClick={() =>nav('activedelivery')}>
                View All Active Deliveries <LuArrowRight />
              </a>
            )}
          </div>

          {loading && <p>Loading deliveries...</p>}

          {!loading && hasNoDeliveries && (
            <div className="deliveries-empty-state">
              <div className="empty-icon-circle">
                <LuPackageOpen className="empty-package-icon" />
              </div>
              <h3>No active deliveries</h3>
              <p>You don't have any transport requests running at the moment.</p>
            </div>
          )}

          {!loading && !hasNoDeliveries && data.map((delivery, index) => (
            <div className="delivery-info-box" key={delivery._id || index}>
              <div className="delivery-top-details">
                <div className="item-badge-group">
                  <span className="item-name">{delivery.produce}</span>
                  <span className="status-badge">{delivery.status}</span>
                </div>
                <span className="item-weight">{delivery.quantity}Kg</span>
              </div>

              <div className="delivery-id">
                ID: {delivery.trackingId || delivery._id}
              </div>

              <div className="route-section">
                <div className="route-point">
                  <LuMapPin className="location-icon" />
                  <div className="point-text">
                    <span className="point-label">From</span>
                    <span className="point-location">{delivery.AddressOrpickUpLocation
}</span>
                  </div>
                </div>

                <div className="route-point">
                  <LuMapPin className="location-icon" />
                  <div className="point-text">
                    <span className="point-label">To</span>
                    <span className="point-location">{delivery.Destination}</span>
                  </div>
                </div>
              </div>

              <div className="delivery-footer-row">
                <span className="driver-info">
                  Driver: <strong>{delivery.driverName || "Assigning..."}</strong>
                </span>
                <button className="track-btn" onClick={() => onTrack(delivery._id)}>
                  Track Delivery <LuArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveDeliveries;