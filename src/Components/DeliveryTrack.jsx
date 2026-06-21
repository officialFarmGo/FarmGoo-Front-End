import React from "react";
import {
  MdArrowBack,
  MdLocalShipping,
  MdCloudQueue,
  MdStar,
  MdPhone,
} from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";
import "../CSS/DeliveryTrack.css";
import DeliveryDetails from "../Components/DeliveryDetails"

const DeliveryTrack = () => {
  return (
    <div className="track-container">
      <div className="track-header">
        <div>
          <h1 className="header-title">Track Delivery</h1>
          <p className="header-subtitle">Order ID: TRN-001</p>
        </div>
        <button className="back-dashboard-btn">Back to Dashboard</button>
      </div>

      <div className="status-banner">
        <div className="status-info">
          <div className="status-icon-circle">
            <MdLocalShipping className="banner-icon" />
          </div>
          <div>
            <h2 className="status-title">In Transit</h2>
            <p className="status-eta">ETA: 1 hour 30 minutes</p>
          </div>
        </div>
        <div className="progress-percentage">
          <span className="percent-num">60%</span>
          <span className="percent-label">Complete</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: "60%" }}></div>
        </div>
      </div>

      <div className="weather-alert">
        <MdCloudQueue className="weather-icon" />
        <div>
          <span className="weather-title">Weather Update</span>
          <p className="weather-text">
            Light rain expected along route. Driver has been notified.
          </p>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-card">
          <h3 className="card-heading">Driver Details</h3>
          <div className="profile-section">
            <div className="avatar-circle">M</div>
            <div>
              <h4 className="profile-name">Musa Ibrahim</h4>
              <div className="rating-row">
                <MdStar className="star-icon" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          <div className="info-row">
            <MdLocalShipping className="info-icon" />
            <span>Toyota Hilux (ABC-123-XY)</span>
          </div>
          <div className="info-row">
            <MdPhone className="info-icon" />
            <span>+234 801 234 5678</span>
          </div>
        </div>

        <div className="details-card">
          <h3 className="card-heading">Customer's Details</h3>
          <div className="profile-section">
            <div className="avatar-circle">T</div>
            <div>
              <h4 className="profile-name">Tolu</h4>
              <p className="profile-phone">+234 801 255 5118</p>
            </div>
          </div>
        </div>

        <div className="details-card pin-card-1">
          <h3 className="card-heading">Your delivery PIN</h3>
          <p className="pin-description">
            Share this PIN with the Customer only once goods arrive safely.
            Entering it confirms delivery and releases escrow.
          </p>
          <div className="pin-box-row">
            <div className="pin-digit">4</div>
            <div className="pin-digit">2</div>
            <div className="pin-digit">5</div>
            <div className="pin-digit">4</div>
          </div>
          <div className="pin-divider"></div>
          <p className="pin-footer-text">
            Manually confirm delivery if the driver has arrived:
          </p>
          <button className="confirm-delivery-btn">Confirm delivery</button>
        </div>
      </div>
      <DeliveryDetails />
    </div>
  );
};

export default DeliveryTrack;
