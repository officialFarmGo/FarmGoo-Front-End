import React from 'react';
import { FiLock, FiDollarSign, FiCloudLightning, FiPhoneCall, FiUsers } from 'react-icons/fi';
import '../CSS/PlatformFeatures.css';

const PlatformFeatures = () => {
  return (
    <section className="features-full-wrapper">
      <div className="features-inner-container">
        
        <div className="features-main-header">
          <span className="badge amber-badge">PLATFORM FEATURES</span>
          <h1>
            Everything you need. <br />
            <span className="accent-color-text">Nothing you don't.</span>
          </h1>
        </div>

        <div className="escrow-banner-card">
          <div className="banner-icon-box">
            <FiLock size={24} color="var(--primary-yellow)" />
          </div>
          <h2>Escrow payment protection</h2>
          <p>
            Funds are held securely by the platform until the farmer confirms delivery with their unique PIN. 
            No more payment disputes — trust is built into the system, protecting both farmer and driver on every transaction.
          </p>
        </div>

        <div className="features-secondary-grid">
          <div className="feature-square-card">
            <div className="square-icon-box">
              <FiDollarSign size={20} color="var(--primary-yellow)" />
            </div>
            <h3>Transparent Pricing</h3>
            <p>Clear pricing with no hidden fees. 3-5% platform fee, ₦500-₦1k agent commission.</p>
          </div>

          <div className="feature-square-card">
            <div className="square-icon-box">
              <FiCloudLightning size={20} color="var(--lighter-green)" />
            </div>
            <h3>Weather alerts</h3>
            <p>Automated alerts before pickup — so you never load perishables into a rain-delayed truck.</p>
          </div>

          <div className="feature-square-card">
            <div className="square-icon-box">
              <FiPhoneCall size={20} color="var(--primary-yellow)" />
            </div>
            <h3>Click-to-call coordination</h3>
            <p>Farmers and drivers reach each other instantly with a single tap — no number-sharing, no friction.</p>
          </div>

          <div className="feature-square-card">
            <div className="square-icon-box">
              <FiUsers size={20} color="var(--lighter-green)" />
            </div>
            <h3>Agent-assisted bookings</h3>
            <p>Rural farmers without smartphones participate through verified local agents — no one is excluded.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PlatformFeatures;