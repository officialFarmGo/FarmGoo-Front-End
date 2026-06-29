import React from "react";
import "../CSS/DriversProfile.css";

const DriversProfile = ({ profileData }) => {
  if (!profileData) {
    return (
      <div className="drivers-profile-container">
        <div className="profile-header-text">
          <h2>Profile & Settings</h2>
          <p>Manage your account information and security settings</p>
        </div>
        <div className="profile-card">
          <div className="avatar-wrapper">
            <div className="avatar-circle">
              <span>--</span>
            </div>
          </div>
          <div className="profile-details">
            <p style={{ color: "#94a3b8" }}>No profile data available</p>
          </div>
        </div>
      </div>
    );
  }

  const initials = `${(profileData.firstName?.[0] || "").toUpperCase()}${(profileData.lastName?.[0] || "").toUpperCase()}`;
  const profilePicture = profileData.profilePicture?.securedUrl;

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
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span>{initials || "U"}</span>
            )}
          </div>
        </div>

        {/* Right Side: Driver Metrics & Information */}
        <div className="profile-details">
          {/* Driver Name & Verified Emblem */}
          <div className="name-row">
            <h3>
              {profileData.firstName} {profileData.lastName}
            </h3>
            {profileData.kycVerified && (
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
            )}
          </div>

          {/* Contact Details Meta Strip */}
          <div className="contact-info-strip">
            {profileData.email && (
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
                <span>{profileData.email}</span>
              </div>
            )}

            {profileData.phoneNumber && (
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
                <span>{profileData.phoneNumber}</span>
              </div>
            )}

            {profileData.townOrVillage && (
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
                <span>{profileData.townOrVillage}, Nigeria</span>
              </div>
            )}
          </div>

          {/* Stats Summary Footing Section */}
          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-label">Role</span>
              <div className="stat-value bold-dark" style={{ textTransform: "capitalize" }}>
                {profileData.role || "N/A"}
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-label">Status</span>
              <div className="stat-value" style={{ color: profileData.isAvailable ? "#00b050" : "#94a3b8" }}>
                {profileData.isAvailable ? "Available" : "Unavailable"}
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-label">Member Since</span>
              <div className="stat-value bold-dark">
                {profileData.createdAt
                  ? new Date(profileData.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversProfile;