import React, { useState } from "react";
import "../../CSS/Loginpage.css";
import { LuMoveLeft } from "react-icons/lu";
import { FaSeedling, FaTruck, FaUsers } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState("driver");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "identifier": {
        if (!value.trim()) return "Email or phone number is required.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
        if (
          !emailRegex.test(value.trim()) &&
          !phoneRegex.test(value.replace(/\s/g, ""))
        )
          return "Enter a valid email or Nigerian phone number.";
        return "";
      }
      case "password": {
        if (!value.trim()) return "Password is required.";
        if (value.trim().length < 8)
          return "Password must be at least 8 characters.";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const err = validateField(name, value);
      if (err) newErrors[name] = err;
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const freshErrors = validateAll();
    setErrors(freshErrors);

    if (Object.keys(freshErrors).length > 0) {
      const firstErrorField = document.querySelector(".fg-input-error");
      if (firstErrorField)
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    console.log("Logging in:", { ...formData, role: activeRole });
  };

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
                Access your dashboard to manage deliveries,
                <br /> track shipments, and connect with farmers <br />
                and drivers across Nigeria.
              </p>
            </div>

            <div className="fg-sidebar-footer-row">
              <span className="fg-footer-copyright">
                Powered by FarmGoo © 2026
              </span>
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
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="fg-input-group-field">
                <label className="fg-input-label-tag">Email or phone</label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email or phone number"
                  className={`fg-native-text-input ${errors.identifier ? "fg-input-error" : ""}`}
                />
                {errors.identifier && (
                  <span className="fg-field-error-msg">
                    {errors.identifier}
                  </span>
                )}
              </div>

              <div className="fg-input-group-field">
                <label className="fg-input-label-tag">Password</label>
                <div className="fg-native-input-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`fg-native-text-input fg-password-padding ${errors.password ? "fg-input-error" : ""}`}
                  />
                  <button
                    type="button"
                    className="fg-native-input-eye-trigger"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="fg-field-error-msg">{errors.password}</span>
                )}
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
