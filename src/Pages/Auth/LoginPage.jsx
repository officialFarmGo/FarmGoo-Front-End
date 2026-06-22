import React, { useState } from "react";
import "../../CSS/Loginpage.css";
import { LuMoveLeft } from "react-icons/lu";
import { FaSeedling, FaTruck, FaUsers } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActionSuccess } from "../../LIB/AuthenticationSlice";

const LoginPage = () => {
  const [activeRole, setActiveRole] = useState("driver");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const BaseUrl = import.meta.env.VITE_BaseUrl;

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
        if (value.trim().length < 6)
          return "Password must be at least 6 characters.";
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

  const handleSubmit = async (e) => {
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

    setLoading(true);

    const endpoint =
      activeRole === "farmer"
        ? "/farm/farmLog"
        : activeRole === "driver"
        ? "/driver/driversLogin"
        : "/agent/agentLogin";

    const cleanIdentifier = formData.identifier.includes("@")
      ? formData.identifier.trim()
      : formData.identifier.replace(/\s/g, "");

    const payload = {
      emailOrPhone: cleanIdentifier,
      password: formData.password,
    };

    try {
      const response = await fetch(`${BaseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);

        dispatch(authActionSuccess({
          user: data.user || data.driver || data.farmer || data.agent || null,
          token: data.token,
        }));

        if (activeRole === "farmer") {
          navigate("/farmer/dashboard");
        } else if (activeRole === "driver") {
          navigate("/drivers/dashboard");
        } else if (activeRole === "agent") {
          navigate("/agent/dashboard");
        }
      } else {
        setErrors((prev) => ({ ...prev, form: data.message || "Login failed. Please check your credentials." }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: "Network error. Please try again later." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fg-login-wrapper">
      <div className="fg-login-split-content">
        <aside className="fg-login-sidebar">
          <img
            src="https://res.cloudinary.com/dnjexdaop/image/upload/v1780660368/photo_11_2026-06-05_12-51-52_xutmkl.jpg"
            alt="Farm background"
            className="fg-sidebar-bg"
          />
          <div className="fg-sidebar-overlay">
            <div className="fg-action-row">
              <button
                className="fg-back-circle-btn"
                onClick={() => navigate('/')}
                aria-label="Go back"
                disabled={loading}
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
                track shipments, and connect with farmers
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
                className={`fg-role-option-card ${activeRole === "farmer" ? "is-active" : ""} ${loading ? "disabled" : ""}`}
                onClick={() => !loading && setActiveRole("farmer")}
              >
                <div className="fg-role-circle-icon">
                  <FaSeedling />
                </div>
                <span className="fg-role-card-title">Farmer</span>
              </div>

              <div
                className={`fg-role-option-card ${activeRole === "driver" ? "is-active" : ""} ${loading ? "disabled" : ""}`}
                onClick={() => !loading && setActiveRole("driver")}
              >
                <div className="fg-role-circle-icon">
                  <FaTruck />
                </div>
                <span className="fg-role-card-title">Driver</span>
                <span className="fg-role-card-desc">Truck driver</span>
              </div>

              <div
                className={`fg-role-option-card ${activeRole === "agent" ? "is-active" : ""} ${loading ? "disabled" : ""}`}
                onClick={() => !loading && setActiveRole("agent")}
              >
                <div className="fg-role-circle-icon">
                  <FaUsers />
                </div>
                <span className="fg-role-card-title">Agent</span>
                <span className="fg-role-card-desc">Agent community</span>
              </div>
            </div>

            <div className="fg-credentials-form-card">
              <form
                className="fg-credentials-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {errors.form && (
                  <div className="fg-field-error-msg" style={{ marginBottom: "16px", textAlign: "center" }}>
                    {errors.form}
                  </div>
                )}

                <div className="fg-input-group-field">
                  <label className="fg-input-label-tag">Email or phone</label>
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
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
                      disabled={loading}
                      placeholder="Enter your password"
                      className={`fg-native-text-input fg-password-padding ${errors.password ? "fg-input-error" : ""}`}
                    />
                    <button
                      type="button"
                      className="fg-native-input-eye-trigger"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="fg-field-error-msg">{errors.password}</span>
                  )}
                </div>

                <div className="fg-form-options-alignment-row">
                  <label className="fg-checkbox-interactive-label">
                    <input type="checkbox" className="fg-checkbox-element" disabled={loading} />
                    <span className="fg-checkbox-custom-text">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="fg-forgot-trigger-btn"
                    disabled={loading}
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="fg-form-actions-submission-block">
                  <button type="submit" className="fg-primary-submit-action-btn" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                  <p className="fg-alternative-routing-text">
                    Don't have an account?
                    <button
                      type="button"
                      className="fg-inline-routing-trigger"
                      disabled={loading}
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </button>
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

export default LoginPage;