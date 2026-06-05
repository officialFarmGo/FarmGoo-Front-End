import React from 'react';
import { FiShield } from 'react-icons/fi';
import '../CSS/PaymentTrust.css';

const PaymentTrust = () => {
  return (
    <section className="payment-trust-wrapper">
      <div className="payment-trust-container">
        
        <div className="payment-info-side">
          <span className="badge green-badge">PAYMENTS & TRUST</span>
          <h1>
            Your money is safe <br />
            until delivery is <span className="green-accent">confirmed.</span>
          </h1>
          <p className="payment-description">
            We use an escrow-style settlement — the only way to eliminate the fear 
            on both sides of a transaction. Farmers fear drivers disappearing. 
            Drivers fear non-payment. We solve both.
          </p>

          <div className="payment-rates-row">
            <div className="rate-item">
              <div className="rate-value">3–5%</div>
              <div className="rate-label">Platform commission per trip</div>
            </div>
            <div className="rate-item">
              <div className="rate-value">₦500–₦1k</div>
              <div className="rate-label">Agent service fee per booking</div>
            </div>
          </div>
        </div>

        <div className="payment-visual-side">
          <div className="image-frame">
            <img 
              src="/src/assets/enscrow.png" 
              alt="Nigerian farmers confirming transaction on smartphone" 
              className="showcase-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PaymentTrust;