import React from "react";
import "../CSS/ActiveDeliveries.css";
import { LuArrowRight, LuMapPin, LuPackageOpen } from "react-icons/lu";

const ActiveDeliveries = ({ data }) => {
  console.log(data);

  // Check if data is null, undefined, or empty
  const hasNoDeliveries = !data || data.length === 0;

  return (
    <div className="activedeliveries-body">
      <div className="active-deliveries-container">
        <div className="deliveries-card-wrapper">
          <div className="deliveries-header-row">
            <h2>Active Deliveries</h2>
            {!hasNoDeliveries && (
              <a href="#view-all" className="view-all-link">
                View All Active Deliveries <LuArrowRight />
              </a>
            )}
          </div>

          {hasNoDeliveries ? (
            <div className="deliveries-empty-state">
              <div className="empty-icon-circle">
                <LuPackageOpen className="empty-package-icon" />
              </div>
              <h3>No active deliveries</h3>
              <p>
                You don't have any transport requests running at the moment.
              </p>
            </div>
          ) : (
            // Map over your array data here if there are items available
            data.map((delivery, index) => (
              <div className="delivery-info-box" key={delivery.id || index}>
                <div className="delivery-top-details">
                  <div className="item-badge-group">
                    <span className="item-name">
                      {delivery.produce || "Tomatoes"}
                    </span>
                    <span className="status-badge">
                      {delivery.status || "In Transit"}
                    </span>
                  </div>
                  <span className="item-weight">
                    {delivery.weight || "500kg"}
                  </span>
                </div>

                <div className="delivery-id">
                  ID: {delivery.id || "TRN-001"}
                </div>

                <div className="route-section">
                  <div className="route-point">
                    <LuMapPin className="location-icon" />
                    <div className="point-text">
                      <span className="point-label">From</span>
                      <span className="point-location">
                        {delivery.pickup || "Ikorodu Farm"}
                      </span>
                    </div>
                  </div>

                  <div className="route-point">
                    <LuMapPin className="location-icon" />
                    <div className="point-text">
                      <span className="point-label">To</span>
                      <span className="point-location">
                        {delivery.destination || "Mile 12 Market"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="delivery-footer-row">
                  <span className="driver-info">
                    Driver:{" "}
                    <strong>{delivery.driverName || "Musa Ibrahim"}</strong>
                  </span>
                  <a href="#track" className="track-link">
                    Track Delivery <LuArrowRight />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveDeliveries;
