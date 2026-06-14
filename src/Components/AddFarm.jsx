import React from 'react';
import { MdPersonOutline, MdPhone, MdLocationOn } from 'react-icons/md';
import { GiTomato } from 'react-icons/gi';
import "../CSS/AddFarm.css";

const AddFarm = () => {
  return (
    <div className="add-farm-container">
      <div className="add-farm-header">
        <button className="back-btn">
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <h1 className="header-title">Add New Farmer</h1>
        <p className="header-subtitle">Register a new farmer to your network</p>
      </div>

      <div className="form-card">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="farmerName">Farmer Full Name</label>
            <div className="input-wrapper">
              <MdPersonOutline className="input-icon" />
              <input 
                type="text" 
                id="farmerName" 
                placeholder="e.g., Chukwu Okafor" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="input-wrapper">
              <MdPhone className="input-icon" />
              <input 
                type="tel" 
                id="phoneNumber" 
                placeholder="+234 803 456 7890" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="farmLocation">Farm Location</label>
            <div className="input-wrapper">
              <MdLocationOn className="input-icon" />
              <input 
                type="text" 
                id="farmLocation" 
                placeholder="e.g., Badagry, Lagos State" 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="produceType">Main Produce Type</label>
            <div className="input-wrapper">
              <GiTomato className="input-icon" />
              <input 
                type="text" 
                id="produceType" 
                placeholder="e.g., Tomatoes, Yam, Cassava" 
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save-farmer">Save Farmer</button>
            <button type="button" className="btn-save-request">Save & Create Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFarm;