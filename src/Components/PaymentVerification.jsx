import React, { useEffect, useState } from "react";
import "../CSS/payment-verification.css";

const PaymentVerification = () => {
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Simulating bank verification delay
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isVerifying) {
    return (
      <section className="success-page-section">
        <div className="success-card verification-loading-card">
          <div className="verification-spinner"></div>
          <h1 className="success-main-title">Verifying Payment</h1>
          <p className="success-subtitle">
            Please wait while we confirm your transaction with your bank. Do not
            refresh this page.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="success-page-section">
      <div className="success-card">
        {/* Success Icon Badge */}
        <div className="success-icon-badge">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00c853"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Status Message */}
        <h1 className="success-main-title">Deposit Successful!</h1>
        <p className="success-subtitle confirm-spacing">
          Your wallet has been funded successfully. The updated balance is now
          available in your dashboard accounts.
        </p>

        {/* Clear Action Buttons */}
        <div className="success-actions-row single-layout">
          <button
            className="primary-action-btn"
            onClick={() => (window.location.href = "/wallet")}
          >
            Go to Wallet Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentVerification;
