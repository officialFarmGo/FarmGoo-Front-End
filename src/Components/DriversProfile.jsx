import React from "react";
import "../CSS/DriversProfile.css";

const DriversProfile = () => {
  return (
    <div className="drivers-profile-container">
      {/* Title Header Section */}
      <div className="profile-header-text">
        <h2>Profile & Settings</h2>
        <p>Manage your account information and security settings</p>
      </div>

      {/* Profile Card Block */}
      <div className="profile-card">
        {/* Left Side: Avatar with Camera Overlay */}
        <div className="avatar-wrapper">
          <div className="avatar-circle">
            <span>AB</span>
          </div>
          <div className="camera-badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Right Side: Driver Metrics & Information */}
        <div className="profile-details">
          {/* Driver Name & Verified Emblem */}
          <div className="name-row">
            <h3>Adebayo Balogun</h3>
            <span className="verified-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00b050"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </div>

          {/* Contact Details Meta Strip */}
          <div className="contact-info-strip">
            <div className="contact-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>adebayo.balogun@email.com</span>
            </div>

            <div className="contact-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+234 803 456 7890</span>
            </div>

            <div className="contact-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Lagos, Nigeria</span>
            </div>
          </div>

          {/* Stats Summary Footing Section */}
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-label">Rating</span>
              <div className="stat-value rating-value">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#004d3d"
                  stroke="#004d3d"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>4.8</span>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-label">Completed Trips</span>
              <div className="stat-value bold-dark">47</div>
            </div>

            <div className="stat-box">
              <span className="stat-label">Member Since</span>
              <div className="stat-value bold-dark">January 2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversProfile;