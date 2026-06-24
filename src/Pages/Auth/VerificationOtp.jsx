import { useEffect, useState } from "react";
import { Flex, Input, Typography, Button } from "antd";
import { FiArrowLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import firstimg001 from "../../assets/firstimg001.png";
import "../../CSS/VerificationOtp.css";
import { useNavigate, useLocation } from "react-router-dom";
import { authActionSuccess, getId } from "../../LIB/AuthenticationSlice";

const { Text } = Typography;

const VerificationOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const userEmail = location.state?.email || "your registered email address";
  const selectRole = location.state?.role || "farmer";

  const BaseUrl = import.meta.env.VITE_BaseUrl;
  const Endpoint =
    selectRole === "farmer"
      ? "/farm/verify"
      : selectRole === "driver"
        ? "/driver/verifyEmail"
        : "/agent/verify";
  const RestEndpoint =
    selectRole === "farmer"
      ? "/farm/resendOtp"
      : selectRole === "driver"
        ? "/driver/resendOtp"
        : "/agent/resendOtp";

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
        const resolvedToken =
          data.token || data.data?.token || data.accessToken || null;
        const resolvedUser = data.user || data.data?.user || data.data || null;

        if (resolvedToken) {
          localStorage.setItem("token", resolvedToken);
        }

        dispatch(
          authActionSuccess({
            user: {
              ...(resolvedUser || {}),
              role: selectRole,
              email: location.state?.email,
              firstName: location.state?.firstName,
              lastName: location.state?.lastName,
            },
            token: resolvedToken,
          }),
        );

        setErrorMessage("");
        navigate("/success", {
          state: {
            ...location.state,
            token: resolvedToken,
            user: resolvedUser,
          },
        });
      } else {
        setErrorMessage(
          data.message || "Invalid verification code. Please try again.",
        );
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

  useEffect(() => {
    if (resendCooldown <= 0) return undefined;

    const interval = setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);

  const formatCooldown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}${RestEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: location.state?.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setConfirmationMessage(
          data.message || "Verification code resent successfully.",
        );
        setResendCooldown(600);
      } else {
        setErrorMessage(
          data.message ||
            "Failed to resend verification code. Please try again.",
        );
      }
    } catch (err) {
      console.error("OTP resend failed:", err);
      setErrorMessage("Network error, please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fg-otp-container">
      {confirmationMessage && (
        <div
          className="fg-global-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="fg-error-modal-card"
            style={{
              backgroundColor: "#ffffff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <FaCheckCircle
              style={{
                color: "#10b981",
                fontSize: "48px",
                marginBottom: "16px",
              }}
            />
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "20px",
                color: "#111827",
                fontFamily: "sans-serif",
              }}
            >
              Verification Alert
            </h3>
            <p
              style={{
                margin: "0 0 20px 0",
                color: "#4b5563",
                fontSize: "14px",
                lineHeight: "1.5",
                fontFamily: "sans-serif",
              }}
            >
              {confirmationMessage}
            </p>
            <button
              onClick={() => setConfirmationMessage(null)}
              style={{
                backgroundColor: "#111827",
                color: "#ffffff",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                width: "100%",
                fontFamily: "sans-serif",
              }}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
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
              <strong className="fg-otp-phone-highlight">{userEmail}</strong>
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
                  className={`fg-otp-action-link ${resendCooldown > 0 || loading ? "disabled" : ""}`}
                  onClick={handleResendCode}
                  style={{
                    cursor:
                      resendCooldown > 0 || loading ? "not-allowed" : "pointer",
                    opacity: resendCooldown > 0 || loading ? 0.5 : 1,
                  }}
                >
                  {resendCooldown > 0
                    ? `Resend available in ${formatCooldown(resendCooldown)}`
                    : "Resend code"}
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