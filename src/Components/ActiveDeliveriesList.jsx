import React from "react";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import "../CSS/ActiveDeliveriesList.css";
import { useNavigate } from "react-router-dom";

const ActiveDeliveriesList = () => {

  const nav = useNavigate();
  return (
    <div className="fg-active-deliveries-container">
      <div className="fg-active-card-wrapper">
        
        <div className="fg-active-header">
          <div className="fg-active-title-block">
            <h2 className="fg-active-heading" >Active Deliveries</h2>
            <span className="fg-active-subheading">Track your ongoing deliveries</span>
          </div>
          <button className="fg-view-all-btn" 
          onClick={() => nav('activedelivery')}
          >
            View All <ArrowRightOutlined style={{ fontSize: "12px", marginLeft: "4px" }}  />
          </button>
        </div>

        <div className="fg-delivery-items-stack">

          {/* Item 1: Tomatoes */}
          <div className="fg-delivery-item-row">
            <div className="fg-row-top">
              <div className="fg-row-title-area">
                <span className="fg-item-title">Tomatoes</span>
                <span className="fg-badge in-transit">In Transit</span>
              </div>
              <div className="fg-row-price-area">
                <span className="fg-item-price">₦25,000</span>
                <span className="fg-item-eta">ETA: 2 hours</span>
              </div>
            </div>

            <div className="fg-row-meta">
              <span className="fg-meta-text">500kg • ID: DEL001</span>
              <div className="fg-route-indicator">
                <span className="fg-route-point">Ikorodu farm</span>
                <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                <span className="fg-route-point">Mile 12 Market, Lagos</span>
              </div>
            </div>

            <div className="fg-progress-section">
              <div className="fg-progress-text-row">
                <span className="fg-progress-label">Progress</span>
                <span className="fg-progress-num">65%</span>
              </div>
              <div className="fg-bar-bg">
                <div className="fg-bar-fill filled-dark" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>

          {/* Item 2: Cassava */}
          <div className="fg-delivery-item-row">
            <div className="fg-row-top">
              <div className="fg-row-title-area">
                <span className="fg-item-title">Cassava</span>
                <span className="fg-badge loading">Loading</span>
              </div>
              <div className="fg-row-price-area">
                <span className="fg-item-price">₦45,000</span>
                <span className="fg-item-eta">ETA: 30 mins to start</span>
              </div>
            </div>

            <div className="fg-row-meta">
              <span className="fg-meta-text">800kg • ID: DEL002</span>
              <div className="fg-route-indicator">
                <span className="fg-route-point">Abeokuta, Ogun</span>
                <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                <span className="fg-route-point">Ikeja, Lagos</span>
              </div>
            </div>

            <div className="fg-progress-section">
              <div className="fg-progress-text-row">
                <span className="fg-progress-label">Progress</span>
                <span className="fg-progress-num">25%</span>
              </div>
              <div className="fg-bar-bg">
                <div className="fg-bar-fill filled-dark" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>

          {/* Item 3: Fresh Pepper */}
          <div className="fg-delivery-item-row">
            <div className="fg-row-top">
              <div className="fg-row-title-area">
                <span className="fg-item-title">Fresh Pepper</span>
                <span className="fg-badge accepted">Accepted</span>
              </div>
              <div className="fg-row-price-area">
                <span className="fg-item-price">₦28,000</span>
                <span className="fg-item-eta">ETA: 1 hour to pickup</span>
              </div>
            </div>

            <div className="fg-row-meta">
              <span className="fg-meta-text">300kg • ID: DEL003</span>
              <div className="fg-route-indicator">
                <span className="fg-route-point">Ibadan, Oyo</span>
                <ArrowRightOutlined style={{ fontSize: "12px", color: "#6b7280" }} />
                <span className="fg-route-point">Bodija Market, Ibadan</span>
              </div>
            </div>

            <div className="fg-progress-section">
              <div className="fg-progress-text-row">
                <span className="fg-progress-label">Progress</span>
                <span className="fg-progress-num">10%</span>
              </div>
              <div className="fg-bar-bg">
                <div className="fg-bar-fill filled-dark" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActiveDeliveriesList;