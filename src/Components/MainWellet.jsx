import React, { useState, useEffect } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import "../CSS/MainWellet.css";
import { FiBell } from "react-icons/fi";

const MainWellet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    bankName: "",
    accountNumber: "",
    amount: "",
  });
  const [withdrawMessage, setWithdrawMessage] = useState({ type: "", text: "" });
  const token = useSelector((state) => state.auth.token);

  const bankCodes = {
    "Access Bank": "44",
    "Access Bank (Diamond)": "063",
    "ALAT by WEMA": "035A",
    "Amju Unique MFB": "090180",
    "Aso Savings and Loans": "401",
    "Baines Credit Microfinance Bank": "090143",
    "Bowen Microfinance Bank": "090148",
    "Carbon": "565",
    "Citibank Nigeria": "023",
    "Coronation Merchant Bank": "302",
    "EcoBank Nigeria": "050",
    "Ekondo Microfinance Bank": "562",
    "Eyowo": "50126",
    "Fidelity Bank": "070",
    "First Bank of Nigeria": "011",
    "First City Monument Bank": "214",
    "FSDH Merchant Bank": "501",
    "Globus Bank": "00103",
    "GoMoney": "100022",
    "Guaranty Trust Bank": "058",
    "Heritage Bank": "030",
    "HopePSB": "120002",
    "IBILE Microfinance Bank": "51244",
    "Infinity MFB": "50457",
    "Jaiz Bank": "301",
    "Keystone Bank": "082",
    "Kuda Bank": "50211",
    "Lagos Building Investment Company Plc": "90052",
    "Links MFB": "50549",
    "Living Trust Mortgage Bank": "035",
    "Lotus Bank": "303",
    "Mayfair MFB": "50563",
    "Mint MFB": "50304",
    "Moniepoint MFB": "50515",
    "Nova Merchant Bank": "304",
    "Opay": "999992",
    "Page Financials": "561",
    "Parallex Bank": "526",
    "Parkway ReadyCash": "311",
    "Paycom (Palmpay)": "999991",
    "PremiumTrust Bank": "000031",
    "Providus Bank": "101",
    "Rubies MFB": "125",
    "Safe Haven MFB": "51113",
    "SafeHaven Microfinance Bank": "951113",
    "Sparkle Bank": "51310",
    "Stanbic IBTC Bank": "221",
    "Standard Chartered Bank": "068",
    "Sterling Bank": "232",
    "Suntrust Bank": "100",
    "TAJ Bank": "302",
    "Tangerine Money": "51269",
    "TCF MFB": "51211",
    "Titan Bank": "102",
    "Titan Trust Bank": "102",
    "Unical MFB": "90067",
    "Union Bank of Nigeria": "032",
    "United Bank for Africa": "033",
    "Unity Bank": "215",
    "VFD Microfinance Bank Plc": "566",
    "Wema Bank": "035",
    "Zenith Bank": "057",
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BaseUrl}/driverDash/driverWallet`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWalletData(data.data || data);
      } else {
        setError(data.message || "Unable to load wallet");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    if (amount == null) return "₦0";
    return `₦${Number(amount).toLocaleString()}`;
  };

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setWithdrawMessage({ type: "", text: "" });

    const currentBalance = walletData?.availableBalance ?? walletData?.balance ?? 0;
    const withdrawAmt = Number(withdrawForm.amount);

    if (!withdrawForm.bankName || !withdrawForm.accountNumber || !withdrawForm.amount) {
      setWithdrawMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    if (withdrawAmt <= 0) {
      setWithdrawMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    if (withdrawAmt > currentBalance) {
      setWithdrawMessage({ type: "error", text: "Insufficient funds" });
      return;
    }

    const selectedBankCode = bankCodes[withdrawForm.bankName] || "44";

    try {
      setSubmittingWithdrawal(true);
      
      const response = await fetch(`${import.meta.env.VITE_BaseUrl}/payment/withdraw`, {
        method: "POST",
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: withdrawAmt,
          bankCode: selectedBankCode,
          accountNumber: withdrawForm.accountNumber,
          bankName: withdrawForm.bankName
        })
      });

      const data = await response.json();

      if (response.ok) {
        setWithdrawMessage({ type: "success", text: data.message || "Withdrawal initiated successfully!" });
        setWithdrawForm({ bankName: "", accountNumber: "", amount: "" });
        setShowWithdrawModal(false);
      } else {
        setWithdrawMessage({ type: "error", text: data.message || "Withdrawal failed. Try again." });
      }
    } catch (err) {
      setWithdrawMessage({ type: "error", text: "Network connection error. Try again." });
    } finally {
      setSubmittingWithdrawal(false);
    }
  };

  const availableBalance = walletData?.availableBalance ?? walletData?.balance ?? 0;
  const clearedEarnings = walletData?.clearedEarnings ?? walletData?.earnings ?? 0;

  if (loading) {
    return (
      <div className="main-wellet-container">
        <div className="fg-deliv-header-row">
          <h1 className="fg-deliv-main-title">Wallet</h1>
          <div className="fg-deliv-notif-box">
            <div className="fg-deliv-notif-dot"></div>
            <FiBell size={24} />
          </div>
        </div>
        <div className="mw-title-wrapper">
          <h1 className="mw-main-title">Wallet</h1>
          <p className="mw-sub-title">
            Manage your funds and view transaction history
          </p>
        </div>
        <div className="mw-cards-row">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="mw-stat-capsule-card"
              style={{ opacity: 0.4 }}
            >
              <div className="mw-capsule-value">--</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-wellet-container">
        <div className="mw-title-wrapper">
          <h1 className="mw-main-title">Wallet</h1>
          <p className="mw-sub-title">
            Manage your funds and view transaction history
          </p>
        </div>
        <div className="mw-cards-row">
          <div className="mw-balance-card">
            <div className="mw-card-top-line">
              <div className="mw-balance-label-group">
                <Wallet size={16} />
                <span>Available Balance</span>
              </div>
            </div>
            <div className="mw-balance-amount">₦0.00</div>
            <p style={{ fontSize: "13px", color: "#aaa", marginTop: "8px" }}>
              Wallet not set up yet. Contact support.
            </p>
            <button
              className="mw-withdraw-action-btn"
              type="button"
              disabled
              style={{ opacity: 0.5 }}
            >
              <ArrowUpRight size={16} />
              <span>Withdraw</span>
            </button>
          </div>

          <div className="mw-stat-capsule-card">
            <div className="mw-capsule-header yellow-text">
              <Clock size={16} />
              <span>Pending Escrow</span>
            </div>
            <div className="mw-capsule-value">₦0</div>
            <div className="mw-capsule-footer-text">No active deliveries</div>
          </div>

          <div className="mw-stat-capsule-card">
            <div className="mw-capsule-header green-text">
              <CheckCircle2 size={16} />
              <span>Cleared Earnings</span>
            </div>
            <div className="mw-capsule-value">₦0</div>
            <div className="mw-capsule-footer-text">
              Available for withdrawal
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wellet-container">
      <div className="mw-title-wrapper">
        <h1 className="mw-main-title">Wallet</h1>
        <p className="mw-sub-title">
          Manage your funds and view transaction history
        </p>
      </div>

      <div className="mw-cards-row">
        <div className="mw-balance-card">
          <div className="mw-card-top-line">
            <div className="mw-balance-label-group">
              <Wallet size={16} />
              <span>Available Balance</span>
            </div>
            <button
              className="mw-toggle-visibility-btn"
              onClick={() => setShowBalance(!showBalance)}
              type="button"
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <div className="mw-balance-amount">
            {showBalance ? formatAmount(availableBalance) : "•••••••"}
          </div>
          <button 
            className="mw-withdraw-action-btn" 
            type="button"
            onClick={() => setShowWithdrawModal(true)}
          >
            <ArrowUpRight size={16} />
            <span>Withdraw</span>
          </button>
        </div>

        <div className="mw-stat-capsule-card">
          <div className="mw-capsule-header green-text">
            <CheckCircle2 size={16} />
            <span>Cleared Earnings</span>
          </div>
          <div className="mw-capsule-value">
            {formatAmount(clearedEarnings)}
          </div>
          <div className="mw-capsule-footer-text">Available for withdrawal</div>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="fg-modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="fg-withdraw-modal-container" style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #f0f0f0",
            maxWidth: "680px",
            width: "90%",
            padding: "32px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            fontFamily: "sans-serif"
          }}>
            <h2 style={{
              margin: "0 0 24px 0",
              fontSize: "22px",
              fontWeight: "700",
              color: "#111b27"
            }}>Withdraw Funds</h2>


            <form onSubmit={handleWithdrawSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", color: "#4b5563", marginBottom: "8px", fontWeight: "500" }}>Bank Name</label>
                <select
                  value={withdrawForm.bankName}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, bankName: e.target.value })}
                  disabled={submittingWithdrawal}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    color: "#1f2937",
                    backgroundColor: "#ffffff",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="">Select a bank</option>
                  {Object.keys(bankCodes).map((bank) => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontSize: "14px", color: "#4b5563", marginBottom: "8px", fontWeight: "500" }}>Bank Account</label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Enter 10-digit account number"
                  value={withdrawForm.accountNumber}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, accountNumber: e.target.value.replace(/\D/g, "") })}
                  disabled={submittingWithdrawal}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    color: "#1f2937",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "14px", color: "#4b5563", marginBottom: "8px", fontWeight: "500" }}>Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                  disabled={submittingWithdrawal}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid #d1d5db",
                    fontSize: "15px",
                    color: "#1f2937",
                    outline: "none",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <button
                  type="submit"
                  disabled={submittingWithdrawal}
                  style={{
                    flex: 1,
                    backgroundColor: "#064e3b",
                    color: "#ffffff",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: submittingWithdrawal ? "not-allowed" : "pointer",
                    opacity: submittingWithdrawal ? 0.7 : 1
                  }}
                >
                  {submittingWithdrawal ? "Processing..." : "Withdraw"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawMessage({ type: "", text: "" });
                    setWithdrawForm({ bankName: "", accountNumber: "", amount: "" });
                  }}
                  disabled={submittingWithdrawal}
                  style={{
                    flex: 1,
                    backgroundColor: "#ffffff",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Pop-up Modal */}
      {withdrawMessage.type === "success" && (
        <div className="fg-modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="fg-modal-card animate-popup" style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            maxWidth: "400px",
            width: "90%",
            padding: "36px 32px 28px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
          }}>
            <div className="fg-modal-icon-box" style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#ecfdf5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#065f46",
              margin: "0 0 8px 0"
            }}>Withdrawal Successful!</h2>
            <p style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: "0 0 24px 0",
              lineHeight: "1.5"
            }}>{withdrawMessage.text}</p>
            <button
              type="button"
              onClick={() => {
                setWithdrawMessage({ type: "", text: "" });
                fetchWallet();
              }}
              style={{
                backgroundColor: "#064e3b",
                color: "#ffffff",
                border: "none",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Error Pop-up Modal */}
      {withdrawMessage.type === "error" && (
        <div className="fg-modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="fg-modal-card animate-popup" style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            maxWidth: "400px",
            width: "90%",
            padding: "36px 32px 28px",
            textAlign: "center",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
          }}>
            <div className="fg-modal-icon-box" style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#fef2f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#991b1b",
              margin: "0 0 8px 0"
            }}>Withdrawal Failed</h2>
            <p style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: "0 0 24px 0",
              lineHeight: "1.5"
            }}>{withdrawMessage.text}</p>
            <button
              type="button"
              onClick={() => setWithdrawMessage({ type: "", text: "" })}
              style={{
                backgroundColor: "#f3f4f6",
                color: "#374151",
                border: "none",
                padding: "12px 32px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%"
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainWellet;