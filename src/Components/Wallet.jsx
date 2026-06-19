import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../CSS/Wallet.css";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const nav = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    availableBalance: 0,
    escrowBalance: 0,
    linkedAccounts: [],
    transactions: [],
  });
  const [isVisible, setIsVisible] = useState(true);

  const getAllDeliveries = async () => {
    const BASE_URL = import.meta.env.VITE_BaseUrl;
    const token = localStorage.getItem("token");

    // Snapshot current state data to fall back on if the network request fails
    const backupDashboardData = { ...dashboardData };

    try {
      const response = await axios.get(
        `${BASE_URL}/agentDashboard/agentWallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data && response.data.data) {
        setDashboardData(response.data.data);
      } else if (response.data?.balance !== undefined) {
        // Alternative mapping if balance is at the root layer
        setDashboardData(prev => ({
          ...prev,
          availableBalance: response.data.balance
        }));
      }
    } catch (error) {
      console.error("Error fetching delivery dashboard data:", error);
      // Guarantee the layout balance values do not reset or drop to 0 unexpectedly
      setDashboardData(backupDashboardData);
    }
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  const formatCurrency = (value) => {
    return `₦${Number(value).toLocaleString()}`;
  };

  return (
    <section className="wallet-section">
      <div className="wallet-container">
        <h1 className="wallet-page-title">Wallet</h1>

        <div className="balance-card">
          <div className="balance-header">
            <div className="balance-label-group">
              <svg
                className="wallet-icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v2" />
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z" />
              </svg>
              <span className="balance-label">Available Balance</span>
            </div>

            <button
              className="toggle-visibility-btn"
              aria-label="Toggle balance visibility"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <AiOutlineEye className="eye-icon-svg" size={24} />
              ) : (
                <AiOutlineEyeInvisible className="eye-icon-svg" size={24} />
              )}
            </button>
          </div>

          <div className="balance-amount-display">
            {isVisible
              ? formatCurrency(dashboardData.availableBalance)
              : "******"}
          </div>

          <div className="balance-action-row">
            <button
              className="action-card-btn withdraw-btn"
              onClick={() => nav("/agent/dashboard/withDrawFunds")}
            >
              <span className="action-arrow">↗</span> Withdraw
            </button>
            <button
              className="action-card-btn add-money-btn"
              onClick={() => nav("/agent/dashboard/FundWellet")}
            >
              <span className="action-plus">+</span> Add Money
            </button>
          </div>
        </div>

        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Linked Accounts</h3>
            <button className="panel-header-action-btn">+ Add Account</button>
          </div>

          {dashboardData.linkedAccounts.length === 0 ? (
            <div className="empty-state-message">No linked accounts found</div>
          ) : (
            dashboardData.linkedAccounts.map((account, index) => (
              <div
                key={account.id || account._id || index}
                className="linked-account-row-item"
              >
                <div className="bank-meta-group">
                  <div className="bank-card-icon-box">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <div className="bank-name-stack">
                    <span className="bank-title-text">{account.bankName}</span>
                    <span className="bank-number-obscured">
                      ****{account.accountNumber?.slice(-4) || "0000"}
                    </span>
                  </div>
                </div>
                {account.isPrimary && (
                  <span className="badge-primary">Primary</span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Transaction History</h3>
          </div>

          <div className="transaction-list-stack">
            {dashboardData.transactions.length === 0 ? (
              <div className="empty-state-message">
                No transactions recorded yet
              </div>
            ) : (
              dashboardData.transactions.map((trn, index) => {
                const isCredit = trn.type?.toLowerCase() === "credit";
                return (
                  <div
                    key={trn.id || trn._id || index}
                    className="transaction-list-row-item"
                  >
                    <div className="trn-meta-group">
                      <div
                        className={`trn-badge ${isCredit ? "trn-credit" : "trn-debit"}`}
                      >
                        <span className="trn-arrow-symbol">
                          {isCredit ? "↓" : "↑"}
                        </span>
                      </div>
                      <div className="trn-text-stack">
                        <span className="trn-title">
                          {trn.title || trn.description}
                        </span>
                        <span className="trn-date">
                          {trn.date || trn.createdAt}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`trn-amount ${isCredit ? "trn-credit-amount" : "trn-debit-amount"}`}
                    >
                      {isCredit ? "+" : "-"}
                      {formatCurrency(trn.amount)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wallet;