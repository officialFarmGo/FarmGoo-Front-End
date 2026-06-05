import React from "react";
import "../../CSS/ExportReport.css";

const ExportReport = () => {
  const earningsData = [
    {
      id: "DEL098",
      item: "Palm Oil",
      status: "Released",
      weight: "200L",
      route: "Ogun → Lagos",
      time: "Today, 9:45 AM",
      amount: "₦65,000",
    },
    {
      id: "DEL097",
      item: "Yam Tubers",
      status: "Released",
      weight: "600kg",
      route: "Badagry → Lagos",
      time: "Yesterday, 4:30 PM",
      amount: "₦42,000",
    },
    {
      id: "DEL096",
      item: "Tomatoes",
      status: "Released",
      weight: "450kg",
      route: "Lagos, Oshodi → Mile 12 Market, Lagos",
      time: "May 20, 2026",
      amount: "₦28,500",
    },
    {
      id: "DEL095",
      item: "Cassava Flour",
      status: "Released",
      weight: "500kg",
      route: "Abeokuta → Lagos",
      time: "May 19, 2026",
      amount: "₦45,000",
    },
  ];

  return (
    <div className="export-report-container">
      <div className="earnings-list-card">
        {/* Header Section */}
        <div className="list-header-row">
          <h3>Recent Earnings</h3>
          <button className="export-btn">
            <svg
              width="14"
              height="14"
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
            Export Report
          </button>
        </div>

        {/* Dynamic Items Stack */}
        <div className="items-stack">
          {earningsData.map((data) => (
            <div className="earning-item" key={data.id}>
              {/* Left Side Content */}
              <div className="item-info">
                <div className="title-row">
                  <h4>{data.item}</h4>
                  <span className="status-badge">{data.status}</span>
                </div>

                <p className="route-details">
                  {data.weight} <span>•</span> {data.route}
                </p>

                <p className="meta-details">
                  ID: {data.id} <span>•</span> {data.time}
                </p>
              </div>

              {/* Right Side Content */}
              <div className="item-amount">{data.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportReport;