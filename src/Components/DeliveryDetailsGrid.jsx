import React from "react";
import { 
  StarFilled, 
  CarOutlined, 
  PhoneOutlined 
} from "@ant-design/icons";
import "../CSS/DeliveryDetailsGrid.css";

const DeliveryDetailsGrid = () => {
  return (
    <div className="fg-delivery-grid-container">
      <div className="fg-delivery-cards-grid">

        <div className="fg-delivery-info-card">
          <h3 className="fg-delivery-card-title">Driver Details</h3>
          <div className="fg-profile-row">
            <div className="fg-avatar-circle">M</div>
            <div className="fg-profile-text">
              <span className="fg-profile-name">Musa Ibrahim</span>
              <div className="fg-rating-row">
                <StarFilled style={{ color: "#eab308", fontSize: "14px" }} />
                <span className="fg-rating-number">4.8</span>
              </div>
            </div>
          </div>
          <div className="fg-details-list">
            <div className="fg-detail-item">
              <CarOutlined style={{ color: "#6b7280", fontSize: "16px" }} />
              <span className="fg-detail-text">Toyota Hilux (ABC-123-XY)</span>
            </div>
            <div className="fg-detail-item">
              <PhoneOutlined style={{ color: "#6b7280", fontSize: "16px" }} />
              <span className="fg-detail-text">+234 801 234 5678</span>
            </div>
          </div>
        </div>

        <div className="fg-delivery-info-card">
          <h3 className="fg-delivery-card-title">Customer's Details</h3>
          <div className="fg-profile-row">
            <div className="fg-avatar-circle">T</div>
            <div className="fg-profile-text">
              <span className="fg-profile-name">Tolu</span>
              <span className="fg-profile-phone">+234 801 255 5118</span>
            </div>
          </div>
        </div>
        
        <div className="fg-delivery-info-card bg-split">
          <div className="fg-pin-card-top">
            <h3 className="fg-delivery-card-title">Your delivery PIN</h3>
            <p className="fg-pin-instructions">
              Share this PIN with the driver only once goods arrive safely. Entering it confirms delivery and releases escrow.
            </p>
            <div className="fg-pin-display-row">
              <div className="fg-pin-box">4</div>
              <div className="fg-pin-box">2</div>
              <div className="fg-pin-box">5</div>
              <div className="fg-pin-box">4</div>
            </div>
          </div>
          
          <hr className="fg-pin-divider" />
          
          <div className="fg-pin-card-bottom">
            <span className="fg-manual-text">Manually confirm delivery if the driver has arrived:</span>
            <button className="fg-confirm-delivery-btn">Confirm delivery</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeliveryDetailsGrid;