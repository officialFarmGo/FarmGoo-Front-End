import React from "react";
import { LuMapPin, LuClock, LuTruck } from "react-icons/lu";
import "../CSS/ActiveDeliveryNotification.css";

const ActiveDeliveryNotification = ({ data,onTrack }) => {
  

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
      {data?.map((delivery) => (
        <div className="tracking-card" key={delivery.id || delivery._id}>
          <div className="card-header">
            <div className="header-left">
              <div className="title-row">
                <h2>
                  {delivery.productType.charAt(0).toUpperCase() + delivery.productType.slice(1)} - {delivery.quantity}{delivery.weight}
                </h2>
                <span
                  className={`badge badge-${delivery.status?.toLowerCase().replace(/\s+/g, "-") || "transit"}`}
                >
                  <LuTruck size={14} className="badge-icon" />
                  {delivery.status || "In Transit"}
                </span>
              </div>
              <p className="subtext">
                ID: {delivery.trackingId} • Created: {delivery.createdAt}
              </p>
            </div>
            <div className="header-right">
              <span className="price">
                ₦{Number(delivery.totalFare).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="route-details">
            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Pickup</span>
                <span className="route-value">{delivery.AddressOrpickUpLocation}</span>
              </div>
            </div>

            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Destination</span>
                <span className="route-value">{delivery.Destination}</span>
              </div>
            </div>

            <div className="route-item">
              <LuClock size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">ETA</span>
                <span className="route-value">{delivery.estimatedDuration}</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="card-footer">
            <div className="driver-profile">
              <div className="avatar">
                {delivery.driverId?.firstName ? delivery.driverId.firstName.charAt(0) : "N/A"}
              </div>
              <div className="driver-info">
                <h3>{delivery.driverId?.firstName} {delivery.driverId?.lastName}</h3>
                <p>{delivery.driverId?.phoneNumber}</p>
              </div>
            </div>
            <button className="track-btn"onClick={() => onTrack(delivery._id)}>Track Delivery</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveDeliveryNotification;
