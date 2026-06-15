import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCheckCircle } from 'react-icons/fi';
import '../CSS/VerificationPending.css';

const VerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="fg-pending-page-wrapper">
      <div className="fg-pending-logo-box">
        <svg className="fg-pending-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <div className="fg-pending-card">
        <div className="fg-pending-clock-badge">
          <FiClock />
        </div>

        <h1 className="fg-pending-title">Verification Pending</h1>
        <p className="fg-pending-description">
          We're reviewing your documents. This usually takes 24-48 hours. We'll notify you once approved.
        </p>

        <div className="fg-pending-status-list">
          <div className="fg-pending-status-item">
            <FiCheckCircle className="fg-status-check-icon" />
            <span className="fg-status-item-text">Driver's License</span>
          </div>

          <div className="fg-pending-status-item">
            <FiCheckCircle className="fg-status-check-icon" />
            <span className="fg-status-item-text">Vehicle Photo</span>
          </div>

          <div className="fg-pending-status-item">
            <FiCheckCircle className="fg-status-check-icon" />
            <span className="fg-status-item-text">Vehicle Papers</span>
          </div>
        </div>

        <div className="fg-pending-action-block">
          <button 
            type="button" 
            className="fg-pending-home-btn"
            onClick={() => navigate('/approved')}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;