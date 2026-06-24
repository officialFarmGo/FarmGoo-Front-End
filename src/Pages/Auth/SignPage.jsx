import React, { useState } from "react";
import "../../CSS/SignPage.css";
import { LuMoveLeft } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FiXCircle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getId } from "../../LIB/AuthenticationSlice";

const SignPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const selectRole = useSelector((state) => state.auth.selectedRole);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopupError, setShowPopupError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Endpoint =
    selectRole === "farmer"
      ? "/farm/signUp"
      : selectRole === "driver"
        ? "/driver/signupDriver"
        : "/agent/signUp";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    townOrVillage: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const passwordRules = [
    {
      id: "minLength",
      label: "At least 8 characters",
      test: (p) => p.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter",
      test: (p) => /[A-Z]/.test(p),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter",
      test: (p) => /[a-z]/.test(p),
    },
    {
      id: "number",
      label: "At least one number",
      test: (p) => /[0-9]/.test(p),
    },
    {
      id: "special",
      label: "At least one special character (!@#$%^&*)",
      test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p),
    },
  ];

  const getPasswordMeta = (password) =>
    passwordRules.map((rule) => ({ ...rule, passed: rule.test(password) }));

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        if (value.trim().length < 2)
          return "First name must be at least 2 characters.";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required.";
        if (value.trim().length < 2)
          return "Last name must be at least 2 characters.";
        return "";
      case "phoneNumber": {
        const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
        if (!value.trim()) return "Phone number is required.";
        if (!phoneRegex.test(value.replace(/\s/g, "")))
          return "Enter a valid Nigerian phone number (e.g. 08012345678).";
        return "";
      }
      case "email":
        if (value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return "Enter a valid email address.";
        }
        return "";
      case "townOrVillage":
        if (!value.trim()) return "Town or village is required.";
        if (value.trim().length < 3)
          return "Please enter a valid town or village name.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (!passwordRules.every((r) => r.test(value)))
          return "Please meet all password requirements below.";
        return "";
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

  const triggerErrorPopup = (message) => {
    setErrors((prev) => ({ ...prev, form: message }));
    setShowPopupError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowPopupError(false);

    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      triggerErrorPopup(
        "Registration failed. Please review the highlighted errors on the form fields.",
      );
      const firstErrorField = document.querySelector(".fg-input-error");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BaseUrl}${Endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(getId(data.data.id));
        console.log("object data", data);
        if (selectRole === "farmer") {
          localStorage.setItem("showFundWalletModal", "true");
        }
        navigate("/otp", {
          state: {
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            role: selectRole,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        });
      } else {
        triggerErrorPopup(
          data.message ||
            "An account credential mismatch occurred. Please modify your entries.",
        );
      }
    } catch (err) {
      triggerErrorPopup(
        "Network pipeline error. Unable to link with FarmGoo registry core. Check your connectivity status.",
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordMeta = getPasswordMeta(formData.password);

  return (
    <div className="fg-login-wrapper">
      {/* SCOPED INLINE POPUP STYLES */}
      <style>{`
        .fg-error-popup-banner {
          position: fixed;
          top: 24px;
          right: 24px;
          background-color: #ffffff;
          border-left: 5px solid #ef4444;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 16px 20px;
          z-index: 10000;
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 420px;
          width: calc(100% - 48px);
          animation: fgPopupSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: sans-serif;
        }
        .fg-error-popup-icon {
          color: #ef4444;
          font-size: 24px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .fg-error-popup-body {
          flex-grow: 1;
        }
        .fg-error-popup-title {
          margin: 0 0 3px 0;
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }
        .fg-error-popup-desc {
          margin: 0;
          font-size: 13px;
          color: #4b5563;
          line-height: 1.4;
        }
        .fg-error-popup-close {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: background-color 0.15s ease;
        }
        .fg-error-popup-close:hover {
          background-color: #f3f4f6;
          color: #4b5563;
        }
        @keyframes fgPopupSlideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* FLOATING POPUP COMPONENT */}
      {showPopupError && (
        <div className="fg-error-popup-banner">
          <div className="fg-error-popup-icon">
            <FiXCircle />
          </div>
          <div className="fg-error-popup-body">
            <h4 className="fg-error-popup-title">Submission Issue</h4>
            <p className="fg-error-popup-desc">{errors.form}</p>
          </div>
          <button
            type="button"
            className="fg-error-popup-close"
            onClick={() => setShowPopupError(false)}
          >
            <FiX size={16} />
          </button>
        </div>
      )}

      <div className="fg-login-split-content">
        <aside className="fg-login-sidebar">
          <div className="fg-sidebar-overlayd">
            <div className="fg-action-row">
              <button
                className="fg-back-circle-btn"
                onClick={() => navigate("/chooseDash")}
                aria-label="Go back"
                disabled={loading}
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
            <span className="fg-footer-copyright">
              Powered by FarmGoo © 2026
            </span>
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
              <h2 className="fg-brand-welcome-title">Create your account</h2>
              <p className="fg-brand-welcome-subtitle">
                Free to join. Choose what describes you best.
              </p>
            </div>

            <div className="fg-login-form-card">
              <div className="fg-signup-role-badge-row">
                <p className="fg-signup-role-badge-text">
                  Signing up as{" "}
                  <span className="fg-signup-role-highlight">
                    {selectRole
                      ? selectRole.charAt(0).toUpperCase() + selectRole.slice(1)
                      : "N/A"}
                  </span>
                </p>
                <button
                  type="button"
                  className="fg-signup-role-change-trigger"
                  onClick={() => navigate("/chooseDash")}
                  disabled={loading}
                >
                  Change
                </button>
              </div>

              <form
                className="fg-credentials-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    First Name <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John"
                    disabled={loading}
                    className={`fg-native-text-input ${errors.firstName ? "fg-input-error" : ""}`}
                  />
                  {errors.firstName && (
                    <span className="fg-field-error-msg">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Last Name <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Doe"
                    disabled={loading}
                    className={`fg-native-text-input ${errors.lastName ? "fg-input-error" : ""}`}
                  />
                  {errors.lastName && (
                    <span className="fg-field-error-msg">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Phone number <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder="0801 234 5678"
                    className={`fg-native-text-input ${errors.phoneNumber ? "fg-input-error" : ""}`}
                  />
                  {errors.phoneNumber && (
                    <span className="fg-field-error-msg">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder="liaoreg@gmail.com"
                    className={`fg-native-text-input ${errors.email ? "fg-input-error" : ""}`}
                  />
                  {errors.email && (
                    <span className="fg-field-error-msg">{errors.email}</span>
                  )}
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Town / Village <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="townOrVillage"
                    value={formData.townOrVillage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    placeholder="e.g. Ikorodu, Lagos"
                    className={`fg-native-text-input ${errors.townOrVillage ? "fg-input-error" : ""}`}
                  />
                  {errors.townOrVillage && (
                    <span className="fg-field-error-msg">
                      {errors.townOrVillage}
                    </span>
                  )}
                </div>

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Password (8+ characters){" "}
                    <span className="fg-required-star">*</span>
                  </label>
                  <div className="fg-native-input-password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      placeholder="Create a strong password"
                      className={`fg-native-text-input fg-password-padding ${errors.password ? "fg-input-error" : ""}`}
                    />
                    <button
                      type="button"
                      className="fg-native-input-eye-trigger"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={loading}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>

                  {formData.password.length > 0 && (
                    <ul className="fg-password-checklist">
                      {passwordMeta.map((rule) => (
                        <li
                          key={rule.id}
                          className={`fg-password-rule ${rule.passed ? "fg-rule-passed" : "fg-rule-failed"}`}
                        >
                          <span className="fg-rule-icon">
                            {rule.passed ? "✓" : "✗"}
                          </span>
                          {rule.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.password && (
                    <span className="fg-field-error-msg">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="fg-form-actions-submission-block">
                  <button
                    type="submit"
                    className="fg-primary-submit-action-btn"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                  <p className="fg-form-bottom-toggle-text">
                    Already have an account?{" "}
                    <span
                      className="fg-toggle-link-span"
                      onClick={() => !loading && navigate("/login")}
                      style={{ cursor: loading ? "not-allowed" : "pointer" }}
                    >
                      Sign in
                    </span>
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