import React from 'react';
import { MdPersonOutline, MdLocationOn, MdPhone, MdCalendarToday, MdLocalShipping, MdAttachMoney } from 'react-icons/md';
import { GiTomato, GiCardboardBoxClosed } from 'react-icons/gi';
import "../CSS/TransportRequest.css";

const TransportRequest = () => {
  return (
    <div className="transport-container">
      <div className="transport-header">
        <button className="back-btn">
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <h1 className="header-title">Create Transport Request</h1>
        <p className="header-subtitle">Request transport for farmer's produce</p>
      </div>

      <div className="form-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="selectFarmer">Select Farmer</label>
            <div className="input-wrapper select-wrapper">
              <MdPersonOutline className="input-icon" />
              <select id="selectFarmer" defaultValue="">
                <option value="" disabled>Choose a farmer</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="produceType">Produce Type</label>
            <div className="input-wrapper">
              <GiTomato className="input-icon" />
              <input 
                type="text" 
                id="produceType" 
                placeholder="e.g., Tomatoes" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity (kg or Bags)</label>
            <div className="input-wrapper">
              <GiCardboardBoxClosed className="input-icon" />
              <input 
                type="text" 
                id="quantity" 
                placeholder="e.g., 500kg" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pickupLocation">Pickup Location</label>
            <div className="input-wrapper">
              <MdLocationOn className="input-icon" />
              <input 
                type="text" 
                id="pickupLocation" 
                placeholder="e.g., Oshodi, Lagos State" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <div className="input-wrapper">
              <MdLocationOn className="input-icon" />
              <input 
                type="text" 
                id="destination" 
                placeholder="e.g., Mile 12 Market, Lagos" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customerDetails">Customer's Details</label>
            <div className="input-wrapper">
              <MdPhone className="input-icon" />
              <input 
                type="tel" 
                id="customerDetails" 
                placeholder="0801 255 5118" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="pickupDate">Pickup Date</label>
            <div className="input-wrapper">
              <MdCalendarToday className="input-icon" />
              <input 
                type="date" 
                id="pickupDate" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type Needed</label>
            <div className="input-wrapper select-wrapper">
              <MdLocalShipping className="input-icon" />
              <select id="vehicleType" defaultValue="">
                <option value="" disabled>Select vehicle typ</option>
              </select>
            </div>
          </div>

          <div className="estimation-box">
            <div className="estimation-row">
              <MdAttachMoney className="est-icon" />
              <span className="est-text bold-text">Estimated Price</span>
            </div>
            <div className="estimation-row">
              <MdAttachMoney className="est-icon" />
              <span className="est-text bold-text">Service Fee</span>
            </div>
            <div className="estimation-divider">-</div>
            <p className="estimation-footer">Final price may vary based on driver bids and market conditions</p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Submit Request</button>
            <button type="button" className="btn-save-draft">Save Draft</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportRequest;