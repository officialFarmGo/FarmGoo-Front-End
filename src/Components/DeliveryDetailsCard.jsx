import React from 'react'
import "../CSS/DeliveryDetailsCard.css"

const DeliveryDetailsCard = () => {
  return (
    <div className="delivery-card">
      <h2 className="delivery-title">Delivery Details</h2>
      
      <div className="delivery-section">
        <span className="section-label">Produce</span>
        <span className="section-value bold-text">Tomatoes - 500kg</span>
      </div>

      <div className="delivery-section">
        <span className="section-label">Pickup Location</span>
        <div className="location-wrapper">
          <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="section-value">Ikorodu Farm</span>
        </div>
      </div>

      <div className="delivery-section">
        <span className="section-label">Destination</span>
        <div className="location-wrapper">
          <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="section-value">Mile 12 Market</span>
        </div>
      </div>

      <div className="delivery-section">
        <span className="section-label">Agreed fee</span>
        <span className="section-value price-text">₦28,500</span>
      </div>

      <div className="delivery-section">
        <span className="section-label">Escrow status</span>
        <div className="status-badge">Held</div>
      </div>
    </div>
  )
}

export default DeliveryDetailsCard