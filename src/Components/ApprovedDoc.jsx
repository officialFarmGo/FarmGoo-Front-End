import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import '../CSS/ApprovedDoc.css';

const ApprovedDoc = () => {
  const navigate = useNavigate();

  return (
    <div className="fg-appr-page-wrapper">
      <div className="fg-appr-logo-box">
        <img src="https://res.cloudinary.com/dnjexdaop/image/upload/v1781838763/Container_3_uwliln.png" alt="" className="fg-appr-logo-svg"/> 
        
         
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