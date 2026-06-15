import React, { useState } from "react";
import { Flex, Input, Typography, Button } from "antd";
import { FiArrowLeft } from "react-icons/fi";
import firstimg001 from "../../assets/firstimg001.png";
import "../../CSS/VerificationOtp.css";
import { useNavigate, useLocation } from "react-router-dom";

const { Text } = Typography;

const VerificationOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otpValue, setOtpValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userEmail = location.state?.email || "your registered email address";
  const selectRole = location.state?.role || "farmer";

  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const Endpoint = selectRole === "farmer" ? "/farm/verify" : selectRole === "driver" ? "/driver/verifyEmail" : "/agent/verify";

  const verifyOtpRequest = async (code) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}${Endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: location.state?.email, otp: code }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setErrorMessage("");
        navigate("/success",{ state: {
          ...location.state,
          driverId: data.data?._id || data.user?._id || data._id || null,
        },
      });
      } else {
        setErrorMessage(data.message || "Invalid verification code. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Network error, please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (text) => {
    const digitsOnly = String(text || "").replace(/\D/g, "");
    setOtpValue(digitsOnly);

    if (digitsOnly.length === 0) {
      setErrorMessage("");
      return;
    }

    if (digitsOnly.length < 6) {
      setErrorMessage("");
    }

    if (digitsOnly.length === 6) {
      setErrorMessage("");
      verifyOtpRequest(digitsOnly);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (otpValue.length === 0) {
      setErrorMessage("Please enter the verification code.");
      return;
    }

    if (otpValue.length < 6) {
      setErrorMessage("Please enter a complete 6-digit code.");
      return;
    }

    setErrorMessage("");
    verifyOtpRequest(otpValue);
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
            disabled={loading}
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
                {userEmail}
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
                disabled={loading}
                className={`fg-otp-input-field-group ${errorMessage ? "fg-otp-input-error" : ""}`}
              />

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
                    if (!loading) {
                      setOtpValue("");
                      setErrorMessage("");
                    }
                  }}
                >
                  Resend code
                </span>
              </Text>

              <Button
                type="primary"
                size="large"
                loading={loading}
                className="fg-otp-cta-submit-btn"
                onClick={handleSubmit}
              >
                Verify and Continue
              </Button>

              <Text className="fg-otp-meta-link-text">
                Wrong email address?{" "}
                <span
                  className="fg-otp-action-link"
                  onClick={() => {
                    if (!loading) navigate(-1);
                  }}
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