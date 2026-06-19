import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdArrowBack,
  MdOutlineAccountBalanceWallet,
  MdOutlineShield,
} from "react-icons/md";
import "../CSS/FundWellet.css";

const FundWellet = () => {
  const nav = useNavigate();
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const quickAmounts = [5000, 10000, 20000, 50000];

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/agentDashboard/wallet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.balance !== undefined) {
          setBalance(response.data.balance);
        } else if (response.data?.data?.balance !== undefined) {
          setBalance(response.data.data.balance);
        }
      } catch (err) {
        console.error("Error fetching wallet balance:", err);
      }
    };

    fetchWalletBalance();
  }, [BASE_URL, token]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (value === "" || /^\d+$/.test(value)) {
      setDepositAmount(value);
      setError("");
    }
  };

  const handleQuickAmountClick = (amount) => {
    setDepositAmount(amount.toString());
    setError("");
  };

  const formatInputValue = () => {
    if (!depositAmount) return "";
    return Number(depositAmount).toLocaleString();
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();

    const currentBalanceSnapshot = balance;
    const previousInputAmount = depositAmount;
    const amountNum = Number(depositAmount);

    if (!depositAmount || amountNum < 100) {
      setError("Minimum deposit is ₦100. Deposits are instant and secure.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/payment/make-Payment`,
        { amount: amountNum },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.data?.checkout_url) {
        window.location.href = response.data.data.checkout_url;
      } else if (response.data?.checkout_url) {
        window.location.href = response.data.checkout_url;
      } else {
        setBalance(currentBalanceSnapshot);
        setDepositAmount(previousInputAmount);
        setError("Payment checkout link was not generated. Please try again.");
      }
    } catch (error) {
      console.error("Deposit API error details:", error);

      setBalance(currentBalanceSnapshot);
      setDepositAmount(previousInputAmount);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError(
          "Network error or server unavailable. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawFunds = () => {
    nav("/agent/dashboard/withDrawFunds");
  };

  return (
    <div className="fund-wallet-wrapper">
      <div className="back-navigation" onClick={() => nav(-1)}>
        <MdArrowBack className="back-icon" />
        <span>Back</span>
      </div>

      <div className="balance-card-banner">
        <div className="balance-header-row">
          <div className="balance-label-wrapper">
            <MdOutlineAccountBalanceWallet className="wallet-mini-icon" />
            <span className="balance-label-text">Current Balance</span>
          </div>
          <MdOutlineShield className="shield-mini-icon" />
        </div>
        <div className="balance-amount-display">
          ₦{balance.toLocaleString()}
        </div>
        <div className="balance-footer-row">
          <span className="balance-footer-text">Available for payments</span>
        </div>
      </div>

      <div className="fund-wallet-container">
        <div className="fund-wallet-card">
          <h2 className="fund-wallet-title">Fund Your Wallet</h2>
          <p className="fund-wallet-subtitle">
            Enter the amount you want to deposit
          </p>

          <form onSubmit={handleDepositSubmit}>
            <div className="form-group">
              <label htmlFor="depositAmount">Deposit Amount</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">₦</span>
                <input
                  type="text"
                  id="depositAmount"
                  value={formatInputValue()}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={error ? "input-error-border" : ""}
                />
              </div>
              {error && <span className="error-text">{error}</span>}
            </div>

            <div className="quick-amounts-section">
              <p className="quick-amounts-label">Quick amounts:</p>
              <div className="quick-amounts-grid">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="quick-amount-btn"
                    onClick={() => handleQuickAmountClick(amount)}
                  >
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="info-note-box">
              <span className="note-text">
                <strong>Note:</strong> Minimum deposit is ₦100. Deposits are
                instant and secure.
              </span>
            </div>

            <button type="submit" className="btn-continue" disabled={loading}>
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundWellet;
