import React from "react";
import { CheckCircle2, ArrowDownCircle, Clock, Download } from "lucide-react";
import '../CSS/Transactions.css'

const Transactions = () => {
  const transactionData = [
    {
      id: 1,
      type: "credit",
      title: "Payment for Delivery #DEL098",
      date: "Today, 9:45 AM",
      status: "Completed",
      statusClass: "tx-status-completed",
      amount: "+₦65,000",
      icon: <CheckCircle2 size={18} />,
    },
    {
      id: 2,
      type: "credit",
      title: "Payment for Delivery #DEL097",
      date: "Yesterday, 4:30 PM",
      status: "Completed",
      statusClass: "tx-status-completed",
      amount: "+₦78,000",
      icon: <CheckCircle2 size={18} />,
    },
    {
      id: 3,
      type: "debit",
      title: "Withdrawal to GTBank",
      date: "May 20, 2026",
      status: "Completed",
      statusClass: "tx-status-completed",
      amount: "₦150,000",
      icon: <ArrowDownCircle size={18} />,
    },
    {
      id: 4,
      type: "escrow",
      title: "Escrow for Delivery #DEL001",
      date: "Today, 8:00 AM",
      status: "Pending Release",
      statusClass: "tx-status-pending",
      amount: "+₦85,000",
      icon: <Clock size={18} />,
    },
    {
      id: 5,
      type: "credit",
      title: "Payment for Delivery #DEL095",
      date: "May 19, 2026",
      status: "Completed",
      statusClass: "tx-status-completed",
      amount: "+₦45,000",
      icon: <CheckCircle2 size={18} />,
    },
  ];

  return (
    <div className="transactions-container">
      {/* Transaction Wrapper Card Box */}
      <div className="transactions-card-wrapper">
        {/* Header Strip Inside the Card */}
        <div className="tx-header-row">
          <h2 className="tx-section-title">Transaction History</h2>
          <button className="tx-download-btn" type="button">
            <Download size={16} />
            <span>Download Statement</span>
          </button>
        </div>

        {/* Dynamic List Container Stack */}
        <div className="tx-list-stack">
          {transactionData.map((tx) => (
            <div key={tx.id} className="tx-row-item">
              {/* Profile Details Block */}
              <div className="tx-left-block">
                <div className={`tx-icon-wrapper tx-icon-${tx.type}`}>
                  {tx.icon}
                </div>
                <div className="tx-details-column">
                  <h4 className="tx-item-title">{tx.title}</h4>
                  <div className="tx-meta-line">
                    <span className="tx-timestamp">{tx.date}</span>
                    <span className="tx-dot-divider">•</span>
                    <span className={`tx-status-text ${tx.statusClass}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payout Block Segment */}
              <div className={`tx-amount-value tx-amount-${tx.type}`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
