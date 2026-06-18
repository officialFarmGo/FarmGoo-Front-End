import React, { useState } from 'react';
import { FiCreditCard, FiEye, FiArrowUpRight, FiPlus, FiArrowLeft, FiShield } from 'react-icons/fi';
import "../CSS/Wallet.css";

const Wallet = () => {
  const [activeView, setActiveView] = useState("main"); // "main", "withdraw", "fund"
  const [fundAmount, setFundAmount] = useState("0.00");

  const handleQuickAmount = (amount) => {
    setFundAmount(amount);
  };

  return (
    <section className="wallet-section">
      <div className="wallet-container">
        
        {activeView === "fund" ? (
          <div className="back-navigation-link" onClick={() => setActiveView("main")}>
            <FiArrowLeft size={16} /> <span>Back</span>
          </div>
        ) : (
          <h1 className="wallet-page-title">Wallet</h1>
        )}

        <div className="balance-card">
          <div className="balance-header">
            <div className="balance-label-group">
              <FiCreditCard className="wallet-icon-svg" size={18} />
              <span className="balance-label">
                {activeView === "fund" ? "Current Balance" : "Available Balance"}
              </span>
            </div>

            <button className="toggle-visibility-btn" aria-label="Toggle balance visibility">
              {activeView === "fund" ? (
                <FiShield size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
          
          <div className="balance-amount-display">
            ₦48,500
          </div>

          {activeView === "fund" ? (
            <div className="balance-subtext-note">Available for payments</div>
          ) : (
            <div className="balance-action-row">
              <button 
                className={`action-card-btn withdraw-btn ${activeView === "withdraw" ? 'active-toggle' : ''}`}
                onClick={() => setActiveView("withdraw")}
              >
                <FiArrowUpRight size={16} /> Withdraw
              </button>
              <button 
                className="action-card-btn add-money-btn"
                onClick={() => setActiveView("fund")}
              >
                <FiPlus size={16} /> Add Money
              </button>
            </div>
          )}
        </div>

        {activeView === "withdraw" && (
          <div className="wallet-dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-section-title">Withdraw Funds</h3>
            </div>
            
            <div className="withdraw-field-group">
              <label className="withdraw-field-label">Bank Name</label>
              <input type="text" className="withdraw-input-box plain-text-field" />
            </div>

            <div className="withdraw-field-group">
              <label className="withdraw-field-label">Bank Account</label>
              <input type="text" className="withdraw-input-box plain-text-field" />
            </div>

            <div className="withdraw-field-group">
              <label className="withdraw-field-label">Amount</label>
              <input type="text" className="withdraw-input-box plain-text-field" placeholder="Enter amount" />
            </div>

            <div className="form-action-buttons">
              <button className="withdraw-submit-btn">Withdraw</button>
              <button className="withdraw-cancel-btn" onClick={() => setActiveView("main")}>Cancel</button>
            </div>
          </div>
        )}

        {activeView === "fund" && (
          <div className="wallet-dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-section-title">Fund Your Wallet</h3>
            </div>
            <p className="panel-section-subtitle">Enter the amount you want to deposit</p>
            
            <div className="withdraw-field-group">
              <label className="withdraw-field-label">Deposit Amount</label>
              <div className="withdraw-input-wrapper">
                <span className="currency-prefix">₦</span>
                <input 
                  type="text" 
                  className="withdraw-input-box" 
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="quick-amounts-container">
              <span className="quick-amounts-label">Quick amounts:</span>
              <div className="quick-amounts-grid">
                <button type="button" className="quick-amt-chip" onClick={() => handleQuickAmount("5,000")}>₦5,000</button>
                <button type="button" className="quick-amt-chip" onClick={() => handleQuickAmount("10,000")}>₦10,000</button>
                <button type="button" className="quick-amt-chip" onClick={() => handleQuickAmount("20,000")}>₦20,000</button>
                <button type="button" className="quick-amt-chip" onClick={() => handleQuickAmount("50,000")}>₦50,000</button>
              </div>
            </div>

            <div className="withdraw-notice-banner">
              <p><strong>Note:</strong> Minimum deposit is ₦100. Deposits are instant and secure.</p>
            </div>

            <button className="continue-action-btn">
              Continue
            </button>
          </div>
        )}

        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Linked Accounts</h3>
            <button className="panel-header-action-btn">+ Add Account</button>
          </div>

          <div className="linked-account-row-item">
            <div className="bank-meta-group">
              <div className="bank-card-icon-box">
                <FiCreditCard size={20} />
              </div>
              <div className="bank-name-stack">
                <span className="bank-title-text">Access Bank</span>
                <span className="bank-number-obscured">****6789</span>
              </div>
            </div>
            <span className="badge-primary">Primary</span>
          </div>
        </div>

      </div> 
    </section>
  );
};

export default Wallet;