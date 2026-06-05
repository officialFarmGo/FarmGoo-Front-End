import React, { useState } from "react";
import "../CSS/NotificationPreferences.css";
import { FiBell } from "react-icons/fi";

const NotificationPreferences = () => {
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
    <div className="fg-notify-settings-container">
      <div className="fg-notify-settings-card">
        
        <div className="fg-notify-card-header">
          <FiBell className="fg-notify-header-icon" />
          <h2 className="fg-notify-header-title">Notification Preferences</h2>
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
    </div>
  );
};

export default NotificationPreferences;