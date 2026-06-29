import React from "react";
import "../CSS/DriverWelcomeBanner.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";

const DriverWelcomeBanner = () => {
  const user = useSelector((state) => state.auth.user);
   const nav =useNavigate();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const firstName = user?.firstName || "Driver";

  return (
      <>

     <div className="fg-deliv-header-row">
            <h1 className="fg-deliv-main-title">DashBoard</h1>
            <div className="fg-deliv-notif-box" onClick={() => nav("notification")} style={{ cursor: "pointer" }}>
              <div className="fg-deliv-notif-dot"></div>
              <FiBell size={24} />
            </div>
          </div>
    <div className="fg-welcome-container">

      
      <div className="fg-welcome-content">
        <h1 className="fg-welcome-heading">{getGreeting()}, {firstName.toUpperCase()}! 👋</h1>
        <div className="fg-welcome-actions">
          <button className="fg-welcome-btn btn-primary" onClick={() =>nav('jobss')}>View Available Jobs</button>
          <button className="fg-welcome-btn btn-secondary" onClick={() =>nav('earnings')}>Withdraw Earnings</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default DriverWelcomeBanner;