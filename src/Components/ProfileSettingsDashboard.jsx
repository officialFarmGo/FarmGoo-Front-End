import React, { useState } from "react";
import "../CSS/ProfileSettingsDashboard.css";
import { FiBell, FiLock, FiGlobe, FiLogOut, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfileSettingsDashboard = () => {
  const nav = useNavigate()
  const [preferences, setPreferences] = useState({
    email: true,
    sms: true,
    push: false,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fg-dashboard-stack-container">
      <div className="fg-dashboard-inner-wrapper">

        <div className="fg-dashboard-card-panel">
          <div className="fg-dashboard-card-header">
            <FiBell className="fg-dashboard-header-icon" />
            <h2 className="fg-dashboard-header-title">Notification Preferences</h2>
          </div>

          <div className="fg-notify-rows-stack">
            <div className="fg-notify-item-row">
              <div className="fg-notify-meta-text">
                <h3 className="fg-notify-item-title">Email Notifications</h3>
                <p className="fg-notify-item-desc">Receive updates via email</p>
              </div>
              <label className="fg-notify-toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.email}
                  onChange={() => handleToggle("email")}
                />
                <span className="fg-notify-toggle-slider"></span>
              </label>
            </div>

            <div className="fg-notify-item-row">
              <div className="fg-notify-meta-text">
                <h3 className="fg-notify-item-title">SMS Notifications</h3>
                <p className="fg-notify-item-desc">Receive SMS alerts</p>
              </div>
              <label className="fg-notify-toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.sms}
                  onChange={() => handleToggle("sms")}
                />
                <span className="fg-notify-toggle-slider"></span>
              </label>
            </div>

            <div className="fg-notify-item-row">
              <div className="fg-notify-meta-text">
                <h3 className="fg-notify-item-title">Push Notifications</h3>
                <p className="fg-notify-item-desc">Receive push notifications</p>
              </div>
              <label className="fg-notify-toggle-switch">
                <input
                  type="checkbox"
                  checked={preferences.push}
                  onChange={() => handleToggle("push")}
                />
                <span className="fg-notify-toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="fg-dashboard-card-panel">
          <div className="fg-dashboard-card-header">
            <FiLock className="fg-dashboard-header-icon" />
            <h2 className="fg-dashboard-header-title">Security</h2>
          </div>
          <div className="fg-dashboard-action-row-item">
            <span className="fg-dashboard-item-label">Change Password</span>
            <FiChevronRight className="fg-dashboard-arrow-icon" onClick={()=>nav ('/changepass')} />
          </div>
        </div>

        <div className="fg-dashboard-card-panel">
          <div className="fg-dashboard-card-header">
            <FiGlobe className="fg-dashboard-header-icon" />
            <h2 className="fg-dashboard-header-title">Language</h2>
          </div>
          <div className="fg-dashboard-select-field-wrapper">
            <select className="fg-dashboard-native-dropdown" defaultValue="English">
              <option value="English">English</option>
              <option value="Pigin">Pigin</option>
              <option value="Yoruba">Yoruba</option>
              <option value="Igbo">Igbo </option>
              <option value="Hausa">Hausa</option>
            </select>
            <FiChevronDown className="fg-dashboard-dropdown-arrow" />
          </div>
        </div>

        <button type="button" className="fg-dashboard-logout-action-trigger">
          <FiLogOut className="fg-dashboard-logout-icon" />
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
};

export default ProfileSettingsDashboard;