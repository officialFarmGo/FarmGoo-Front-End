import React from "react";
import { Flex, Input, Typography, Button } from "antd";
import { FiArrowLeft } from "react-icons/fi";
import firstimg001 from "../../assets/firstimg001.png";
import "../../CSS/VerificationOtp.css";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const VerificationOtp = () => {
  const navigate = useNavigate();
  const onChange = (text) => {
    console.log("onChange:", text);
  };

  const onInput = (value) => {
    console.log("onInput:", value);
  };

  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <div className="fg-otp-container">
      
      <div className="fg-otp-hero-side" style={{ backgroundImage: `linear-gradient(rgba(4, 41, 32, 0.4), rgba(4, 41, 32, 0.75)), url(${firstimg001})` }}>
        <div>
          <Button
            type="text"
            icon={<FiArrowLeft size={24} style={{ color: "#ffffff" }} />}
            className="fg-otp-back-btn"
          />
        </div>

        <div className="fg-otp-hero-text-group">
          <h1 className="fg-otp-hero-title">
            Welcome back to the harvest network.
          </h1>
          <p className="fg-otp-hero-desc">
            Access your dashboard to manage deliveries, track shipments, and connect with farmers and drivers across Nigeria.
          </p>
        </div>

        <div className="fg-otp-footer-text">
          Powered by FarmGoo © 2026
        </div>
      </div>

      <div className="fg-otp-form-side">
        <div className="fg-otp-form-wrapper">
          
          <div className="fg-otp-title-block">
            <h2 className="fg-otp-main-heading">
              Enter verification code
            </h2>
            <p className="fg-otp-sub-heading">
              We sent a 6-digit code to <br />
              <strong className="fg-otp-phone-highlight">+234 801 234 5678</strong>
            </p>
          </div>

          <div className="fg-otp-card-box">
            <Flex gap="large" vertical align="center">
              
              <Text className="fg-otp-inner-label">
                Enter verification code
              </Text>

              <Input.OTP
                length={6}
                {...sharedProps}
                className="fg-otp-input-field-group"
                variant="outlined"
              />

              <Text className="fg-otp-meta-link-text">
                Didn't receive the code?{" "}
                <span className="fg-otp-action-link">
                  Resend code
                </span>
              </Text>

              <Button
                type="primary"
                size="large"
                className="fg-otp-cta-submit-btn"
                onClick={() => navigate("/success")}
              >
                Verify and Continue
              </Button>

              <Text className="fg-otp-meta-link-text">
                Wrong number?{" "}
                <span className="fg-otp-action-link">
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