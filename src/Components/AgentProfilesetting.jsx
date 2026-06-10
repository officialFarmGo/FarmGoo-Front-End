import React, { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "../CSS/AgentProfilesetting.css";

const AgentProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "Obi Amaka",
    email: "amaka@gmail.com",
    phoneNumber: "+234 801 234 5678",
    location: "Apapa, Lagos",
    farmSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Profile Info Data:", formData);
  };

  return (
    <div className="fg-profile-settings-view">
      <div className="fg-profile-header-stack">
        <h1 className="fg-profile-main-title">Profile Settings</h1>
        <p className="fg-profile-sub-title">Update your personal information</p>
      </div>

      <form onSubmit={handleSubmit}>
        
        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Profile Picture</h3>
          <div className="fg-avatar-upload-row">
            <div className="fg-avatar-preview-circle">
              <span>{formData.fullName.charAt(0).toUpperCase()}</span>
              <div className="fg-avatar-camera-overlay">
                <CameraOutlined />
              </div>
            </div>
            <div className="fg-upload-instructions-stack">
              <span className="fg-upload-trigger-text">Change Profile Picture</span>
              <span className="fg-upload-constraints-label">JPG, PNG or GIF. Max size 2MB</span>
            </div>
          </div>
        </div>

        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Personal Information</h3>
          <div className="fg-form-two-column-grid">
            
            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Full Name</label>
              <div className="fg-input-wrapper-inner">
                <UserOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="fullName"
                  className="fg-input-native-element"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Email Address</label>
              <div className="fg-input-wrapper-inner">
                <MailOutlined className="fg-input-field-vector-icon" />
                <input
                  type="email"
                  name="email"
                  className="fg-input-native-element"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Phone Number</label>
              <div className="fg-input-wrapper-inner">
                <PhoneOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="phoneNumber"
                  className="fg-input-native-element"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="fg-form-input-group">
              <label className="fg-form-field-label">Location</label>
              <div className="fg-input-wrapper-inner">
                <EnvironmentOutlined className="fg-input-field-vector-icon" />
                <input
                  type="text"
                  name="location"
                  className="fg-input-native-element"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

          </div>
        </div>

        <div className="fg-profile-panel-card">
          <h3 className="fg-panel-inner-heading">Farm Information</h3>
          <div className="fg-form-input-group">
            <label className="fg-form-field-label">Farm Size</label>
            <select
              name="farmSize"
              className="fg-select-native-element"
              value={formData.farmSize}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Select farm size
              </option>
              <option value="small">Small Scale (1-5 Hectares)</option>
              <option value="medium">Medium Scale (5-20 Hectares)</option>
              <option value="large">Large Scale (20+ Hectares)</option>
            </select>
          </div>
        </div>

        <div className="fg-form-actions-footer-row">
             <button type="submit" className="fg-btn-submit-save-solid">
            <SaveOutlined />
            <span>Save Changes</span>
          </button>
          <button type="button" className="fg-btn-cancel-action-outline">
            Cancel
          </button>
         
        </div>

      </form>
    </div>
  );
};

export default AgentProfileSettings;