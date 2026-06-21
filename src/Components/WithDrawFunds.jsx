import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../CSS/WithDrawFunds.css";

const WithDrawFunds = () => {
  const nav = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    availableBalance: 0,
    escrowBalance: 0,
    linkedAccounts: [],
    transactions: [],
  });

  const [formData, setFormData] = useState({
    bankName: "",
    bankAccount: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  // Fetch true dynamic balances from the matching endpoint
  const getWalletData = async () => {
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
        setDashboardData((prev) => ({
          ...prev,
          availableBalance: response.data.balance,
        }));
      }
    } catch (error) {
      console.error("Error matching dashboard context payload details:", error);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "bankAccount" && value.length > 10) return;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.bankName.trim())
      tempErrors.bankName = "Bank name is required";
    if (!formData.bankAccount.trim()) {
      tempErrors.bankAccount = "Account number is required";
    } else if (!/^\d{10}$/.test(formData.bankAccount.trim())) {
      tempErrors.bankAccount = "Enter a valid 10-digit account number";
    }
    if (!formData.amount.trim()) {
      tempErrors.amount = "Amount is required";
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      tempErrors.amount = "Enter a valid payout amount";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        `${BASE_URL}/agentDashboard/withdraw`,
        {
          bankName: formData.bankName,
          accountNumber: formData.bankAccount,
          amount: Number(formData.amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data) {
        nav(-1); // Go back or reload fresh state parameters
      }
    } catch (error) {
      console.error("Withdrawal submission error:", error);
      setErrors({
        serverError:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return `₦${Number(value || 0).toLocaleString()}`;
  };

  return (
    <section className="withdraw-page-wrapper">
      <div className="withdraw-inner-container">
        <h1 className="withdraw-page-title">Wallet</h1>

        {/* Dynamic Connected Balance Card */}
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
              type="button"
              className="toggle-visibility-btn"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <AiOutlineEye size={20} />
              ) : (
                <AiOutlineEyeInvisible size={20} />
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
              type="button"
              className="action-card-btn withdraw-btn active"
            >
              <span className="action-arrow">↗</span> Withdraw
            </button>
            <button
              type="button"
              className="action-card-btn add-money-btn"
              onClick={() => nav("/agent/dashboard/FundWellet")}
            >
              <span className="action-plus">+</span> Add Money
            </button>
          </div>
        </div>

        {/* Transaction Panel Container Forms */}
        <div className="withdraw-card">
          <h2 className="withdraw-title">Withdraw Funds</h2>

          {errors.serverError && (
            <div className="server-error">{errors.serverError}</div>
          )}

          <form onSubmit={handleWithdrawSubmit}>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                id="bankName"
                className={`withdraw-input ${errors.bankName ? "input-error-border" : ""}`}
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="Bank Name"
              />
              {errors.bankName && (
                <span className="error-text">{errors.bankName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="bankAccount">Bank Account</label>
              <input
                type="text"
                id="bankAccount"
                className={`withdraw-input ${errors.bankAccount ? "input-error-border" : ""}`}
                value={formData.bankAccount}
                onChange={handleInputChange}
                placeholder="Bank Account"
              />
              {errors.bankAccount && (
                <span className="error-text">{errors.bankAccount}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                className={`withdraw-input ${errors.amount ? "input-error-border" : ""}`}
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
              {errors.amount && (
                <span className="error-text">{errors.amount}</span>
              )}
            </div>

            <div className="withdraw-actions">
              <button type="submit" className="btn-withdraw" disabled={loading}>
                {loading ? "Processing..." : "Withdraw"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => nav(-1)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default WithDrawFunds;
