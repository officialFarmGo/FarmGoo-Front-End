import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/AgentNotification.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FaTruck, FaDollarSign } from "react-icons/fa6";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const AgentNotification = () => {
  const nav = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    unreadCount: 0,
    notifications: [],
  });

  const getAllDeliveries = async () => {
    const BASE_URL = import.meta.env.VITE_BaseUrl;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${BASE_URL}/notifications/agentNotification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching delivery dashboard data:", error);
    }
  };

  useEffect(() => {
    getAllDeliveries();
  }, []);

  const getNotificationIconDetails = (type) => {
    switch (type) {
      case "driver-accepted":
      case "new-request":
        return {
          icon: <FaTruck className="notif-icon-svg text-blue" />,
          iconBg: "bg-light-blue",
        };
      case "payment-released":
        return {
          icon: <FaDollarSign className="notif-icon-svg text-green" />,
          iconBg: "bg-light-green",
        };
      case "delivery-completed":
        return {
          icon: <FiCheckCircle className="notif-icon-svg text-emerald" />,
          iconBg: "bg-light-emerald",
        };
      case "weather-alert":
        return {
          icon: <FiAlertTriangle className="notif-icon-svg text-amber" />,
          iconBg: "bg-light-amber",
        };
      default:
        return {
          icon: <FaTruck className="notif-icon-svg text-blue" />,
          iconBg: "bg-light-blue",
        };
    }
  };

  return (
    <div className="agent-notifications-container">
      <div className="back-to-dashboard-btn" onClick={() => nav(-1)}>
        <ArrowLeftOutlined className="back-arrow-icon" />
        <span>Back to Dashboard</span>
      </div>

      <div className="notif-header-row">
        <div className="notif-title-section">
          <h1>Notifications</h1>
          <p>
            You have <span className="bold-count">{dashboardData.unreadCount || 0} unread notifications</span>
          </p>
        </div>
        <button type="button" className="mark-all-read-btn">
          Mark All as Read
        </button>
      </div>

      <div className="notifications-list-wrapper">
        {dashboardData.notifications.length === 0 ? (
          <div className="empty-state-message">No notifications found</div>
        ) : (
          dashboardData.notifications.map((notif, index) => {
            const iconDetails = getNotificationIconDetails(notif.type);
            return (
              <div
                key={notif.id || notif._id || index}
                className={`notif-card ${notif.unread ? "unread-border" : "normal-border"}`}
              >
                <div className={`notif-icon-circle ${iconDetails.iconBg}`}>
                  {iconDetails.icon}
                </div>

                <div className="notif-content-block">
                  <h3>{notif.title}</h3>
                  <p className="notif-desc">{notif.description}</p>
                  <span className="notif-timestamp">{notif.time || notif.createdAt}</span>
                </div>

                {notif.unread && <div className="unread-dot-indicator"></div>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AgentNotification;