import React, { useState } from "react";
import "../../CSS/Loginpage.css";
import { LuMoveLeft } from "react-icons/lu";
import { FaSeedling, FaTruck, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState("driver");
  const navigate = useNavigate();

  return (
    <div className="fg-login-wrapper">
      <div className="fg-login-split-content">
        
        <aside className="fg-login-sidebar">
          <img
            src="/src/assets/Container (2).png"
            alt="Farm background"
            className="fg-sidebar-bg"
          />
          <div className="fg-sidebar-overlay">
            <div className="fg-action-row">
              <button
                className="fg-back-circle-btn"
                onClick={() => navigate(-1)}
                aria-label="Go back"
              >
                <LuMoveLeft />
              </button>
            </div>

            <div className="fg-sidebar-core-text">
              <h1 className="fg-main-hero-heading">
                Welcome back to the harvest network.
              </h1>
              <p className="fg-main-hero-subtitle">
                Access your dashboard to manage deliveries,<br/> track shipments, and
                connect with farmers <br/>and drivers across Nigeria.
              </p>
            </div>

            <div className="fg-sidebar-footer-row">
              <span className="fg-footer-copyright">Powered by FarmGoo © 2026</span>
            </div>
          </div>
        </aside>

        <main className="fg-login-form-panel">
          <div className="fg-login-form-core-box">
            
            <div className="fg-brand-identity-header">
              <div className="fg-brand-logo-container">
                <img
                  className="fg-brand-logo-img"
                  src="/src/assets/logo.png"
                  alt="FarmGoo Logo"
                />
              </div>
              <h2 className="fg-brand-welcome-title">Welcome back</h2>
              <p className="fg-brand-welcome-subtitle">
                Log in to your FarmGoo account
              </p>
            </div>

            <div className="fg-role-selection-grid">
              <div
                className={`fg-role-option-card ${activeRole === "farmer" ? "is-active" : ""}`}
                onClick={() => setActiveRole("farmer")}
              >
                <div className="fg-role-circle-icon">
                  <FaSeedling />
                </div>
                <span className="fg-role-card-title">Farmer</span>
              </div>

              <div
                className={`fg-role-option-card ${activeRole === "driver" ? "is-active" : ""}`}
                onClick={() => setActiveRole("driver")}
              >
                <div className="fg-role-circle-icon">
                  <FaTruck />
                </div>
                <span className="fg-role-card-title">Driver</span>
                <span className="fg-role-card-desc">Truck driver</span>
              </div>

              <div
                className={`fg-role-option-card ${activeRole === "agent" ? "is-active" : ""}`}
                onClick={() => setActiveRole("agent")}
              >
                <div className="fg-role-circle-icon">
                  <FaUsers />
                </div>
                <span className="fg-role-card-title">Agent</span>
                <span className="fg-role-card-desc">Agent community</span>
              </div>
            </div>

            <form
              className="fg-credentials-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="fg-input-group-field">
                <label className="fg-input-label-tag">Email or phone</label>
                <input
                  type="text"
                  className="fg-native-text-input"
                  placeholder="Enter your email or phone number"
                />
              </div>

              <div className="fg-input-group-field">
                <label className="fg-input-label-tag">Password</label>
                <input
                  type="password"
                  className="fg-native-text-input"
                  placeholder="Enter your password"
                />
              </div>

              <div className="fg-form-options-alignment-row">
                <label className="fg-checkbox-interactive-label">
                  <input type="checkbox" className="fg-checkbox-element" />
                  <span className="fg-checkbox-custom-text">Remember me</span>
                </label>
                <button
                  type="button"
                  className="fg-forgot-trigger-btn"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="fg-form-actions-submission-block">
                <button type="submit" className="fg-primary-submit-action-btn">
                  Log in
                </button>
                <p className="fg-alternative-routing-text">
                  Don't have an account?
                  <button
                    type="button"
                    className="fg-inline-routing-trigger"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>

          </div>
        </main>

      </div>
    </div>
  );
};

export default LoginPage;