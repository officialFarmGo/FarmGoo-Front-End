import React, { useState } from "react";
import {
  Wallet,
  Eye,
  EyeOff,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import "../../CSS/MainWellet.css";

const MainWellet = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="main-wellet-container">
      {/* Title Header Group */}
      <div className="mw-title-wrapper">
        <h1 className="mw-main-title">Wallet</h1>
        <p className="mw-sub-title">
          Manage your funds and view transaction history
        </p>
      </div>

      {/* Flexbox Row Container for the Cards */}
      <div className="mw-cards-row">
        {/* Card 1: Available Balance */}
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
            {showBalance ? "₦238,500" : "•••••••"}
          </div>

          <button className="mw-withdraw-action-btn" type="button">
            <ArrowUpRight size={16} />
            <span>Withdraw</span>
          </button>
        </div>

        {/* Card 2: Pending Escrow */}
        <div className="mw-stat-capsule-card">
          <div className="mw-capsule-header yellow-text">
            <Clock size={16} />
            <span>Pending Escrow</span>
          </div>
          <div className="mw-capsule-value">₦158,000</div>
          <div className="mw-capsule-footer-text">From 3 active deliveries</div>
        </div>

        {/* Card 3: Cleared Earnings */}
        <div className="mw-stat-capsule-card">
          <div className="mw-capsule-header green-text">
            <CheckCircle2 size={16} />
            <span>Cleared Earnings</span>
          </div>
          <div className="mw-capsule-value">₦285,000</div>
          <div className="mw-capsule-footer-text">Available for withdrawal</div>
        </div>
      </div>
    </div>
  );
};

export default MainWellet;
