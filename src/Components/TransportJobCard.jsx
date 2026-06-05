import React from "react";
import { 
  EnvironmentOutlined, 
  ArrowRightOutlined, 
  EnvironmentFilled, 
  StarFilled 
} from "@ant-design/icons";
import "../CSS/TransportJobCard.css";

const TransportJobCard = ({ job }) => {
  return (
    <div className="fg-single-job-card">
      <div className="fg-single-job-left">
        <div className="fg-single-card-header">
          <h2 className="fg-single-job-title">{job?.title || "Yam Tubers"}</h2>
          {job?.isUrgent && <span className="fg-card-urgent-badge">Urgent</span>}
          <span className="fg-card-escrow-badge">Escrow Secured</span>
        </div>
        
        <span className="fg-single-job-specs">
          {job?.weight || "1,200kg"} • Job ID: {job?.id || "JOB001"}
        </span>

        <div className="fg-single-route-indicator">
          <div className="fg-card-route-node">
            <EnvironmentOutlined style={{ color: "#16a34a", fontSize: "14px" }} />
            <span className="fg-card-route-text">{job?.pickup || "Badagry"}</span>
          </div>
          <ArrowRightOutlined style={{ fontSize: "12px", color: "#9ca3af" }} />
          <div className="fg-card-route-node">
            <EnvironmentFilled style={{ color: "#ef4444", fontSize: "14px" }} />
            <span className="fg-card-route-text">{job?.destination || "Oshodi Market, Lagos"}</span>
          </div>
        </div>

        <div className="fg-single-metrics-grid">
          <div className="fg-card-spec-block">
            <span className="fg-card-spec-label">Distance</span>
            <span className="fg-card-spec-value">{job?.distance || "12km from you"}</span>
          </div>
          <div className="fg-card-spec-block">
            <span className="fg-card-spec-label">Vehicle Type</span>
            <span className="fg-card-spec-value">{job?.vehicleType || "Pickup Truck"}</span>
          </div>
          <div className="fg-card-spec-block">
            <span className="fg-card-spec-label">Pickup Time</span>
            <span className="fg-card-spec-value">{job?.pickupTime || "Today, 2:00 PM"}</span>
          </div>
          <div className="fg-card-spec-block">
            <span className="fg-card-spec-label">Weather</span>
            <span className="fg-card-spec-value">{job?.weather || "☀️ Sunny"}</span>
          </div>
        </div>

        <div className="fg-single-farmer-footer">
          <div className="fg-card-avatar">
            {(job?.farmerName || "C").charAt(0).toUpperCase()}
          </div>
          <div className="fg-card-farmer-meta">
            <span className="fg-card-farmer-name">{job?.farmerName || "Chukwu Farms"}</span>
            <div className="fg-card-rating-row">
              <StarFilled style={{ color: "#eab308", fontSize: "12px" }} />
              <span className="fg-card-rating-num">{job?.farmerRating || "4.8"}</span>
              <span className="fg-card-verified-text">Verified Farmer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fg-single-job-right">
        <div className="fg-card-payout-box">
          <span className="fg-card-payout-label">Estimated Payout</span>
          <span className="fg-card-payout-amount">₦{job?.payout || "42,000"}</span>
        </div>
        <div className="fg-card-actions-stack">
          <button className="fg-card-btn btn-details">View Details</button>
          <button className="fg-card-btn btn-save">Save for Later</button>
        </div>
      </div>
    </div>
  );
};

export default TransportJobCard;