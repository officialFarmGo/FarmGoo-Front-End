import React from "react";
import { LuMapPin, LuClock, LuTruck } from "react-icons/lu";
import "../CSS/ActiveDeliveryNotification.css";
import { Link, useNavigate } from "react-router-dom";

const ActiveDeliveryNotification = ({ dashboardData }) => {
  const nav = useNavigate();
  const deliveries = dashboardData?.deliveriesList || [];

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "badge-pending";
      case "accepted":
        return "badge-accepted";
      case "in transit":
      case "intransit":
        return "badge-transit";
      case "delivered":
        return "badge-delivered";
      default:
        return "badge-default";
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "₦0";
    return `₦${Number(value).toLocaleString()}`;
  };

  if (deliveries.length === 0) {
    return (
      <div className="no-deliveries-card">
        <p>No active deliveries found</p>
      </div>
    );
  }

  return (
    <>
      {deliveries.map((delivery, index) => (
        <div
          key={delivery.id || delivery._id || index}
          className="tracking-card"
        >
          <div className="card-header">
            <div className="header-left">
              <div className="title-row">
                <h2>
                  {delivery.produceType || "Produce"} -{" "}
                  {delivery.quantity || "0kg"}
                </h2>
                <span
                  className={`badge ${getStatusBadgeClass(delivery.status)}`}
                >
                  <LuTruck size={14} className="badge-icon" />
                  {delivery.status || "Pending"}
                </span>
              </div>
              <p className="subtext">
                ID: {delivery.requestId || "TRN-000"} • Created:{" "}
                {delivery.createdAt || "Recent"}
              </p>
            </div>
            <div className="header-right">
              <span className="price">
                {formatCurrency(delivery.price || delivery.estimatedPrice)}
              </span>
            </div>
          </div>

          <div className="route-details">
            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Pickup</span>
                <span className="route-value">
                  {delivery.pickupLocation || "N/A"}
                </span>
              </div>
            </div>

            <div className="route-item">
              <LuMapPin size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">Destination</span>
                <span className="route-value">
                  {delivery.destination || "N/A"}
                </span>
              </div>
            </div>

            <div className="route-item">
              <LuClock size={18} className="route-icon" />
              <div className="route-text">
                <span className="route-label">ETA</span>
                <span className="route-value">{delivery.eta || "N/A"}</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="card-footer">
            <div className="driver-profile">
              <div className="avatar">
                {(delivery.driverName || "U").charAt(0).toUpperCase()}
              </div>
              <div className="driver-info">
                <h3>{delivery.driverName || "Assigning Driver..."}</h3>
                <p>{delivery.driverPhone || ""}</p>
              </div>
            </div>
            <Link
              to={"/agent/dashboard/deliverytrack"}
              state={{ deliveryId: delivery.id || delivery._id }}
            >
              <button className="track-btn">Track Delivery</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveDeliveryNotification;
