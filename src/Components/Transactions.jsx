import React from "react";
import { CheckCircle2, ArrowDownCircle, Clock, Download } from "lucide-react";
import '../CSS/Transactions.css';

const iconMap = {
  credit: <CheckCircle2 size={18} />,
  debit: <ArrowDownCircle size={18} />,
  escrow: <Clock size={18} />,
};

const formatAmount = (type, amount) => {
  const formatted = `₦${Number(amount).toLocaleString()}`;
  return type === "debit" ? formatted : `+${formatted}`;
};

const formatDate = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diff = now - date;
  const oneDay = 86400000;

  if (diff < oneDay && now.getDate() === date.getDate()) {
    return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  if (diff < oneDay * 2) {
    return `Yesterday, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  return date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
};

const Transactions = ({ transactions = [] }) => {
  return (
    <div className="transactions-container">
      <div className="transactions-card-wrapper">
        <div className="tx-header-row">
          <h2 className="tx-section-title">Transaction History</h2>
         
        </div>

        <div className="tx-list-stack">
          {transactions.length === 0 && (
            <p className="tx-empty-text">No transactions yet.</p>
          )}

          {transactions.map((tx) => (
            <div key={tx._id || tx.id} className="tx-row-item">
              <div className="tx-left-block">
                <div className={`tx-icon-wrapper tx-icon-${tx.type}`}>
                  {iconMap[tx.type] ?? <CheckCircle2 size={18} />}
                </div>
                <div className="tx-details-column">
                  <h4 className="tx-item-title">{tx.title || tx.description}</h4>
                  <div className="tx-meta-line">
                    <span className="tx-timestamp">{formatDate(tx.date || tx.createdAt)}</span>
                    <span className="tx-dot-divider">•</span>
                    <span className={`tx-status-text ${tx.status === "Pending Release" ? "tx-status-pending" : "tx-status-completed"}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className={`tx-amount-value tx-amount-${tx.type}`}>
                {formatAmount(tx.type, tx.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;