import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { HiOutlineArrowLeft, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import "../CSS/AgentDeliveries.css";

const AgentDeliveries = ({ onBackClick, onTrackClick }) => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [deliveries, setDeliveries] = useState([]);
  const [stats, setStats] = useState({
    totalActive: 0,
    inTransit: 0,
    completed: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveriesData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${BaseUrl}/agentDashboard/getAlldeliveries`, {
          headers: { 
            accept: "*/*",
            Authorization: `Bearer ${token}` 
          },
        });

        if (response.data?.data) {
          setDeliveries(response.data.data.deliveries || []);
          setStats(response.data.data.stats || { 
            totalActive: 0, 
            inTransit: 0, 
            completed: 0, 
            pending: 0 
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching live deliveries:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchDeliveriesData();
  }, [token, BaseUrl]);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "in transit": return "fg-badge-transit";
      case "accepted": return "fg-badge-accepted";
      case "delivered": return "fg-badge-delivered";
      case "pending": return "fg-badge-pending";
      default: return "fg-badge-default";
    }
  };

  if (loading) return <div className="fg-deliv-loading">Loading transport logs...</div>;
  if (error) return <div className="fg-deliv-error">Error loading records: {error}</div>;

  return (
    <div className="fg-deliv-page-container">
      <button type="button" className="fhub-back-btn" onClick={onBackClick}>
        <HiOutlineArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="fg-deliv-header-section">
        <h1 className="fg-deliv-main-title">Deliveries</h1>
        <p className="fg-deliv-subtitle">Monitor all transport requests and deliveries</p>
      </div>

      <div className="fg-deliv-summary-grid">
        <div className="fg-deliv-stat-card">
          <span className="fg-deliv-stat-number">{stats.totalActive}</span>
          <span className="fg-deliv-stat-label">Total Active</span>
        </div>
        <div className="fg-deliv-stat-card">
          <span className="fg-deliv-stat-number fg-text-blue">{stats.inTransit}</span>
          <span className="fg-deliv-stat-label">In Transit</span>
        </div>
        <div className="fg-deliv-stat-card">
          <span className="fg-deliv-stat-number fg-text-green">{stats.completed}</span>
          <span className="fg-deliv-stat-label">Completed</span>
        </div>
        <div className="fg-deliv-stat-card">
          <span className="fg-deliv-stat-number fg-text-orange">{stats.pending}</span>
          <span className="fg-deliv-stat-label">Pending</span>
        </div>
      </div>

      <div className="fg-deliv-list-wrapper">
        {!Array.isArray(deliveries) || deliveries.length === 0 ? (
          <div className="fhub-empty-state" style={{ padding: "40px", textAlign: "center", background: "#fff", borderRadius: "12px", border: "1px solid #f3f4f6", color: "#6b7280" }}>
            No transport delivery logs recorded on this account profile yet.
          </div>
        ) : (
          deliveries.map((delivery) => (
            <div key={delivery._id || delivery.id} className="fg-deliv-item-card">
              <div className="fg-deliv-card-top-row">
                <div className="fg-deliv-title-block">
                  <h3 className="fg-deliv-produce-name">
                    {delivery.produceType || "Crop Products"}
                    <span className={`fg-deliv-status-badge ${getStatusBadgeClass(delivery.status)}`}>
                      {delivery.status || "Pending"}
                    </span>
                  </h3>
                  <p className="fg-deliv-specs">
                    {delivery.quantity || delivery.weight || "0 units"} • ID: {delivery._id || "N/A"}
                  </p>
                </div>
              </div>

              <div className="fg-deliv-handlers-box">
                <div className="fg-deliv-handler-col">
                  <span className="fg-handler-lbl">Farmer</span>
                  <span className="fg-handler-name">{delivery.farmerName || delivery.farmer || "Unknown Farmer"}</span>
                </div>
                <div className="fg-deliv-handler-col">
                  <span className="fg-handler-lbl">Driver</span>
                  <span className="fg-handler-name">{delivery.driverName || delivery.driver || "Not assigned"}</span>
                </div>
              </div>

              <div className="fg-deliv-card-footer">
                <div className="fg-deliv-route-info">
                  <HiOutlineLocationMarker className="fg-deliv-icon fg-text-green-dim" />
                  <span className="fg-route-text">{delivery.pickupLocation || "Farm Site"}</span>
                  <span className="fg-route-arrow">→</span>
                  <HiOutlineLocationMarker className="fg-deliv-icon fg-text-red-dim" />
                  <span className="fg-route-text">{delivery.deliveryLocation || "Market Depot"}</span>
                </div>
                
                <div className="fg-deliv-meta-stamps">
                  <div className="fg-meta-stamp-item">
                    <HiOutlineClock className="fg-deliv-icon" />
                    <span>{delivery.durationText || delivery.estimatedTime || "Processing"}</span>
                  </div>
                  <div className="fg-meta-stamp-item">
                    <span className="fg-commission-label">Commission:</span>
                    <span className="fg-commission-value">
                      {(delivery.totalFare || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Track Delivery Button at the bottom of card */}
              <button 
                type="button" 
                className="fg-deliv-track-btn"
                onClick={() => onTrackClick(delivery._id)}
              >
                <FiEye size={16} />
                Track Delivery
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentDeliveries;