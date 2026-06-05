import React from 'react';
import "../CSS/ForgetPassword.css";
import { LuMoveLeft } from "react-icons/lu";
import Input from "../Props/Input";

const ForgetPassword = () => {
  return (
    <main className="forget-password-container">
      <section className="forget-password-content">
        
        {/* BRAND LOGO HOLDER */}
        <div className="forget-brand-logo-holder">
          <img 
            className="forget-brand-logo" 
            src="/src/assets/logo.png" 
            alt="FarmGoo Logo" 
          />
        </div>

        {/* HEADER TEXTS */}
        <header className="forget-header-zone">
          <h2 className="forget-main-heading">Forgot your password?</h2>
          <p className="forget-sub-heading">No worries, we'll send you reset instructions</p>
        </header>

        {/* INTEGRATED FORM WHITE BOX */}
        <form className="forget-card-box" onSubmit={(e) => e.preventDefault()}>
          <div className="forget-input-group">
            <label className="forget-input-label">Email or Phone Number</label>
            <Input type="text" placeholder="Enter your email or phone number" />
          </div>

          <button type="submit" className="forget-submit-btn">
            Send Reset Link
          </button>

          {/* DECORATIVE SEPARATOR LINE */}
          <div className="forget-divider-row">
            <span className="forget-divider-line"></span>
            <span className="forget-divider-text">Or</span>
            <span className="forget-divider-line"></span>
          </div>

          {/* BACK TO LOGIN BUTTON */}
          <button type="button" className="forget-back-login-btn">
            <LuMoveLeft className="forget-back-icon" />
            Back to Login
          </button>
        </form>

        {/* FOOTER NEED HELP */}
        <footer className="forget-footer-help">
          Need help? <button type="button" className="forget-support-link">Contact Support</button>
        </footer>

      </section>
    </main>
  );
};

export default ForgetPassword;