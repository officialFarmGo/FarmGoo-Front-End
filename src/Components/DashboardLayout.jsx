import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import brandLogo from "../assets/Container (3).png"; 
import "../CSS/DashboardLayout.css";
import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const DashboardLayout = (props) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const navigate = useNavigate();


  // Helper to grab current route title for mobile header
  const getCurrentRouteTitle = () => {
    const currentItem = props.mobileMenuItems.find(item => item.path === location.pathname) || 
                        props.desktopMenuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };

  return (
    <div className="fg-dashboard-container">
      
      {/* MOBILE TOP NAVIGATION BAR (Matches Screenshot 2026-06-04 014553.png) */}
      <header className="fg-mobile-top-navbar">
        <button 
          className="fg-mobile-menu-trigger" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuOutlined style={{ fontSize: "22px", color: "#ffffff" }} />
        </button>
        
        <span className="fg-mobile-header-title">{getCurrentRouteTitle()}</span>
        
        <div className="fg-mobile-notification-box">
          <BellOutlined style={{ fontSize: "22px", color: "#ffffff" }}
          onClick={() => navigate("notification")}
          />
          <span className="fg-mobile-notif-badge"></span>
        </div>
      </header>

      {/* SIDEBAR (Desktop Side Navigation & Mobile Slide-Out Drawer) */}
      <aside className={`fg-dashboard-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="fg-sidebar-top-group">
          <div className="fg-sidebar-brand-section">
            <img src={brandLogo} alt="FarmGoo" className="fg-sidebar-logo" />
            <div className="fg-sidebar-brand-text">
              <h1 className="fg-brand-name">FarmGoo</h1>
              <p className="fg-brand-portal">Farm Logistics</p>
            </div>
            {/* Close icon button visible only when sliding out on mobile (Matches Sidebar (1).png) */}
            <button 
              className="fg-sidebar-close-trigger" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CloseOutlined style={{ fontSize: "20px", color: "#111827" }} />
            </button>
          </div>

          <nav className="fg-sidebar-nav">
            {props.desktopMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`fg-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="fg-nav-icon">{item.icon}</span>
                  <span className="fg-nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="fg-sidebar-footer-section">
          <div className="fg-user-profile-tile">
            <div className="fg-profile-avatar">{props.profile}</div>
            <div className="fg-profile-meta">
              <h4 className="fg-profile-name">{props.profileName}</h4>
              <p className="fg-profile-role">{props.rows}</p>
            </div>
          </div>
          
          <button className="fg-logout-btn"
          onClick={() => navigate("/")}
          >
            <LogoutOutlined style={{ fontSize: "18px" }} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE MENU OUTSIDE OVERLAY BACKGROUND */}
      {isMobileMenuOpen && (
        <div 
          className="fg-sidebar-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="fg-dashboard-main-content">
        <div className="fg-dashboard-page-wrapper">
          <Outlet />
        </div>
      </main>

      {/* TAB BAR - MOBILE BOTTOM NAVIGATION */}
      <nav className="fg-mobile-tab-bar">
        {props.mobileMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`fg-mobile-tab-item ${isActive ? "active" : ""}`}
            >
              <div className="fg-mobile-icon-wrapper">
                {item.icon}
              </div>
              <span className="fg-mobile-tab-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default DashboardLayout;