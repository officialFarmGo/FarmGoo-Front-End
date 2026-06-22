import React from "react";
import "../CSS/show-fund-wallet-modal.css";

const ShowFundWalletModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="fund-wallet-modal-card">
        {/* Decorative Icon */}
        <div className="wallet-icon-circle">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#006432"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="12" y1="15" x2="12.01" y2="15"></line>
            <path d="M17 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path>
          </svg>
        </div>

        {/* Content */}
        <h2>Welcome to FarmGoo! 👋</h2>
        <p>
          To start requesting transport and listing your farm produce
          seamlessly, we highly recommend setting up and funding your digital
          wallet.
        </p>

        {/* Action Buttons */}
        <div className="modal-action-stack">
          <button
            className="modal-primary-btn"
            onClick={() => {
              onClose();
              window.location.href = "/farmer/dashboard/wallet"; // Redirects to your wallet page
            }}
          >
            Fund Wallet Now
          </button>

          <button className="modal-secondary-btn" onClick={onClose}>
            I'll do this later
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowFundWalletModal;
