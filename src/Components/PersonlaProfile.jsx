import React, { useState } from "react";
import "../CSS/PersonlaProfile.css";

const PersonlaProfile = ({ profileData }) => {
  const [activeTab, setActiveTab] = useState("personal");

  if (!profileData) {
    return (
      <div className="personal-profile-container">
        <div className="settings-tabs">
          <button className="tab-btn active">Personal Info</button>
        </div>
        <div className="form-card">
          <p style={{ color: "#94a3b8" }}>No profile data available</p>
        </div>
      </div>
    );
  }

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
              <input
                type="text"
                defaultValue={profileData.firstName || ""}
                readOnly
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                defaultValue={profileData.lastName || ""}
                readOnly
              />
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="form-row">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                defaultValue={profileData.email || ""}
                readOnly
              />
            </div>
          </div>

          {/* Row 3: Phone Number with Action Button */}
          {/* <div className="form-row">
            <div className="input-group">
              <label>Phone Number</label>
              <div className="phone-input-wrapper">
                <input
                  type="text"
                  defaultValue={profileData.phoneNumber || ""}
                  readOnly
                />
                <button type="button" className="inline-change-btn">
                  Change
                </button>
              </div>
            </div>
          </div> */}

          {/* Row 4: Town/Village */}
          <div className="form-row">
            <div className="input-group">
              <label>Town / Village</label>
              <input
                type="text"
                defaultValue={profileData.townOrVillage || ""}
                readOnly
              />
            </div>
          </div>

          {/* Row 5: Member Since */}
          <div className="form-row">
            <div className="input-group size-half">
              <label>Member Since</label>
              <input
                type="text"
                defaultValue={
                  profileData.createdAt
                    ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""
                }
                readOnly
              />
            </div>
          </div>

          {/* Row 6: Submit Button
          <div className="form-action-row">
            <button type="submit" className="save-changes-btn">
              Save Changes
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default PersonlaProfile;