import React from "react";
import "../CSS/ActiveDeliveries.css";
import { LuArrowRight, LuMapPin } from "react-icons/lu";

const ActiveDeliveries = () => {
  return (
    <div className="active-deliveries-container">
      <div className="deliveries-card-wrapper">
        <div className="deliveries-header-row">
          <h2>Active Deliveries</h2>
          <a href="#view-all" className="view-all-link">
            View All Active Deliveries <LuArrowRight />
          </a>
        </div>

        <div className="delivery-info-box">
          <div className="delivery-top-details">
            <div className="item-badge-group">
              <span className="item-name">Tomatoes</span>
              <span className="status-badge">In Transit</span>
            </div>
            <span className="item-weight">500kg</span>
          </div>
          
          <div className="delivery-id">ID: TRN-001</div>

          <div className="route-section">
            <div className="route-point">
              <LuMapPin className="location-icon" />
              <div className="point-text">
                <span className="point-label">From</span>
                <span className="point-location">Ikorodu Farm</span>
              </div>
            </div>

            <div className="route-point">
              <LuMapPin className="location-icon" />
              <div className="point-text">
                <span className="point-label">To</span>
                <span className="point-location">Mile 12 Market</span>
              </div>
            </div>
          </div>

          <div className="delivery-footer-row">
            <span className="driver-info">
              Driver: <strong>Musa Ibrahim</strong>
            </span>
            <a href="#track" className="track-link">
              Track Delivery <LuArrowRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveDeliveries;