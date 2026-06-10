import React, { useState } from "react";
import { Flex, Input, Typography, Button } from "antd";
import { FiArrowLeft } from "react-icons/fi";
import firstimg001 from "../../assets/firstimg001.png";
import "../../CSS/VerificationOtp.css";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const VerificationOtp = () => {
  const navigate = useNavigate();
  const [otpValue, setOtpValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle OTP entry change
  const onChange = (text) => {
    const digitsOnly = String(text || "").replace(/\D/g, "");
    setOtpValue(digitsOnly);

    // If it's empty, update or clear errors gracefully
    if (digitsOnly.length === 0) {
      setErrorMessage("");
      return;
    }

    // Clear error message if they start filling it out but haven't hit 6 digits yet
    if (digitsOnly.length < 6) {
      setErrorMessage("");
    }

    // Auto-routes instantly when all 6 digits are typed
    if (digitsOnly.length === 6) {
      setErrorMessage("");
      navigate("/success");
    }
  };

  // Submit handler when clicking "Verify and Continue"
  const handleSubmit = (e) => {
    e?.preventDefault();

    // 1. Error if completely empty
    if (otpValue.length === 0) {
      setErrorMessage("Please enter the verification code.");
      return;
    }

    // 2. Error if numbers are entered but incomplete (less than 6)
    if (otpValue.length < 6) {
      setErrorMessage("Please enter a complete 6-digit code.");
      return;
    }

    // Route to success if check passes
    setErrorMessage("");
    navigate("/success");
  };

  return (
    <div className="fg-otp-container">
      <div
        className="fg-otp-hero-side"
        style={{
          backgroundImage: `linear-gradient(rgba(4, 41, 32, 0.4), rgba(4, 41, 32, 0.75)), url(${firstimg001})`,
        }}
      >
        <div>
          <Button
            type="text"
            icon={<FiArrowLeft size={24} style={{ color: "#ffffff" }} />}
            className="fg-otp-back-btn"
            onClick={() => navigate(-1)}
          />
        </div>

        <div className="fg-otp-hero-text-group">
          <h1 className="fg-otp-hero-title">
            Welcome back to the harvest network.
          </h1>

          <p className="fg-otp-hero-desc">
            Access your dashboard to manage deliveries, track shipments, and
            connect with farmers and drivers across Nigeria.
          </p>
        </div>

        <div className="fg-otp-footer-text">Powered by FarmGoo © 2026</div>
      </div>

      <div className="fg-otp-form-side">
        <div className="fg-otp-form-wrapper">
          <div className="fg-otp-title-block">
            <h2 className="fg-otp-main-heading">Enter verification code</h2>

            <p className="fg-otp-sub-heading">
              We sent a 6-digit code to
              <br />
              <strong className="fg-otp-phone-highlight">
                +234 801 234 5678
              </strong>
            </p>
          </div>

          <div className="fg-otp-card-box">
            <Flex gap="large" vertical align="center">
              <Text className="fg-otp-inner-label">
                Enter verification code
              </Text>

              <Input.OTP
                length={6}
                value={otpValue}
                onChange={onChange}
                inputMode="numeric"
                pattern="[0-9]*"
                formatter={(str) => String(str).replace(/\D/g, "")}
                variant="outlined"
                className={`fg-otp-input-field-group ${errorMessage ? "fg-otp-input-error" : ""}`}
              />

              {/* Conditional Error message component */}
              {errorMessage && (
                <span
                  className="fg-otp-error-msg"
                  style={{ color: "#ff4d4f", fontSize: "14px" }}
                >
                  {errorMessage}
                </span>
              )}

              <Text className="fg-otp-meta-link-text">
                Didn't receive the code?{" "}
                <span
                  className="fg-otp-action-link"
                  onClick={() => {
                    setOtpValue("");
                    setErrorMessage("");
                  }}
                >
                  Resend code
                </span>
              </Text>

              <Button
                type="primary"
                size="large"
                className="fg-otp-cta-submit-btn"
                onClick={handleSubmit}
              >
                Verify and Continue
              </Button>

              <Text className="fg-otp-meta-link-text">
                Wrong number?{" "}
                <span
                  className="fg-otp-action-link"
                  onClick={() => navigate(-1)}
                >
                  Go back
                </span>
              </Text>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationOtp;
