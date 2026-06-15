import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import '../CSS/ApprovedDoc.css';

const ApprovedDoc = () => {
  const navigate = useNavigate();

  return (
    <div className="fg-appr-page-wrapper">
      <div className="fg-appr-logo-box">
        <svg className="fg-appr-logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <path 
            d="M9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M3 12H9M15 12H21" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="fg-appr-card-container">
        <div className="fg-appr-check-badge">
          <FiCheck className="fg-appr-check-icon" />
        </div>

        <h1 className="fg-appr-title">You're Approved!</h1>
        
        <p className="fg-appr-text">
          Your documents have been verified. You can now start accepting transport jobs!
        </p>

        <button 
          onClick={() => navigate('/drivers/dashboard')} 
          className="fg-appr-action-btn"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ApprovedDoc;