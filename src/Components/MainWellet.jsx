import React, { useState, useEffect } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import "../CSS/MainWellet.css";
import { FiBell } from "react-icons/fi";

const MainWellet = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_BaseUrl}/driverDash/driverWallet`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

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

    fetchWallet();
  }, []);

  const formatAmount = (amount) => {
    if (amount == null) return "₦0";
    return `₦${Number(amount).toLocaleString()}`;
  };

  const availableBalance = walletData?.availableBalance ?? walletData?.balance ?? 0;
  const pendingEscrow = walletData?.pendingEscrow ?? walletData?.escrow ?? 0;
  const clearedEarnings = walletData?.clearedEarnings ?? walletData?.earnings ?? 0;
  const activeDeliveriesCount = walletData?.activeDeliveries ?? 0;

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
          <p className="mw-sub-title">Manage your funds and view transaction history</p>
        </div>
        <div className="mw-cards-row">
          {[1, 2, 3].map((i) => (
            <div key={i} className="mw-stat-capsule-card" style={{ opacity: 0.4 }}>
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
          <p className="mw-sub-title">Manage your funds and view transaction history</p>
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
            <button className="mw-withdraw-action-btn" type="button" disabled style={{ opacity: 0.5 }}>
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
            <div className="mw-capsule-footer-text">Available for withdrawal</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wellet-container">
      <div className="mw-title-wrapper">
        <h1 className="mw-main-title">Wallet</h1>
        <p className="mw-sub-title">Manage your funds and view transaction history</p>
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
          <button className="mw-withdraw-action-btn" type="button">
            <ArrowUpRight size={16} />
            <span>Withdraw</span>
          </button>
        </div>
{/* 
        <div className="mw-stat-capsule-card">
          <div className="mw-capsule-header yellow-text">
            <Clock size={16} />
            <span>Pending Escrow</span>
          </div>
          <div className="mw-capsule-value">{formatAmount(pendingEscrow)}</div>
          <div className="mw-capsule-footer-text">
            From {activeDeliveriesCount} active deliveries
          </div>
        </div> */}

        <div className="mw-stat-capsule-card">
          <div className="mw-capsule-header green-text">
            <CheckCircle2 size={16} />
            <span>Cleared Earnings</span>
          </div>
          <div className="mw-capsule-value">{formatAmount(clearedEarnings)}</div>
          <div className="mw-capsule-footer-text">Available for withdrawal</div>
        </div>
      </div>
    </div>
  );
};

export default MainWellet;