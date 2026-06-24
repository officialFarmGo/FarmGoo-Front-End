import React from "react";
import "../CSS/withdrawal-success.css";

const WithdrawalSuccess = () => {
  // Mock data matching the layout of your receipt screenshot
  const receiptData = {
    transactionId: "TXN-884937261549",
    amountWithdrawn: "₦15,000",
    paymentMethod: "Bank Transfer",
    previousBalance: "₦58,500",
    dateTime: "6/22/2026, 4:53:20 PM",
    newBalance: "₦43,500",
  };

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

        {/* Title Header Block */}
        <h1 className="success-main-title">Deposit Successful!</h1>
        <p className="success-subtitle">
          Your funds have been transferred successfully
        </p>

        {/* Inner Receipt Box */}
        {/* <div className="receipt-box">
          <h2 className="receipt-box-title">Transaction Receipt</h2>

          <div className="receipt-row">
            <span className="receipt-label">Transaction ID</span>
            <span className="receipt-value value-id">
              {receiptData.transactionId}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Amount Deposited</span>
            <span className="receipt-value value-bold">
              {receiptData.amountWithdrawn}
            </span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Payment Method</span>
            <span className="receipt-value">{receiptData.paymentMethod}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Previous Balance</span>
            <span className="receipt-value">{receiptData.previousBalance}</span>
          </div>

          <div className="receipt-row">
            <span className="receipt-label">Date & Time</span>
            <span className="receipt-value">{receiptData.dateTime}</span>
          </div>

          <div className="receipt-row highlight-balance-row">
            <span className="receipt-label label-dark">New Balance</span>
            <span className="receipt-value value-green">
              {receiptData.newBalance}
            </span>
          </div>
        </div> */}

        {/* Footer Action Buttons */}
        <div className="success-actions-row">
          <button
            className="primary-action-btn"
            onClick={() => (window.location.href = "wallet")}
          >
            Go to Wallet
          </button>

        </div>
      </div>
    </section>
  );
};

export default WithdrawalSuccess;
