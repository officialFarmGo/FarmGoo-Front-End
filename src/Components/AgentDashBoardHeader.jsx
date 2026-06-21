import React, { useEffect } from "react";
import {
  UsergroupAddOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import "../CSS/AgentDashBoardHeader.css";
import "../CSS/DashboardHeader.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AgentDashBoardHeader = ({ dashboardData, setDashboardData }) => {
  const nav = useNavigate();
  const auth = useSelector((state) => state.auth);

  // Safely normalize raw payloads
  const apiData = dashboardData?.data || dashboardData;
  const greeting =
    apiData?.greeting || `Welcome Back, ${auth?.user?.name || "Agent"}`;
  const farmersList = apiData?.farmers || apiData?.farmersUnderAgent || [];

  const stats = {
    farmersManaged:
      apiData?.stats?.farmersManaged ??
      apiData?.farmersManaged ??
      farmersList.length ??
      0,
    inProgress: apiData?.stats?.inProgress ?? apiData?.inProgress ?? 0,
    completedThisMonth:
      apiData?.stats?.completedThisMonth ?? apiData?.completedThisMonth ?? 0,
    totalSpentThisMonth:
      apiData?.stats?.totalSpentThisMonth ?? apiData?.totalSpentThisMonth ?? 0,
  };

  useEffect(() => {
    const getAllDeliveries = async () => {
      const BASE_URL = import.meta.env.VITE_BaseUrl;
      const token = localStorage.getItem("token") || auth?.token;

      if (!BASE_URL) {
        console.error("API Base URL is missing. Check your .env file.");
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/agentDashboard/getAlldeliveries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const fetchedData = response.data?.data || response.data;

        if (fetchedData && typeof setDashboardData === "function") {
          setDashboardData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching dashboard header data:", error);
      }
    };

    // Strict validation conditions to run data synchronization only once
    if (!dashboardData || Object.keys(dashboardData).length === 0) {
      getAllDeliveries();
    }
  }, [dashboardData, auth?.token, setDashboardData]);

  const formatCurrency = (value) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue === 0) return "₦0";
    return numValue >= 1000
      ? `₦${(numValue / 1000).toFixed(0)}k`
      : `₦${numValue}`;
  };

  const statsData = [
    {
      id: "farmers-managed",
      type: "standard",
      value: stats.farmersManaged,
      label: "Farmers Managed",
      icon: (
        <UsergroupAddOutlined style={{ fontSize: "20px", color: "#2563eb" }} />
      ),
      iconWrapperClass: "fg-icon-blue",
      onClick: () => nav("MyFarmersNum"),
    },
    {
      id: "in-progress",
      type: "standard",
      value: stats.inProgress,
      label: "In Progress",
      icon: <CarOutlined style={{ fontSize: "20px", color: "#044335" }} />,
      iconWrapperClass: "fg-icon-green",
    },
    {
      id: "completed-month",
      type: "stacked",
      value: stats.completedThisMonth,
      label: "Completed This Month",
      subtext: "Updated live",
      subtextClass: "text-green",
      icon: (
        <CheckCircleOutlined style={{ fontSize: "18px", color: "#22c55e" }} />
      ),
    },
    {
      id: "total-spent",
      type: "stacked",
      value: formatCurrency(stats.totalSpentThisMonth),
      label: "Total Spent",
      subtext: "This month",
      subtextClass: "",
      icon: (
        <ArrowUpOutlined
          style={{
            fontSize: "16px",
            color: "#a855f7",
            transform: "rotate(45deg)",
          }}
        />
      ),
    },
  ];

  return (
    <div
      className="fg-agent-dashboard-header"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      <div className="fg-agent-welcome-section">
        <h2 className="fg-agent-welcome-title">
          {greeting} <span className="fg-wave-emoji">👋</span>
        </h2>
        <p className="fg-agent-welcome-subtitle">
          Here's what's happening with your farmers today
        </p>
      </div>

      <div className="fg-agent-stats-grid">
        {statsData.map((card) => {
          const isClickable = typeof card.onClick === "function";

          return (
            <div
              key={card.id}
              className={`fg-agent-stat-card ${isClickable ? "clickable" : ""}`}
              onClick={card.onClick}
              style={{ cursor: isClickable ? "pointer" : "default" }}
            >
              {card.type === "standard" && (
                <>
                  <div
                    className={`fg-card-icon-wrapper ${card.iconWrapperClass}`}
                  >
                    {card.icon}
                  </div>
                  <div className="fg-card-metrics-row">
                    <span className="fg-card-stat-number">{card.value}</span>
                  </div>
                  <span className="fg-card-stat-label">{card.label}</span>
                </>
              )}

              {card.type === "stacked" && (
                <>
                  <div className="fg-card-top-header">
                    <span className="fg-card-stat-label-top">{card.label}</span>
                    {card.icon}
                  </div>
                  <div className="fg-card-metrics-row-stacked">
                    <span className="fg-card-stat-number-small">
                      {card.value}
                    </span>
                    <span
                      className={`fg-card-stat-subtext ${card.subtextClass || ""}`}
                    >
                      {card.subtext}
                    </span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentDashBoardHeader;
