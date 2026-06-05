import React, { useState, useRef } from "react";
import "../../CSS/VerifyMain.css";

const VerifyMain = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; // Accept numbers only

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="verify-main-container">
      <div className="verify-header">
        <div className="title-area">
          <h2>Verify OTP</h2>
          <p>Enter the code sent to 07037995101</p>
        </div>
        <button className="back-link-btn" onClick={() => window.history.back()}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </button>
      </div>
      <div className="otp-card">
        <p className="instruction-text">Enter 6-digit verification code</p>

        <div className="otp-inputs-wrapper">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-digit-box"
            />
          ))}
        </div>

        <p className="resend-countdown">
          Resend code in <span>47s</span>
        </p>
        <div className="info-banner">
          <div className="vertical-accent-line"></div>
          <p className="banner-content">
            If you didn't receive the code, check your SMS or try resending
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyMain;