import React, { useState } from "react";
import "../CSS/PersonlaProfile.css";
const PersonlaProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="personal-profile-container">
      {/* Top Tab Navigation Bar */}
      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === "personal" ? "active" : ""}`}
          onClick={() => setActiveTab("personal")}
        >
          Personal Info
        </button>
        
      </div>

      {/* Main Form Box Wrapper */}
      <div className="form-card">
        <h3>Personal Information</h3>

        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          {/* Row 1: Name Inputs */}
          <div className="form-row text-inputs-split">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" defaultValue="Adebayo" readOnly />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" defaultValue="Balogun" readOnly />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="form-row">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                defaultValue="adebayo.balogun@email.com"
                readOnly
              />
            </div>
          </div>

          {/* Row 3: Phone Number with Action Button */}
          <div className="form-row">
            <div className="input-group">
              <label>Phone Number</label>
              <div className="phone-input-wrapper">
                <input type="text" defaultValue="+234 803 456 7890" readOnly />
                <button type="button" className="inline-change-btn">
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Row 4: Address */}
          <div className="form-row">
            <div className="input-group">
              <label>Address</label>
              <input
                type="text"
                defaultValue="45 Admiralty Way, Lekki, Lagos"
                readOnly
              />
            </div>
          </div>

          {/* Row 5: City */}
          <div className="form-row">
            <div className="input-group size-half">
              <label>City</label>
              <input type="text" defaultValue="Lagos" readOnly />
            </div>
          </div>

          {/* Row 6: Submit Button */}
          <div className="form-action-row">
            <button type="submit" className="save-changes-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonlaProfile;
