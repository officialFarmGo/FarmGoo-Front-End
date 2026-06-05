import React from 'react';
import '../CSS/CTASection.css';

const CTASection = () => {
  return (
    <section className="cta-wrapper">
      <div className="cta-overlay-bg"></div>
      <div className="cta-container">
        
        <div className="cta-content">
          <span className="badge green-badge">GET STARTED TODAY</span>
          <h1>Ready to move your harvest faster?</h1>
          <p>
            Join thousands of farmers, drivers, and agents already using FarmGoo to 
            make Nigeria's food supply chain work better — for everyone.
          </p>
          
          <div className="cta-actions-row">
            <button className="btn-filled">Start as a farmer</button>
            <button className="btn-outlined">Drive with us</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;