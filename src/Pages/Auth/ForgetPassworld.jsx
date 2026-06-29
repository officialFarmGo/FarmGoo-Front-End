import { useEffect, useState } from "react";
import { Flex, Input, Typography, Button } from "antd";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import firstimg001 from "../../assets/firstimg001.png";
import "../../CSS/VerificationOtp.css";
import { useNavigate, useLocation } from "react-router-dom";
import { authActionSuccess, getId } from "../../LIB/AuthenticationSlice";

const { Text } = Typography;

const ForgetPassworld = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("otp"); // "otp" | "password" | "success"
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const userEmail = location.state?.email || "your registered email address";
  const selectRole = location.state?.role || "farmer";

  const BaseUrl = import.meta.env.VITE_BaseUrl;

  // ── Endpoints ──

  // 1. OTP verification endpoint
  const VerifyOtpEndpoint =
    selectRole === "farmer"
      ? "/farm/verify"
      : selectRole === "driver"
        ? "/driver/verifyEmail"
        : "/agent/verify";

  // 2. Password reset endpoint (used in handleResetPassword)
  const RestPasswordEndpoint =
    selectRole === "farmer"
      ? "/farm/reset-Password"
      : selectRole === "driver"
        ? "/driver/reset-Password"
        : "/agent/reset-Password";

  // 3. Resend / forget-Password endpoint (used in handleResendCode)
  const ResetEndpoint =
    selectRole === "farmer"
      ? "/farm/forget-Password"
      : selectRole === "driver"
        ? "/driver/forget-Password"
        : "/agent/forget-Password";

  // ── Step 1: Verify OTP ──
  const verifyOtpRequest = async (code) => {
    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}${VerifyOtpEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: location.state?.email, otp: code }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage("");
        setStep("password");
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

  // ── Step 2: Reset password with OTP ──
  const handleResetPassword = async (e) => {
    e?.preventDefault();

    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${BaseUrl}${RestPasswordEndpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: location.state?.email,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const resolvedToken =
          data.token || data.data?.token || data.accessToken || null;
        const resolvedUser = data.user || data.data?.user || data.data || null;

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

        setStep("success");
      } else {
        setErrorMessage(
          data.message || "Failed to reset password. Please try again.",
        );
      }
    } catch (err) {
      setErrorMessage("Network error, please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── OTP Input Handler ──
  const onChangeOtp = (text) => {
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

  const handleOtpSubmit = (e) => {
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

  // ── Navigate to dashboard after success ──
  useEffect(() => {
    if (step === "success") {
      const dashboardRoutes = {
        farmer: "/farmer/dashboard",
        driver: "/drivers/dashboard",
        agent: "/agent/dashboard",
      };
      const timer = setTimeout(() => {
        navigate(dashboardRoutes[selectRole] || "/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, selectRole, navigate]);

  // ── Resend cooldown timer ──
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

  // ── Resend OTP Code ──
  const handleResendCode = async () => {
    if (resendCooldown > 0 || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${BaseUrl}${ResetEndpoint}`, {
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
      {/* Confirmation Modal */}
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

      {/* Success Modal - Auto redirect to dashboard */}
      {step === "success" && (
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
              Password Reset Successful!
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
              Your password has been reset successfully. Redirecting to your
              dashboard...
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
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

      {/* Form Section */}
      <div className="fg-otp-form-side">
        <div className="fg-otp-form-wrapper">
          {step === "otp" && (
            <>
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
                    onChange={onChangeOtp}
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
                          resendCooldown > 0 || loading
                            ? "not-allowed"
                            : "pointer",
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
                    onClick={handleOtpSubmit}
                  >
                    Verify Code
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
            </>
          )}

          {step === "password" && (
            <>
              <div className="fg-otp-title-block">
                <h2 className="fg-otp-main-heading">Reset your password</h2>
                <p className="fg-otp-sub-heading">
                  Enter your new password for
                  <br />
                  <strong className="fg-otp-phone-highlight">{userEmail}</strong>
                </p>
              </div>

              <div className="fg-otp-card-box">
                <Flex gap="large" vertical align="center" style={{ width: "100%" }}>
                  <Text className="fg-otp-inner-label">
                    Choose a new password
                  </Text>

                  {/* New Password */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrorMessage("");
                      }}
                      disabled={loading}
                      size="large"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 14px",
                        borderRadius: "8px",
                        border: errorMessage ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                      }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#8c8c8c",
                      }}
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </span>
                  </div>

                  {/* Confirm Password */}
                  <div style={{ position: "relative", width: "100%" }}>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrorMessage("");
                      }}
                      disabled={loading}
                      size="large"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 14px",
                        borderRadius: "8px",
                        border: errorMessage ? "1px solid #ff4d4f" : "1px solid #d9d9d9",
                      }}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#8c8c8c",
                      }}
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </span>
                  </div>

                  {errorMessage && (
                    <span
                      className="fg-otp-error-msg"
                      style={{ color: "#ff4d4f", fontSize: "14px" }}
                    >
                      {errorMessage}
                    </span>
                  )}

                  <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    className="fg-otp-cta-submit-btn"
                    onClick={handleResetPassword}
                    style={{ width: "100%" }}
                  >
                    Reset Password
                  </Button>

                  <Text className="fg-otp-meta-link-text">
                    Changed your mind?{" "}
                    <span
                      className="fg-otp-action-link"
                      onClick={() => {
                        if (!loading) {
                          setStep("otp");
                          setErrorMessage("");
                        }
                      }}
                    >
                      Back to OTP
                    </span>
                  </Text>
                </Flex>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassworld;