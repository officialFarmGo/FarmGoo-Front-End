import React, { useState } from "react";
import "../../CSS/SignPage.css";
import { LuMoveLeft } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole] = useState("Agent");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    town: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ── PASSWORD RULES ──
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

  // ── FIELD-LEVEL VALIDATION ──
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

      case "phone": {
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

      case "town":
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

  // ── HANDLE CHANGE: validate live only after first submit attempt ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // ── HANDLE BLUR: validate when user leaves a field ──
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // ── FULL FORM VALIDATION ──
  const validateAll = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const err = validateField(name, value);
      if (err) newErrors[name] = err;
    });
    return newErrors;
  };

  // ── SUBMIT ──
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateAll();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = document.querySelector(".fg-input-error");
      if (firstErrorField)
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    navigate("/otp");
  };

  const passwordMeta = getPasswordMeta(formData.password);

  return (
    <div className="fg-login-wrapper">
      <div className="fg-login-split-content">
        {/* ── LEFT SIDEBAR ── */}
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
            <span className="fg-footer-copyright">
              Powered by FarmGoo © 2026
            </span>
          </div>
        </aside>

        {/* ── RIGHT FORM PANEL ── */}
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

            <div className="fg-login-form-card">
              <div className="fg-signup-role-badge-row">
                <p className="fg-signup-role-badge-text">
                  Signing up as{" "}
                  <span className="fg-signup-role-highlight">
                    {selectedRole}
                  </span>
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
                onSubmit={handleSubmit}
                noValidate
              >
                {/* First Name */}
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
                    className={`fg-native-text-input ${errors.firstName ? "fg-input-error" : ""}`}
                  />
                  {errors.firstName && (
                    <span className="fg-field-error-msg">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                {/* Last Name */}
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
                    className={`fg-native-text-input ${errors.lastName ? "fg-input-error" : ""}`}
                  />
                  {errors.lastName && (
                    <span className="fg-field-error-msg">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Phone number <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0801 234 5678"
                    className={`fg-native-text-input ${errors.phone ? "fg-input-error" : ""}`}
                  />
                  {errors.phone && (
                    <span className="fg-field-error-msg">{errors.phone}</span>
                  )}
                </div>

                {/* Email */}
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="liaoreg@gmail.com"
                    className={`fg-native-text-input ${errors.email ? "fg-input-error" : ""}`}
                  />
                  {errors.email && (
                    <span className="fg-field-error-msg">{errors.email}</span>
                  )}
                </div>

                {/* Town */}
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Town / Village <span className="fg-required-star">*</span>
                  </label>
                  <input
                    type="text"
                    name="town"
                    value={formData.town}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Ikorodu, Lagos"
                    className={`fg-native-text-input ${errors.town ? "fg-input-error" : ""}`}
                  />
                  {errors.town && (
                    <span className="fg-field-error-msg">{errors.town}</span>
                  )}
                </div>

                {/* Password */}
                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">
                    Password <span className="fg-required-star">*</span>
                  </label>
                  <div className="fg-native-input-password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>

                  {/* ── LIVE PASSWORD CHECKLIST ── */}
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
                  >
                    Create Account
                  </button>
                  <p className="fg-form-bottom-toggle-text">
                    Already have an account?{" "}
                    <span
                      className="fg-toggle-link-span"
                      onClick={() => navigate("/login")}
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
