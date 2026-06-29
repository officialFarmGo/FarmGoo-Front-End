import React, { useEffect, useState } from "react";
import "../CSS/Notification.css";
import { useSelector } from "react-redux";

// Helper function to return icons based on notification type
const getIconByType = (type) => {
  if (type === "payment") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    );
  }
  if (type === "delivery") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    );
  }
  // fallback / weather / alert
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
};

// Helper function to format timestamp relative text
const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Notification = () => {
  const token = useSelector((state) => state.auth.token);
  const reduxRole = useSelector((state) => state.auth.user?.role || state.auth.role);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUserRole = () => {
    // Always decode the JWT token first — it's the authoritative source of the user's role
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
        );
        const jwtRole = JSON.parse(jsonPayload).role?.toLowerCase();
        if (jwtRole) return jwtRole;
      } catch (e) {
        // fall through to reduxRole fallback
      }
    }
    // Fallback to Redux state if JWT decoding fails
    if (reduxRole) return reduxRole.toLowerCase();
    return "farmer";
  };

  const fetchNotifications = async () => {
    const role = getUserRole();
    let targetEndpoint;
    if (role === "agent") {
      targetEndpoint = `${BaseUrl}/notifications/agentNotification`;
    } else if (role === "driver") {
      targetEndpoint = `${BaseUrl}/notifications/getDriversNotification`;
    } else {
      targetEndpoint = `${BaseUrl}/notifications/farmerNotification`;
    }

    try {
      setLoading(true);
      const res = await fetch(targetEndpoint, {
        headers: { accept: "*/*", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setNotifications(data.data.notifications || []);
        setUnreadCount(data.data.unreadCount || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchNotifications();
  }, [token, reduxRole, BaseUrl]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleSingleMarkRead = async (notificationId, currentlyRead) => {
    if (currentlyRead) return;

    // Instant Frontend Update for single click
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      // Optional: Add backend endpoint link here if your API supports tracking single item read states
    } catch (err) {
      console.error("Failed to sync single notification status to database", err);
    }
  };

  if (loading) {
    return (
      <div className="notif-loading">
        <div className="notif-spinner" />
      </div>
    );
  }

  return (
    <section className="notification-section">
      <div className="notification-container">

        <div className="notification-header">
          <div className="notif-title-group">
            <h1 className="notification-page-title">Notifications</h1>
            {unreadCount > 0 && (
              <span className="unread-count-badge">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              className="mark-all-btn"
              onClick={handleMarkAllRead}
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="notification-list-card">
          {notifications.length === 0 ? (
            <div className="notif-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`notification-item${!notif.isRead ? " unread-item" : ""}`}
                onClick={() => handleSingleMarkRead(notif._id, notif.isRead)}
                style={{ cursor: !notif.isRead ? "pointer" : "default" }}
              >
                <div className="notif-left-block">
                  <div className={`notif-badge badge-${notif.type}`}>
                    {getIconByType(notif.type)}
                  </div>
                  <div className="notif-text-stack">
                    <h3 className="notif-title">{notif.title}</h3>
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-timestamp">{timeAgo(notif.createdAt)}</span>
                  </div>
                </div>
                {!notif.isRead && <span className="unread-dot" />}
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Notification;