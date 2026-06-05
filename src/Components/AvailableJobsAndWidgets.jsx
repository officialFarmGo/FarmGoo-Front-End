import React from "react";
import { 
  ArrowRightOutlined, 
  StarFilled, 
  CheckCircleOutlined, 
  DollarOutlined, 
  CarOutlined 
} from "@ant-design/icons";
import "../CSS/AvailableJobsAndWidgets.css";

const AvailableJobsAndWidgets = () => {
  return (
    <div className="fg-bottom-layout-container">
      
      {/* SECTION A: AVAILABLE JOBS NEAR YOU */}
      <div className="fg-jobs-panel-card">
        <div className="fg-jobs-panel-header">
          <div className="fg-jobs-header-title">
            <h2 className="fg-jobs-main-heading">Available Jobs Near You</h2>
            <span className="fg-jobs-sub-heading">New transport requests from farmers</span>
          </div>
          <button className="fg-browse-all-btn">
            Browse All Jobs <ArrowRightOutlined style={{ fontSize: "12px", marginLeft: "6px" }} />
          </button>
        </div>

        <div className="fg-jobs-list-stack">

          {/* Job Item 1: Yam Tubers */}
          <div className="fg-job-row-item">
            <div className="fg-job-item-left">
              <h3 className="fg-job-item-title">Yam Tubers</h3>
              <span className="fg-job-item-specs">1,200kg • 12km from you</span>
              <div className="fg-job-route-row">
                <span className="fg-job-route-point">Badagry</span>
                <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                <span className="fg-job-route-point">Oshodi Market, Lagos</span>
              </div>
              <div className="fg-job-rating-row">
                <StarFilled style={{ color: "#eab308", fontSize: "14px" }} />
                <span className="fg-job-rating-text"><strong>4.8</strong> Farmer Rating</span>
              </div>
            </div>
            <div className="fg-job-item-right">
              <span className="fg-job-payout-text">₦42,000</span>
              <button className="fg-job-details-btn">View Details</button>
            </div>
          </div>

          {/* Job Item 2: Palm Oil */}
          <div className="fg-job-row-item">
            <div className="fg-job-item-left">
              <div className="fg-job-title-with-badge">
                <h3 className="fg-job-item-title">Palm Oil</h3>
                <span className="fg-job-badge-urgent">Urgent</span>
              </div>
              <span className="fg-job-item-specs">200L • 8km from you</span>
              <div className="fg-job-route-row">
                <span className="fg-job-route-point">Ogun state</span>
                <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                <span className="fg-job-route-point">Trade Fair, Lagos</span>
              </div>
              <div className="fg-job-rating-row">
                <StarFilled style={{ color: "#eab308", fontSize: "14px" }} />
                <span className="fg-job-rating-text"><strong>4.9</strong> Farmer Rating</span>
              </div>
            </div>
            <div className="fg-job-item-right">
              <span className="fg-job-payout-text">₦65,000</span>
              <button className="fg-job-details-btn">View Details</button>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION B: 3 BOTTOM FOOTER WIDGETS */}
      <div className="fg-footer-widgets-grid">
        
        {/* Widget 1: Completed This Week */}
        <div className="fg-footer-widget-card">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-green-light">
              <CheckCircleOutlined style={{ fontSize: "18px", color: "#16a34a" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Completed This Week</span>
              <span className="fg-widget-main-value">24</span>
            </div>
          </div>
          <span className="fg-widget-growth-indicator">+12% from last week</span>
        </div>

        {/* Widget 2: Wallet Balance */}
        <div className="fg-footer-widget-card justify-widget-content">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-gray-light">
              <DollarOutlined style={{ fontSize: "18px", color: "#4b5563" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Wallet Balance</span>
              <span className="fg-widget-main-value">₦285,000</span>
            </div>
          </div>
          <button className="fg-widget-action-btn">Manage Wallet</button>
        </div>

        {/* Widget 3: Vehicle Status */}
        <div className="fg-footer-widget-card">
          <div className="fg-widget-top-row">
            <div className="fg-widget-icon-box bg-blue-light">
              <CarOutlined style={{ fontSize: "18px", color: "#2563eb" }} />
            </div>
            <div className="fg-widget-title-block">
              <span className="fg-widget-label">Vehicle Status</span>
              <span className="fg-widget-status-active">Active & Ready</span>
            </div>
          </div>
          <span className="fg-widget-footer-meta">Toyota Hilux • ABC-123XY</span>
        </div>

      </div>

    </div>
  );
};

export default AvailableJobsAndWidgets;