import React, { useState } from "react";
import "../../CSS/ForgetPassword.css";
import { LuMoveLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [activeRole, setActiveRole] = useState("driver");
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (value) => {
    if (!value.trim()) return "Email or phone number is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
    if (!emailRegex.test(value.trim()) && !phoneRegex.test(value.replace(/\s/g, ""))) {
      return "Enter a valid email or Nigerian phone number.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    const validationError = validateField(identifier);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const endpoint =
      activeRole === "farmer"
        ? "/farm/forget-Password"
        : activeRole === "driver"
        ? "/driver/forget-Password"
        : "/agent/forget-Password";

    const cleanIdentifier = identifier.includes("@")
      ? identifier.trim()
      : identifier.replace(/\s/g, "");

    try {
      const response = await fetch(`${BaseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: cleanIdentifier }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Reset instructions sent successfully!");
        setIdentifier("");
      } else {
        setError(data.message || "Failed to send reset instructions. Check your credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="forget-password-container">
      <section className="forget-password-content">
        
        <div className="forget-brand-logo-holder">
          <img 
            className="forget-brand-logo" 
            src="/src/assets/logo.png" 
            alt="FarmGoo Logo" 
          />
        </div>

        <header className="forget-header-zone">
          <h2 className="forget-main-heading">Forgot your password?</h2>
          <p className="forget-sub-heading">Select your profile role and enter your details to recover your account.</p>
        </header>

        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => !loading && setActiveRole("farmer")}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: activeRole === "farmer" ? "none" : "1px solid #d9d9d9",
              backgroundColor: activeRole === "farmer" ? "#042920" : "#ffffff",
              color: activeRole === "farmer" ? "#ffffff" : "#333333",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Farmer
          </button>
          <button
            type="button"
            onClick={() => !loading && setActiveRole("driver")}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: activeRole === "driver" ? "none" : "1px solid #d9d9d9",
              backgroundColor: activeRole === "driver" ? "#042920" : "#ffffff",
              color: activeRole === "driver" ? "#ffffff" : "#333333",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Driver
          </button>
          <button
            type="button"
            onClick={() => !loading && setActiveRole("agent")}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              border: activeRole === "agent" ? "none" : "1px solid #d9d9d9",
              backgroundColor: activeRole === "agent" ? "#042920" : "#ffffff",
              color: activeRole === "agent" ? "#ffffff" : "#333333",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Agent
          </button>
        </div>

        <form className="forget-card-box" onSubmit={handleSubmit} noValidate>
          {error && <div className="fg-field-error-msg" style={{ marginBottom: "16px", textAlign: "center", color: "#ff4d4f" }}>{error}</div>}
          {successMessage && <div style={{ marginBottom: "16px", textAlign: "center", color: "#2e7d32", fontSize: "14px" }}>{successMessage}</div>}

          <div className="forget-input-group">
            <label className="forget-input-label">Email or Phone Number</label>
            <input 
              type="text" 
              placeholder="Enter your email or phone number" 
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              className={`fg-native-text-input ${error ? "fg-input-error" : ""}`}
              style={{
                width: "100%",
                padding: "12px",
                border: error ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                borderRadius: "8px",
                outline: "none"
              }}
            />
          </div>

          <button type="submit" className="forget-submit-btn" disabled={loading} style={{ width: "100%", cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="forget-divider-row">
            <span className="forget-divider-line"></span>
            <span className="forget-divider-text">Or</span>
            <span className="forget-divider-line"></span>
          </div>

          <button type="button" className="forget-back-login-btn" onClick={() => navigate("/login")} disabled={loading} style={{ width: "100%" }}>
            <LuMoveLeft className="forget-back-icon" />
            Back to Login
          </button>
        </form>

        <footer className="forget-footer-help">
          Need help? <button type="button" className="forget-support-link" disabled={loading}>Contact Support</button>
        </footer>

      </section>
    </main>
  );
};

export default ForgetPassword;