import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineCreditCard, MdAdd } from "react-icons/md";
import Wallet from "./Wallet";
import "../CSS/WithDrawFunds.css";

const WithDrawFunds = () => {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    bankName: "",
    bankAccount: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const [linkedAccounts] = useState([
    {
      id: "1",
      bankName: "Access Bank",
      accountNumber: "0012346789",
      mask: "****6789",
      isPrimary: true,
    },
  ]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Strict validation for account number character limit
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

  const handleSelectAccount = (account) => {
    setFormData((prev) => ({
      ...prev,
      bankName: account.bankName,
      bankAccount: account.accountNumber,
    }));
    setErrors({});
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.bankName.trim()) {
      tempErrors.bankName = "Bank name is required";
    }
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

    // Snapshot current form data values before making the API request
    const previousFormDataSnapshot = { ...formData };

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
        nav(-1);
      }
    } catch (error) {
      console.error("Withdrawal submission error details:", error);

      // If payment fails, guarantee the user inputs stay exactly the same
      setFormData(previousFormDataSnapshot);

      if (error.response?.data?.message) {
        setErrors({ serverError: error.response.data.message });
      } else if (error.response?.data?.error) {
        setErrors({ serverError: error.response.data.error });
      } else {
        setErrors({
          serverError: "Network error or server unavailable. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page-wrapper">
      {/* Wallet balance wrapper remains protected */}
      <Wallet />

      <div className="withdraw-container">
        <div className="withdraw-card">
          <h2 className="withdraw-title">Withdraw Funds</h2>

          {errors.serverError && (
            <div className="error-message server-error">
              {errors.serverError}
            </div>
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
    </div>
  );
};

export default WithDrawFunds;
