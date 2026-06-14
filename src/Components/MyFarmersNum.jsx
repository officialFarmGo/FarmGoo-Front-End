import React from "react";
import "../CSS/MyFarmersNum.css";
import FarmName from "./FarmName";
import { Links, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MyFarmersNum = () => {
  const nav = useNavigate();
  const stats = [
    { id: 1, value: "4", label: "Total Farmers", className: "stat-black" },
    { id: 2, value: "31", label: "Total Deliveries", className: "stat-green" },
    {
      id: 3,
      value: "₦156K",
      label: "Commissions Earned",
      className: "stat-dark-green",
    },
  ];

  return (
    <div className="farmers-container">
      <div className="farmers-header">
        <button className="back-btn">
          <span className="arrow">←</span> Back to Dashboard
        </button>
        <div className="header-main">
          <div>
            <h1 className="header-title">My Farmers</h1>
            <p className="header-subtitle">Manage your farmer network</p>
          </div>
          <Link
            style={{ textDecoration: "none" }}
            to="/agent/dashboard/AddFarm"
          >
            <button
              className="add-farmer-btn"
              style={{ background: "red" }}
              onClick={() => {}}
            >
              <span className="plus-icon">+</span> Add Farmer
            </button>
          </Link>
        </div>
      </div>

      <div className="cards-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <h2 className={`stat-value ${stat.className}`}>{stat.value}</h2>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
      <FarmName />
    </div>
  );
};

export default MyFarmersNum;
