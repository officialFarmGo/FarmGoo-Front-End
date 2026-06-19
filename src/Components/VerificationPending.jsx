import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiCheckCircle } from 'react-icons/fi';
import '../CSS/VerificationPending.css';

const VerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="fg-pending-page-wrapper">
      <div className="fg-pending-logo-box">
        <img src="https://res.cloudinary.com/dnjexdaop/image/upload/v1781838763/Container_3_uwliln.png" alt="" className="fg-pending-logo-svg" />
        
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