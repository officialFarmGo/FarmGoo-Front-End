import React from 'react';
import { FiShield, FiUsers, FiActivity } from 'react-icons/fi';
import '../CSS/OurValues.css';

const OurValues = () => {
  return (
    <section className="values-section">
      <div className="values-header">
        <span className="badge green-badge">OUR VALUES</span>
        <h1>What drives us every day</h1>
      </div>

      <div className="values-grid">
        <div className="value-item">
          <div className="value-icon-circle">
            <FiShield size={24} color="var(--lighter-green)" />
          </div>
          <h3>Trust & Transparency</h3>
          <p>Every transaction is protected by escrow. Every price is visible. Every delivery is tracked. No hidden fees, no exploitation.</p>
        </div>

        <div className="value-item">
          <div className="value-icon-circle">
            <FiUsers size={24} color="var(--lighter-green)" />
          </div>
          <h3>Inclusive by Design</h3>
          <p>We serve farmers who don't own smartphones through our agent network. Technology should include everyone, not exclude.</p>
        </div>

        <div className="value-item">
          <div className="value-icon-circle">
            <FiActivity size={24} color="var(--lighter-green)" />
          </div>
          <h3>Speed Matters</h3>
          <p>Tomatoes don't wait. Perishables don't pause. We match farmers with drivers in hours, not days. Every minute counts.</p>
        </div>
      </div>
    </section>
  );
};

export default OurValues;