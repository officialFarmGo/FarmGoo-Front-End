import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Notification.css";
import { useSelector } from "react-redux";

const getIconByType = (type) => {
  if (type === "payment") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }
  if (type === "delivery") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    );
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/notifications/agentNotification`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data) {
        const fetchedData = response.data.data || response.data;
        setNotifications(Array.isArray(fetchedData) ? fetchedData : []);
      }
    } catch (err) {
      console.error("Error fetching agent notifications:", err);
      setError("Failed to load notifications. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  const renderNotificationBadge = (type) => {
    const lowercaseType = type?.toLowerCase();

    if (lowercaseType === "payment") {
      return (
        <div className="notif-badge badge-payment">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      );
    }

    if (lowercaseType === "job") {
      return (
        <div className="notif-badge badge-job">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
      );
    }

    return (
      <div className="notif-badge badge-delivery">
        <span className="currency-badge-symbol">₦</span>
      </div>
    );
  };

  return (
    <section className="notification-section">
      <div className="notification-container">
        <div className="notification-header">
          <h1 className="notification-page-title">Notifications</h1>
          {notifications.length > 0 && (
            <button className="mark-all-btn" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        <div className="notification-list-card">
          {loading ? (
            <div className="notification-state-msg">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="notification-state-msg error-msg">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="notification-state-msg">
              No new notifications recorded yet.
            </div>
          ) : (
            notifications.map((notif, index) => {
              const isUnread =
                notif.isRead === false || notif.status === "unread";

              return (
                <div
                  key={notif.id || notif._id || index}
                  className={`notification-item ${isUnread ? "unread-item" : ""}`}
                >
                  <div className="notif-left-block">
                    {renderNotificationBadge(notif.type || notif.category)}

                    <div className="notif-text-stack">
                      <h3 className="notif-title">
                        {notif.title || "Notification Alert"}
                      </h3>
                      <p className="notif-message">
                        {notif.message ||
                          notif.description ||
                          "No description text provided."}
                      </p>
                      <span className="notif-timestamp">
                        {notif.timestamp
                          ? timeAgo(notif.timestamp)
                          : notif.createdAt
                            ? timeAgo(notif.createdAt)
                            : "Just now"}
                      </span>
                    </div>
                  </div>
                  {isUnread && <span className="unread-dot"></span>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Notification;
