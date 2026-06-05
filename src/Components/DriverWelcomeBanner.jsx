import React from "react";
import "../CSS/DriverWelcomeBanner.css";

const DriverWelcomeBanner = () => {
  return (
    <div className="fg-welcome-container">
      <div className="fg-welcome-content">
        <h1 className="fg-welcome-heading">Good Morning, Adebayo! 👋</h1>
        <div className="fg-welcome-actions">
          <button className="fg-welcome-btn btn-primary">View Available Jobs</button>
          <button className="fg-welcome-btn btn-secondary">Withdraw Earnings</button>
        </div>
      </div>
    </div>
  );
};

export default DriverWelcomeBanner;