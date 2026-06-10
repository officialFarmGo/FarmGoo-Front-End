import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "../CSS/DriverActiveDelivery.css";

const DriverActiveDelivery = () => {
  const navigate = useNavigate();

  return (
    <div className="fg-delivery-details-view">
      
      <button 
        className="fg-delivery-back-nav" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeftOutlined />
        <span>Back to Deliveries</span>
      </button>

      <div className="fg-delivery-hero-summary">
        <div className="fg-hero-title-block">
          <div className="fg-hero-title-row">
            <h1 className="fg-hero-main-title">Tomatoes</h1>
            <span className="fg-status-pill-transit">In Transit</span>
          </div>
          <p className="fg-hero-meta-subtitle">500kg • Delivery ID: DEL001</p>
        </div>
        
        <div className="fg-earnings-badge-card">
          <span className="fg-badge-label-tag">Payment</span>
          <h2 className="fg-badge-price-value">₦28,500</h2>
        </div>
      </div>

      <div className="fg-delivery-two-column-grid">
        
        <div className="fg-delivery-primary-column">
          
          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title">Delivery Progress</h3>
            
            <div className="fg-timeline-stepper-container">
              
              <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line is-completed"></div>
                <div className="fg-timeline-status-icon-box completed">
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Delivery Accepted</h4>
                  <span className="fg-timeline-step-timestamp">7:30 AM</span>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line is-completed"></div>
                <div className="fg-timeline-status-icon-box completed">
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Arrived at Pickup</h4>
                  <span className="fg-timeline-step-timestamp">8:00 AM</span>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line is-completed"></div>
                <div className="fg-timeline-status-icon-box completed">
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">Produce Loaded</h4>
                  <span className="fg-timeline-step-timestamp">8:45 AM</span>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line"></div>
                <div className="fg-timeline-status-icon-box current">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading">In Transit</h4>
                  <span className="fg-timeline-step-timestamp">9:00 AM - Now</span>
                  <div className="fg-timeline-live-indicator-pill">
                    <span className="fg-live-pulse-dot"></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className="fg-timeline-vector-line"></div>
                <div className="fg-timeline-status-icon-box pending">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading pending">Arrive at Destination</h4>
                  <span className="fg-timeline-step-timestamp">Est. 11:00 AM</span>
                </div>
              </div>

              <div className="fg-timeline-node-row">
                <div className="fg-timeline-status-icon-box pending">
                  <CheckCircleOutlined />
                </div>
                <div className="fg-timeline-meta-content">
                  <h4 className="fg-timeline-step-heading pending">Delivery Complete</h4>
                  <span className="fg-timeline-step-timestamp">Pending</span>
                </div>
              </div>

            </div>
          </div>

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title">Route Details</h3>
            
            <div className="fg-route-locations-stack">
              <div className="fg-route-connector-vector"></div>

              <div className="fg-route-point-row">
                <div className="fg-route-marker-icon-wrapper pickup">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-route-text-details">
                  <span className="fg-route-node-tag-label">Pickup Location</span>
                  <h4 className="fg-route-specific-title">Ikorodu Farm</h4>
                  <p className="fg-route-sub-description">Ikorodu Farm market, Lagos</p>
                  <div className="fg-route-dynamic-status-row pickup">
                    <CheckCircleOutlined style={{ fontSize: "12px" }} />
                    <span>Picked up at 8:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="fg-route-point-row">
                <div className="fg-route-marker-icon-wrapper destination">
                  <EnvironmentOutlined />
                </div>
                <div className="fg-route-text-details">
                  <span className="fg-route-node-tag-label">Delivery Location</span>
                  <h4 className="fg-route-specific-title">Mile 12 Market, Lagos</h4>
                  <p className="fg-route-sub-description">Mile 12 Market, Kosofe, Lagos</p>
                  <div className="fg-route-dynamic-status-row destination">
                    <ClockCircleOutlined style={{ fontSize: "12px" }} />
                    <span>Est. arrival: 11:00 AM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="fg-delivery-secondary-column">
          
          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Quick Actions</h3>
            <div className="fg-actions-vertical-group">
              <button className="fg-action-btn-primary-solid">
                <CheckCircleOutlined />
                <span>Complete Delivery</span>
              </button>
              <button className="fg-action-btn-secondary-outline">
                <CameraOutlined />
                <span>Upload Photo</span>
              </button>
              <button className="fg-action-btn-secondary-outline">
                <WarningOutlined />
                <span>Report Issue</span>
              </button>
            </div>
          </div>

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Contact Farmer</h3>
            <div className="fg-contact-card-profile-row">
              <div className="fg-contact-avatar-circle">J</div>
              <div className="fg-contact-meta-info">
                <h4 className="fg-contact-display-name">Oshodi Farms Ltd</h4>
                <p className="fg-contact-phone-digits">+234 803 123 4567</p>
              </div>
            </div>
          </div>

          <div className="fg-delivery-panel-card">
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Contact Customer</h3>
            <div className="fg-contact-card-profile-row">
              <div className="fg-contact-avatar-circle">T</div>
              <div className="fg-contact-meta-info">
                <h4 className="fg-contact-display-name">Tolu</h4>
                <p className="fg-contact-phone-digits">+234 803 123 4567</p>
              </div>
            </div>
          </div>

          <div className="fg-alert-banner-box">
            <div className="fg-alert-banner-icon-wrapper">
              <WarningOutlined />
            </div>
            <div className="fg-alert-text-stack">
              <h4 className="fg-alert-bold-title">Weather Alert</h4>
              <p className="fg-alert-paragraph-desc">
                Light traffic expected on Abuja-Kaduna expressway. Plan accordingly.
              </p>
            </div>
          </div>

          <div className="fg-delivery-panel-card" style={{ border: "1px solid #dcfce7", backgroundColor: "#f0fdf4" }}>
            <h3 className="fg-panel-section-title" style={{ marginBottom: "16px" }}>Payment Status</h3>
            <div className="fg-escrow-breakdown-table">
              <div className="fg-escrow-data-row">
                <span className="fg-escrow-row-label">Escrow Status</span>
                <span className="fg-escrow-row-value status-secured">Secured</span>
              </div>
              <div className="fg-escrow-data-row total-line">
                <span className="fg-escrow-row-label bold">Amount</span>
                <span className="fg-escrow-row-value bold-total">₦28,500</span>
              </div>
            </div>
            <p className="fg-escrow-disclaimer-text">
              Payment will be released automatically upon successful delivery confirmation
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DriverActiveDelivery;
