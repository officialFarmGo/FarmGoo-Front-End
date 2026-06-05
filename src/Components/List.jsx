import React from "react";
import "../CSS/List.css";

const List = () => {
  return (
    <div className="list-container">
      {/* Header Section */}
      <div className="list-header">
        <div className="header-text">
          <h2>Earnings</h2>
          <p>Track your income and payment history</p>
        </div>
        <button className="withdraw-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Withdraw Earnings
        </button>
      </div>

      {/* Cards Wrapper (Flexbox) */}
      <div className="cards-wrapper">
        {/* Card 1: This Week */}
        <div className="card highlight-card">
          <div className="card-top">
            <span className="card-icon-wrapper">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </span>
            <span className="card-title">This Week</span>
          </div>
          <h1 className="card-amount">₦245,000</h1>
          <div className="card-footer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            <span>+12% from last week</span>
          </div>
        </div>

        {/* Card 2: Cleared Earnings */}
        <div className="card">
          <div className="card-top">
            <span className="card-icon check-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </span>
            <span className="card-title text-muted">Cleared Earnings</span>
          </div>
          <h1 className="card-amount text-dark">₦285,000</h1>
          <div className="card-footer text-muted">Available to withdraw</div>
        </div>

        {/* Card 3: Pending Earnings */}
        <div className="card">
          <div className="card-top">
            <span className="card-icon clock-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <span className="card-title text-muted">Pending Earnings</span>
          </div>
          <h1 className="card-amount text-dark">₦158,000</h1>
          <div className="card-footer text-muted">From 3 deliveries</div>
        </div>

        {/* Card 4: This Month */}
        <div className="card">
          <div className="card-top">
            <span className="card-icon calendar-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <span className="card-title text-muted">This Month</span>
          </div>
          <h1 className="card-amount text-dark">₦890,000</h1>
          <div className="card-footer text-muted">47 completed trips</div>
        </div>
      </div>
    </div>
  );
};

export default List;
