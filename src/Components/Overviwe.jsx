import React from "react";
import "../CSS/Overviwe.css";

const Overviwe = () => {
  // Array of data representing each day's bar percentage fill and display label
  const dailyData = [
    { day: "Mon", amount: "₦45,000", fill: "80%" },
    { day: "Tue", amount: "₦38,000", fill: "68%" },
    { day: "Wed", amount: "₦52,000", fill: "100%" },
    { day: "Thu", amount: "₦41,000", fill: "73%" },
    { day: "Fri", amount: "₦48,000", fill: "86%" },
    { day: "Sat", amount: "₦21,000", fill: "38%" },
    { day: "Sun", amount: "₦0", fill: "1%" }, // Small placeholder bump fill for view visibility
  ];

  return (
    <div className="overviwe-container">
      {/* Chart Card Wrapper */}
      <div className="overview-card">
        {/* Header Section */}
        <div className="overview-header">
          <h3>Earnings Overview</h3>
          <div className="dropdown-container">
            <select className="time-select" defaultValue="this-week">
              <option value="this-week">This Week</option>
              <option value="last-week">Last Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>

        {/* Chart Rows */}
        <div className="chart-wrapper">
          {dailyData.map((item, index) => (
            <div className="chart-row" key={index}>
              <div className="day-label">{item.day}</div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: item.fill }}>
                  {item.amount !== "₦0" && (
                    <span className="bar-amount">{item.amount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="divider-line" />

        {/* Bottom Metrics Section */}
        <div className="metrics-row">
          <div className="metric-item">
            <span className="metric-label">Total This Week</span>
            <h4 className="metric-value">₦245,000</h4>
          </div>
          <div className="metric-item">
            <span className="metric-label">Average per Day</span>
            <h4 className="metric-value">₦35,000</h4>
          </div>
          <div className="metric-item">
            <span className="metric-label">Best Day</span>
            <h4 className="metric-value">₦52,000</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviwe;
