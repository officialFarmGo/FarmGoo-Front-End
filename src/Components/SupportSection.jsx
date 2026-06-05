import React from "react";
import "../CSS/SupportSection.css";
import { FiMail, FiPhone } from "react-icons/fi";

const SupportSection = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:support@farmgoo.ng";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:0800FARMGOO";
  };

  return (
    <section className="fg-support-container">
      <div className="fg-support-inner">
        
        <h2 className="fg-support-main-title">Help & Support</h2>

        <div className="fg-support-cards-grid">
          
          {/* Email Support Card */}
          <div className="fg-support-action-card">
            <div className="fg-support-icon-circle email-bg">
              <FiMail className="fg-support-native-icon email-icon-clr" />
            </div>
            <h3 className="fg-support-card-label">Email Us</h3>
            <p className="fg-support-card-detail">support@farmgoo.ng</p>
            <button 
              type="button" 
              className="fg-support-action-trigger-btn"
              onClick={handleEmailClick}
            >
              Send Email
            </button>
          </div>

          {/* Call Support Card */}
          <div className="fg-support-action-card">
            <div className="fg-support-icon-circle phone-bg">
              <FiPhone className="fg-support-native-icon phone-icon-clr" />
            </div>
            <h3 className="fg-support-card-label">Call Us</h3>
            <p className="fg-support-card-detail">0800-FARMGOO</p>
            <button 
              type="button" 
              className="fg-support-action-trigger-btn"
              onClick={handlePhoneClick}
            >
              Call Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SupportSection;

















// import React from 'react'
// import "../CSS/SupportSection.css"
// const SupportSection = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default SupportSection
