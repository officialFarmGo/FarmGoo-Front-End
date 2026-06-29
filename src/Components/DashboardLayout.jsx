import React, { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import brandLogo from "../assets/Container (3).png";
import "../CSS/DashboardLayout.css";
import {
  BellOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
// Import your explicit slice reset action
import { activeMenuItem, authActionSuccess } from "../LIB/AuthenticationSlice";

const DashboardLayout = (props) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ActiveMenu, setActiveMenu] = useState(0);

  // Modal toggle state for logout safety check
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeMenuIndex = useSelector((state) => state.auth.activeMenuItem);

  useEffect(() => {
    const normalize = (value = "") => value.trim().toLowerCase();
    const currentSegment = normalize(
      location.pathname.split("/").filter(Boolean).pop() || "dashboard",
    );

    const matchedIndex = props.desktopMenuItems.findIndex((item) => {
      const itemPath = normalize(item.path);

      if (!itemPath) {
        return currentSegment === "dashboard" || currentSegment === "";
      }

      return currentSegment === itemPath || currentSegment.includes(itemPath);
    });

    if (matchedIndex >= 0) {
      setActiveMenu(matchedIndex);
      dispatch(activeMenuItem(matchedIndex));
    }
  }, [location.pathname, props.desktopMenuItems, dispatch]);

  // Helper to grab current route title for mobile header
  const getCurrentRouteTitle = () => {
    const currentItem =
      props.mobileMenuItems.find((item) => item.path === location.pathname) ||
      props.desktopMenuItems.find((item) => item.path === location.pathname);
    return currentItem ? currentItem.label : "Dashboard";
  };

  // Secure and Complete Session Termination Flow
  const handleSystemLogout = () => {
    // Clear Redux Store state variables to break PrivateRoute authentication conditionals
    dispatch(
      authActionSuccess({
        user: null,
        token: null,
      }),
    );

    // Reset side-navigation highlighted focus tracking back to index zero
    dispatch(activeMenuItem(0));

    // 3. Clear modal state windows
    setShowLogoutModal(false);
    setIsMobileMenuOpen(false);

    // 4. Force browser redirection to public landing screen and replace history tree stack
    navigate("/login", { replace: true });
  };

  return (
    <div className="fg-dashboard-container">
      {/* GLOBAL LOGOUT VERIFICATION MODAL POPUP */}
      {showLogoutModal && (
        <div
          className="fg-global-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="fg-error-modal-card"
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "380px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <QuestionCircleOutlined
              style={{
                color: "#3b82f6",
                fontSize: "44px",
                marginBottom: "16px",
              }}
            />
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "19px",
                color: "#111827",
                fontFamily: "sans-serif",
                fontWeight: "600",
              }}
            >
              Confirm Sign Out
            </h3>
            <p
              style={{
                margin: "0 0 24px 0",
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "sans-serif",
              }}
            >
              Are you sure you want to end your active session and log out of
              your dashboard?
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  flex: 1,
                  fontFamily: "sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSystemLogout}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  flex: 1,
                  fontFamily: "sans-serif",
                }}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE TOP NAVIGATION BAR */}
      <header className="fg-mobile-top-navbar">
        <button
          className="fg-mobile-menu-trigger"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <MenuOutlined style={{ fontSize: "22px", color: "#ffffff" }} />
        </button>

        <span className="fg-mobile-header-title">{getCurrentRouteTitle()}</span>

        <div className="fg-mobile-notification-box">
          <BellOutlined
            style={{ fontSize: "22px", color: "#ffffff" }}
            onClick={() => navigate("notification")}
          />
          <span className="fg-mobile-notif-badge"></span>
        </div>
      </header>

      {/* SIDEBAR (Desktop Side Navigation & Mobile Slide-Out Drawer) */}
      <aside
        className={`fg-dashboard-sidebar ${isMobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div className="fg-sidebar-top-group">
          <div className="fg-sidebar-brand-section">
            <img src={brandLogo} alt="FarmGoo" className="fg-sidebar-logo" />
            <div className="fg-sidebar-brand-text">
              <h1 className="fg-brand-name">FarmGoo</h1>
              <p className="fg-brand-portal">
                {props.rows.charAt(0).toUpperCase() + props.rows.slice(1)}{" "}
                Logistics
              </p>
            </div>
            <button
              className="fg-sidebar-close-trigger"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <CloseOutlined style={{ fontSize: "20px", color: "#111827" }} />
            </button>
          </div>

          <nav className="fg-sidebar-nav">
            {props.desktopMenuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`fg-nav-item ${activeMenuIndex === index ? "active" : ""}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveMenu(index);
                  dispatch(activeMenuItem(index));
                }}
              >
                <span className="fg-nav-icon">{item.icon}</span>
                <span className="fg-nav-label">{item.label}</span>
              </Link>
            ))}
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

          {/* Trigger Logout Safety Confirmation Window */}
          <button
            className="fg-logout-btn"
            onClick={() => setShowLogoutModal(true)}
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
              <div className="fg-mobile-icon-wrapper">{item.icon}</div>
              <span className="fg-mobile-tab-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardLayout;
