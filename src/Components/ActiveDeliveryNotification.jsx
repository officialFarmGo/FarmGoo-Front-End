import React from "react";
import { LuMapPin, LuClock, LuTruck } from "react-icons/lu";
import "../CSS/ActiveDeliveryNotification.css";

const ActiveDeliveryNotification = ({ data }) => {
  console.log(data);

  // 1. DIRECT EMPTY STATE INTERFACE
  if (!data || data.length === 0) {
    return (
      <div className="empty-state-container">
        <div className="empty-state-icon-wrapper">
          <LuTruck size={40} className="empty-state-icon" />
        </div>
        <h3 className="empty-state-title">No Active Deliveries</h3>
        <p className="empty-state-description">
          You don't have any shipments on the road right now. Active dispatches
          will appear here automatically.
        </p>
      </div>
    );
  }

  // 2. ACTIVE DATA MAPPING
  return (
    <>
      {data.map((delivery) => (
        <div className="tracking-card" key={delivery.id || delivery._id}>
          <div className="card-header">
            <div className="header-left">
              <div className="title-row">
                <h2>
                  {delivery.item} - {delivery.quantity}
                </h2>
                <span
                  className={`badge badge-${delivery.status?.toLowerCase().replace(/\s+/g, "-") || "transit"}`}
                >
                  <LuTruck size={14} className="badge-icon" />
                  {delivery.status || "In Transit"}
                </span>
              </div>
              <p className="subtext">
                ID: {delivery.id} • Created: {delivery.createdAt}
              </p>
            </div>
            <div className="header-right">
              <span className="price">
                ₦{Number(delivery.price).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="route-details">
            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Pickup</span>
                <span className="route-value">{delivery.pickup}</span>
              </div>
            </div>

            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Destination</span>
                <span className="route-value">{delivery.destination}</span>
              </div>
            </div>

            <div className="route-item">
              <LuClock size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">ETA</span>
                <span className="route-value">{delivery.eta}</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="card-footer">
            <div className="driver-profile">
              <div className="avatar">
                {delivery.driverName ? delivery.driverName.charAt(0) : "D"}
              </div>
              <div className="driver-info">
                <h3>{delivery.driverName}</h3>
                <p>{delivery.driverPhone}</p>
              </div>
            </div>
            <button className="track-btn">Track Delivery</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveDeliveryNotification;
