import React, { useState } from "react";
import "../../CSS/SignPage.css";
import { LuMoveLeft } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole] = useState("Agent");
  const navigate = useNavigate();
console.log("Selected Role:", selectedRole);
  return (
    <div className="fg-login-wrapper">
      <div className="fg-login-split-content">
        
        {/* ── LEFT FIXED BRAND SIDEBAR ── */}
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

            <div className="fg-sidebar-center-content">
              <h1 className="fg-main-hero-heading">
                Welcome back to the harvest network.
              </h1>
              <p className="fg-main-hero-subtitle">
                Access your dashboard to manage deliveries, track shipments, and
                connect with farmers and drivers across Nigeria.
              </p>
              
            </div>
            <span className="fg-footer-copyright">Powered by FarmGoo © 2026</span>
          </div>
        </aside>

        {/* ── RIGHT SCROLLABLE SIGNUP WORKSPACE ── */}
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
                Sign in to your FarmGoo account
              </p>
            </div>

            {/* Structured Card Container Component */}
            <div className="fg-login-form-card">
              <div className="fg-signup-role-badge-row">
                <p className="fg-signup-role-badge-text">
                  Signing up as <span className="fg-signup-role-highlight">{selectedRole}</span>
                </p>
                <button
                  type="button"
                  className="fg-signup-role-change-trigger"
                  onClick={() => navigate("/signPage")}
                >
                  Change
                </button>
              </div>

              <form
                className="fg-credentials-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">First Name <span className="fg-required-star">*</span></label>
                  <input
                    type="text"
                    className="fg-native-text-input"
                  />
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Last Name <span className="fg-required-star">*</span></label>
                  <input
                    type="text"
                    className="fg-native-text-input"
                  />
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Phone number <span className="fg-required-star">*</span></label>
                  <input
                    type="text"
                    className="fg-native-text-input"
                    placeholder="0801 234 5678"
                  />
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Email (optional)</label>
                  <input
                    type="email"
                    className="fg-native-text-input"
                    placeholder="liaoreg@gmail.com"
                  />
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Town / Village <span className="fg-required-star">*</span></label>
                  <input
                    type="text"
                    className="fg-native-text-input"
                    placeholder="e.g. Ikorodu, Lagos"
                  />
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Password (8+ characters) <span className="fg-required-star">*</span></label>
                  <div className="fg-native-input-password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="fg-native-text-input fg-password-padding"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="fg-native-input-eye-trigger"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                </div>

                <div className="fg-form-actions-submission-block">
                  <button type="submit" className="fg-primary-submit-action-btn" onClick={() => navigate("/otp")}>
                    Create Account
                  </button>
                  
                  <p className="fg-form-bottom-toggle-text">
                    Already have an account? <span className="fg-toggle-link-span" onClick={() => navigate("/login")}>Sign in</span>
                  </p>
                </div>
              </form>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default SignPage;