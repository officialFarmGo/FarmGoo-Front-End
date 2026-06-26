import React, { useEffect, useState } from "react";
import "../CSS/Wallet.css";
import { useSelector } from "react-redux";

const Wallet = () => {
  // Grab the global auth token and user role from Redux state
  const token = useSelector((state) => state.auth.token);
  // Safely fallback to decoding token if your redux slice doesn't explicitly save the role key
  const reduxRole = useSelector(
    (state) => state.auth.user?.role || state.auth.role,
  );
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activePanel, setActivePanel] = useState(null);

  const [withdrawForm, setWithdrawForm] = useState({
    amount: "",
    bankCode: "",
    accountNumber: "",
    bankName: "",
  });
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState(null);
  const [showWithdrawSuccess, setShowWithdrawSuccess] = useState(false);
  const [withdrawSuccessMessage, setWithdrawSuccessMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const bankOptions = [
    "Access Bank",
    "Ecobank Nigeria",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Guaranty Trust Bank Plc",
    "Keystone Bank Ltd",
    "Polaris Bank",
    "Stanbic IBTC",
    "Sterling Bank",
    "Union Bank Nigeria",
    "United Bank for Africa",
    "Unity Bank",
    "WEMA Bank",
    "Zenith Bank",
  ];

  const [addAmount, setAddAmount] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addStatus, setAddStatus] = useState(null);

  // Helper function to decode user role directly from JWT payload safely
  const getUserRole = () => {
    if (reduxRole) return reduxRole.toLowerCase();
    if (!token) return "farmer";
    try {
      // Decode JWT base64 payload segment locally without extra heavy libraries
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload).role?.toLowerCase() || "farmer";
    } catch (e) {
      console.error("Failed parsing authentication context payload token:", e);
      return "farmer";
    }
  };

  const fetchWallet = async () => {
    if (!token) return;
    const role = getUserRole();

    // Dynamically alternate endpoint URL based on role matching your official verified paths
    const targetEndpoint =
      role === "agent"
        ? `${BaseUrl}/agentDashboard/agentWallet`
        : `${BaseUrl}/farmerDash/farmerWallet`;

    try {
      setLoading(true);
      const res = await fetch(targetEndpoint, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setWalletData(data.data);
      } else {
        console.error(
          "Wallet lookup error message returned from server:",
          data.message,
        );
      }
    } catch (err) {
      console.error(
        "Network interface connection failure executing wallet sync:",
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [token, reduxRole, BaseUrl]);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
    setWithdrawStatus(null);
    setAddStatus(null);
  };

  const handleCloseWithdrawSuccess = () => {
    setShowWithdrawSuccess(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleWithdraw = async () => {
    setWithdrawLoading(true);
    setWithdrawStatus(null);
    try {
      const res = await fetch(`${BaseUrl}/payment/withdraw`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(withdrawForm.amount),
          bankCode: withdrawForm.bankCode,
          accountNumber: withdrawForm.accountNumber,
          bankName: withdrawForm.bankName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Withdrawal failed");
      const successMsg = data.message || "Withdrawal initiated!";
      setWithdrawStatus({
        type: "success",
        msg: successMsg,
      });
      setWithdrawSuccessMessage(successMsg);
      setShowWithdrawSuccess(true);
      setWithdrawForm({
        amount: "",
        bankCode: "",
        accountNumber: "",
        bankName: "",
      });
    } catch (err) {
      setWithdrawStatus({ type: "error", msg: err.message });
      setErrorModalMessage(err.message);
      setShowErrorModal(true);
    } finally {
      setWithdrawLoading(false);
    }
  };

  const handleAddMoney = async () => {
    setAddLoading(true);
    setAddStatus(null);
    try {
      const res = await fetch(`${BaseUrl}/payment/make-Payment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number(addAmount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      if (data.data?.checkout_url) {
        window.location.href = data.data.checkout_url;
        return;
      }

      setAddStatus({
        type: "success",
        msg: data.message || "Payment initiated!",
      });
      setAddAmount("");
    } catch (err) {
      setAddStatus({ type: "error", msg: err.message });
      setErrorModalMessage(err.message);
      setShowErrorModal(true);
    } finally {
      setAddLoading(false);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="wallet-loading">
        <div className="wallet-spinner" />
      </div>
    );
  }

  return (
    <section className="wallet-section">
      <div className="wallet-container">
        <h1 className="wallet-page-title">
          {getUserRole() === "agent" ? "Agent Wallet" : "Farmer Wallet"}
        </h1>

        <div className="balance-card">
          <div className="balance-header">
            <div className="balance-label-group">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v2" />
                <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v-6z" />
              </svg>
              <span className="balance-label">Available Balance</span>
            </div>
            <button
              className="toggle-visibility-btn"
              onClick={() => setBalanceVisible((v) => !v)}
            >
              {balanceVisible ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <div className="balance-amount-display">
            {balanceVisible
              ? `₦${Number(walletData?.availableBalance ?? 0).toLocaleString()}`
              : "₦ ••••••"}
          </div>

          {(walletData?.escrowBalance ?? 0) > 0 && (
            <div className="escrow-note">
              ₦{Number(walletData.escrowBalance).toLocaleString()} in escrow
            </div>
          )}

          <div className="balance-action-row">
            <button
              className={`action-card-btn withdraw-btn${activePanel === "withdraw" ? " active" : ""}`}
              onClick={() => togglePanel("withdraw")}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
              Withdraw
            </button>
            <button
              className={`action-card-btn add-money-btn${activePanel === "add" ? " active" : ""}`}
              onClick={() => togglePanel("add")}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Money
            </button>
          </div>
        </div>

        {/* Withdrawal Form Section */}
        <div
          className={`action-dropdown${activePanel === "withdraw" ? " open" : ""}`}
        >
          <div className="dropdown-inner">
            <h3 className="dropdown-title">Withdraw Funds</h3>
            <div className="form-row-split">
              <div className="form-field">
                <label>Amount (₦)</label>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={withdrawForm.amount}
                  onChange={(e) =>
                    setWithdrawForm((p) => ({ ...p, amount: e.target.value }))
                  }
                />
              </div>
              {/* <div className="form-field">
                <label>Bank Code</label>
                <input
                  type="text"
                  placeholder="e.g. 044"
                  value={withdrawForm.bankCode}
                  onChange={(e) =>
                    setWithdrawForm((p) => ({ ...p, bankCode: e.target.value }))
                  }
                />
              </div> */}
            </div>
            <div className="form-row-split">
              <div className="form-field">
                <label>Account Number</label>
                <input
                  type="text"
                  placeholder="e.g. 0123456789"
                  value={withdrawForm.accountNumber}
                  onChange={(e) =>
                    setWithdrawForm((p) => ({
                      ...p,
                      accountNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-field">
                <label>Bank Name</label>
                <select
                  value={withdrawForm.bankName}
                  onChange={(e) =>
                    setWithdrawForm((p) => ({ ...p, bankName: e.target.value }))
                  }
                >
                  <option value="">Select bank</option>
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* {withdrawStatus && (
              <div className={`status-msg ${withdrawStatus.type}`}>
                {withdrawStatus.msg}
              </div>
            )} */}
            <button
              className="dropdown-submit-btn withdraw-submit"
              onClick={handleWithdraw}
              disabled={withdrawLoading}
            >
              {withdrawLoading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>

        {/* Top-Up / Deposit Section */}
        <div
          className={`action-dropdown${activePanel === "add" ? " open" : ""}`}
        >
          <div className="dropdown-inner">
            <h3 className="dropdown-title">Add Money</h3>
            <div className="form-field">
              <label>Amount (₦)</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                inputMode="numeric"
                pattern="[0-9]*"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
            </div>
            {addStatus && (
              <div className={`status-msg ${addStatus.type}`}>
                {addStatus.msg}
              </div>
            )}
            <button
              className="dropdown-submit-btn add-submit"
              onClick={handleAddMoney}
              disabled={addLoading}
            >
              {addLoading ? "Redirecting to payment..." : "Add Money"}
            </button>
          </div>
        </div>

        {/* Bank Account List Display Section
        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Linked Accounts</h3>
            <button
              className={`panel-header-action-btn${activePanel === "add" ? " active" : ""}`}
              onClick={() => togglePanel("add")}
            >
              + Add Account
            </button>
          </div>
          {walletData?.linkedAccounts?.length > 0 ? (
            walletData.linkedAccounts.map((acc, i) => (
              <div className="linked-account-row-item" key={i}>
                <div className="bank-meta-group">
                  <div className="bank-card-icon-box">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <div className="bank-name-stack">
                    <span className="bank-title-text">{acc.bankName}</span>
                    <span className="bank-number-obscured">
                      ****{acc.accountNumber?.slice(-4)}
                    </span>
                  </div>
                </div>
                {i === 0 && <span className="badge-primary">Primary</span>}
              </div>
            ))
          ) : (
            <div className="empty-accounts">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <p>No linked accounts yet</p>
              <span>Add a bank account to enable withdrawals</span>
            </div>
          )}
        </div> */}

        {/* Dynamic Transaction Log History Grid */}
        <div className="wallet-dashboard-panel">
          <div className="panel-header-row">
            <h3 className="panel-section-title">Transaction History</h3>
          </div>
          <div className="transaction-list-stack">
            {walletData?.transactions?.length > 0 ? (
              walletData.transactions.map((trn) => (
                <div className="transaction-list-row-item" key={trn._id}>
                  <div className="trn-meta-group">
                    <div
                      className={`trn-badge ${trn.type === "Credit" ? "trn-credit" : "trn-debit"}`}
                    >
                      {trn.type === "Credit" ? (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <polyline points="19 12 12 19 5 12" />
                        </svg>
                      ) : (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="19" x2="12" y2="5" />
                          <polyline points="5 12 12 5 19 12" />
                        </svg>
                      )}
                    </div>
                    <div className="trn-text-stack">
                      <span className="trn-title">{trn.description}</span>
                      <span className="trn-date">
                        {formatDate(trn.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`trn-amount ${trn.type === "Credit" ? "trn-credit-amount" : "trn-debit-amount"}`}
                  >
                    {trn.type === "Credit" ? "+" : "-"}₦
                    {Number(trn.amount).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-transactions">No transactions yet</div>
            )}
          </div>
        </div>
        {showWithdrawSuccess && (
          <div className="fg-modal-overlay">
            <div className="fg-modal-card animate-popup">
              <div className="fg-modal-icon-box">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="fg-modal-title">Withdrawal Successful</h2>
              <p className="fg-modal-message">{withdrawSuccessMessage}</p>
              <button
                type="button"
                className="fg-modal-btn"
                onClick={handleCloseWithdrawSuccess}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Error Modal Popup */}
        {showErrorModal && (
          <div className="fg-modal-overlay" onClick={handleCloseErrorModal}>
            <div className="fg-modal-card animate-popup" style={{ borderTop: "4px solid #dc2626" }} onClick={(e) => e.stopPropagation()}>
              <div className="fg-modal-icon-box">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h2 className="fg-modal-title" style={{ color: "#dc2626" }}>Error</h2>
              <p className="fg-modal-message">{errorModalMessage}</p>
              <button
                type="button"
                className="fg-modal-btn"
                style={{ backgroundColor: "#dc2626" }}
                onClick={handleCloseErrorModal}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wallet;
