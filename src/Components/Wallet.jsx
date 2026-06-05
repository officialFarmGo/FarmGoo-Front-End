import React from 'react';
import "../CSS/Wallet.css";

const Wallet = () => {
  return (
    <section className="wallet-section">
      <div className="wallet-container">
        <h1 className="wallet-page-title">Wallet</h1>

        <div className="balance-card">
          <div className="balance-header">
            <div className="balance-label-group">
              <svg className="wallet-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v2" />
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z" />
              </svg>
              <span className="balance-label">Available Balance</span>
            </div>

            <button className="toggle-visibility-btn" aria-label="Toggle balance visibility">
              <svg className="eye-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          
          <div className="balance-amount-display">
            ₦48,500
          </div>

          <div className="balance-action-row">
            <button className="action-card-btn withdraw-btn">
              <span className="action-arrow">↗</span> Withdraw
            </button>
            <button className="action-card-btn add-money-btn">
              <span className="action-plus">+</span> Add Money
            </button>
          </div>
        </div>

        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Linked Accounts</h3>
            <button className="panel-header-action-btn">+ Add Account</button>
          </div>

          <div className="linked-account-row-item">
            <div className="bank-meta-group">
              <div className="bank-card-icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className="bank-name-stack">
                <span className="bank-title-text">Access Bank</span>
                <span className="bank-number-obscured">****6789</span>
              </div>
            </div>
            <span className="badge-primary">Primary</span>
          </div>
        </div>

        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Transaction History</h3>
          </div>

          <div className="transaction-list-stack">
            
            <div className="transaction-list-row-item">
              <div className="trn-meta-group">
                <div className="trn-badge trn-credit">
                  <span className="trn-arrow-symbol">↓</span>
                </div>
                <div className="trn-text-stack">
                  <span className="trn-title">Payment for TRN-033</span>
                  <span className="trn-date">May 15, 2026</span>
                </div>
              </div>
              <span className="trn-amount trn-credit-amount">+₦22,500</span>
            </div>

            <div className="transaction-list-row-item">
              <div className="trn-meta-group">
                <div className="trn-badge trn-debit">
                  <span className="trn-arrow-symbol">↑</span>
                </div>
                <div className="trn-text-stack">
                  <span className="trn-title">Withdrawal to Access Bank</span>
                  <span className="trn-date">May 14, 2026</span>
                </div>
              </div>
              <span className="trn-amount trn-debit-amount">-₦50,000</span>
            </div>

            <div className="transaction-list-row-item">
              <div className="trn-meta-group">
                <div className="trn-badge trn-credit">
                  <span className="trn-arrow-symbol">↓</span>
                </div>
                <div className="trn-text-stack">
                  <span className="trn-title">Payment for TRN-032</span>
                  <span className="trn-date">May 13, 2026</span>
                </div>
              </div>
              <span className="trn-amount trn-credit-amount">+₦18,000</span>
            </div>

          </div>
        </div>

      </div> 
    </section>
  );
};

export default Wallet;