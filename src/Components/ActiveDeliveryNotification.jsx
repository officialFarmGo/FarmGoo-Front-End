import React from "react";
import { LuMapPin, LuClock, LuTruck } from "react-icons/lu";
import "../CSS/ActiveDeliveryNotification.css";
import { Link, useNavigate } from "react-router-dom";

const ActiveDeliveryNotification = () => {
  const nav = useNavigate();
  return (
    <div className="tracking-card">
      <div className="card-header">
        <div className="header-left">
          <div className="title-row">
            <h2>Tomatoes - 500kg</h2>
            <span className="badge badge-transit">
              <LuTruck size={14} className="badge-icon" />
              In Transit
            </span>
          </div>
          <p className="subtext">ID: TRN-001 • Created: May 17, 2026</p>
        </div>
        <div className="header-right">
          <span className="price">₦28,500</span>
        </div>
      </div>

      <div className="route-details">
        <div className="route-item">
          <LuMapPin size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">Pickup</span>
            <span className="route-value">Ikorodu Farm</span>
          </div>
        </div>

        <div className="route-item">
          <LuMapPin size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">Destination</span>
            <span className="route-value">Mile 12 Market</span>
          </div>
        </div>

        <div className="route-item">
          <LuClock size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">ETA</span>
            <span className="route-value">2 hours</span>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="card-footer">
        <div className="driver-profile">
          <div className="avatar">M</div>
          <div className="driver-info">
            <h3>Musa Ibrahim</h3>
            <p>+234 801 234 5678</p>
          </div>
        </div>
        <Link
          to={"/agent/dashboard/deliverytrack"}
          state={{ textdecoration: "none" }}
        >
          <button className="track-btn">Track Delivery</button>
        </Link>
      </div>
    </div>
  );
};

export default ActiveDeliveryNotification;
