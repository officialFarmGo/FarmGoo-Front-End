import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import FarmName from "./FarmName";
import "../CSS/MyFarmersNum.css";

const MyFarmersNum = () => {
  const [data, setData] = useState(null);
  const userToken = useSelector((state) => state);
  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const agentsFarmersOverview = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/agentDashboard/agentsFarmersOverview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    agentsFarmersOverview();
  }, []);

  const stats = [
    {
      id: 1,
      // Nested under the stats object in your response payload
      value: data?.stats?.totalFarmers ?? 0,
      label: "Total Farmers",
      className: "stat-black",
    },
    {
      id: 2,
      // Nested under the stats object in your response payload
      value: data?.stats?.totalDeliveries ?? 0,
      label: "Total Deliveries",
      className: "stat-green",
    },
    {
      id: 3,
      // Nested under the stats object in your response payload
      value:
        data?.stats?.commissionsEarned !== undefined
          ? `₦${data.stats.commissionsEarned.toLocaleString()}`
          : "₦0",
      label: "Commissions Earned",
      className: "stat-dark-green",
    },
  ];

  return (
    <div className="farmers-container">
      <div className="farmers-header">
        <button className="back-btn" onClick={() => nav(-1)}>
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
            <button className="add-farmer-btn">
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
      <FarmName dashboardData={data} />
    </div>
  );
};

export default MyFarmersNum;
