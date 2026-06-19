import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LuArrowRight, LuMapPin } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "../CSS/ActiveDeliveries.css";

const ActiveDeliveries = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token") || auth?.token;

  useEffect(() => {
    const fetchActiveDeliveries = async () => {
      if (!BASE_URL) {
        console.error("API Base URL missing.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/agentDashboard/trackdelivery`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const fetchedData = response.data?.data || response.data;

        if (Array.isArray(fetchedData)) {
          setDeliveries(fetchedData);
        } else if (fetchedData && typeof fetchedData === "object") {
          setDeliveries([fetchedData]);
        }
      } catch (err) {
        console.error("Error fetching active deliveries:", err);
        setError("Failed to load active deliveries.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchActiveDeliveries();
    }
  }, [BASE_URL, token]);

  if (loading) {
    return (
      <div className="active-deliveries-container">
        <p>Loading active deliveries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="active-deliveries-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="active-deliveries-container">
      <div className="deliveries-card-wrapper">
        <div className="deliveries-header-row">
          <h2>Active Deliveries</h2>
          <span
            className="view-all-link"
            onClick={() => navigate("/agent/deliveries")}
          >
            View All Active Deliveries <LuArrowRight />
          </span>
        </div>

        {deliveries.length === 0 ? (
          <p>No active deliveries currently in progress.</p>
        ) : (
          deliveries.map((delivery, index) => (
            <div
              key={delivery?.trackingId || delivery?._id || index}
              className="delivery-info-box"
            >
              <div className="delivery-top-details">
                <div className="item-badge-group">
                  <span className="item-name">
                    {delivery?.deliveryDetails?.produce || "Produce"}
                  </span>
                  <span className="status-badge">
                    {delivery?.status || "In Transit"}
                  </span>
                </div>
                <span className="item-weight">
                  {delivery?.deliveryDetails?.quantity || "0kg"}
                </span>
              </div>

              <div className="delivery-id">
                ID: {delivery?.trackingId || "TRN-001"}
              </div>

              <div className="route-section">
                <div className="route-point">
                  <LuMapPin className="location-icon" />
                  <div className="point-text">
                    <span className="point-label">From</span>
                    <span className="point-location">
                      {delivery?.deliveryDetails?.pickupLocation ||
                        "Pickup Location"}
                    </span>
                  </div>
                </div>

                <div className="route-point">
                  <LuMapPin className="location-icon" />
                  <div className="point-text">
                    <span className="point-label">To</span>
                    <span className="point-location">
                      {delivery?.deliveryDetails?.destination || "Destination"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="delivery-footer-row">
                <span className="driver-info">
                  Driver:{" "}
                  <strong>
                    {delivery?.driver?.name || "Assigning Driver..."}
                  </strong>
                </span>
                <span
                  className="track-link"
                  onClick={() =>
                    navigate(
                      `/agent/track/${delivery?.trackingId || delivery?._id}`,
                    )
                  }
                >
                  Track Delivery <LuArrowRight />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveDeliveries;
