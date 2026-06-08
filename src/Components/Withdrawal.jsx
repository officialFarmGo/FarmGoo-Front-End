import React from "react";
import "../CSS/Withdrawal.css";

const Withdrawal = () => {
  // Array holding the history item data mapping your design
  const historyData = [
    {
      id: 1,
      title: "Withdrawal to GTBank",
      date: "May 20, 2026",
      amount: "-₦150,000",
      status: "Completed",
    },
    {
      id: 2,
      title: "Withdrawal to GTBank",
      date: "May 15, 2026",
      amount: "-₦200,000",
      status: "Completed",
    },
    {
      id: 3,
      title: "Withdrawal to GTBank",
      date: "May 10, 2026",
      amount: "-₦100,000",
      status: "Completed",
    },
  ];

  return (
    <div className="withdrawal-container">
      <div className="history-card">
        {/* Title Header */}
        <div className="history-header">
          <h3>Withdrawal History</h3>
        </div>

        {/* Transactions Stack */}
        <div className="history-stack">
          {historyData.map((tx) => (
            <div className="history-item" key={tx.id}>
              {/* Left Side: Icon & Details */}
              <div className="history-left">
                <div className="download-icon-bg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0055ff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
                <div className="tx-details">
                  <h4>{tx.title}</h4>
                  <span className="tx-date">{tx.date}</span>
                </div>
              </div>

              {/* Right Side: Amount & Status */}
              <div className="history-right">
                <span className="tx-amount">{tx.amount}</span>
                <span className="tx-status">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
