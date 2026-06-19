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

    if (!dashboardData || Object.keys(dashboardData).length === 0) {
      getAllDeliveries();
    }
  }, [setDashboardData, dashboardData, auth?.token]);

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

      <div
        className="fg-recent-farmers-section"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "10px",
        }}
      >
        <h3 style={{ fontSize: "18px", color: "#333", margin: "0" }}>
          Your Registered Farmers
        </h3>
        {farmersList.length === 0 ? (
          <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
            No farmers found on this agent account.
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {farmersList.map((farmer, index) => (
              <div
                key={farmer?._id || farmer?.id || index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "600",
                      color: "#111827",
                      fontSize: "15px",
                    }}
                  >
                    {farmer?.farmerFullName ||
                      farmer?.farmerName ||
                      "Unnamed Farmer"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#6b7280" }}>
                    Location: {farmer?.farmLocation || "Not specified"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#044335",
                      backgroundColor: "#ecfdf5",
                      padding: "4px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {farmer?.mainProduceType ||
                      farmer?.produceType ||
                      "General Produce"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashBoardHeader;
