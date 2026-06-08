import React from "react";
import "../CSS/MainNotification.css";

const MainNotification = () => {
  const notificationsData = [
    {
      id: 1,
      type: "payment",
      title: "Payment Released",
      description: "₦65,000 has been released from escrow for Delivery #DEL098",
      time: "5 minutes ago",
      isUnread: true,
    },
    {
      id: 2,
      type: "transport",
      title: "New Transport Request",
      description:
        "A new job is available 8km from your location - Palm Oil delivery to Lagos",
      time: "15 minutes ago",
      isUnread: true,
    },
    {
      id: 3,
      type: "completed",
      title: "Delivery Completed",
      description: "Delivery #DEL098 has been successfully completed",
      time: "2 hours ago",
      isUnread: false,
    },
    {
      id: 4,
      type: "weather",
      title: "Weather Alert",
      description:
        "Heavy traffic expected on your delivery route. Plan accordingly.",
      time: "5 hours ago",
      isUnread: false,
    },
    {
      id: 5,
      type: "message",
      title: "New Message from Farmer",
      description: "Jos Farms Ltd: Please confirm your arrival time",
      time: "Yesterday",
      isUnread: false,
    },
    {
      id: 6,
      type: "accepted",
      title: "Job Accepted",
      description: "You have successfully accepted Delivery #DEL001",
      time: "Yesterday",
      isUnread: false,
    },
    {
      id: 7,
      type: "maintenance",
      title: "System Maintenance",
      description: "Scheduled maintenance on May 25th from 2:00 AM - 4:00 AM",
      time: "2 days ago",
      isUnread: false,
    },
  ];

  // Render helpers to pick correct SVG icon and circle style color class
  const getIconConfig = (type) => {
    switch (type) {
      case "payment":
        return {
          bgClass: "bg-light-green",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00b050"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          ),
        };
      case "transport":
        return {
          bgClass: "bg-light-blue",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0055ff"
              strokeWidth="2"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          ),
        };
      case "completed":
      case "accepted":
        return {
          bgClass: "bg-light-green",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00b050"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ),
        };
      case "weather":
        return {
          bgClass: "bg-light-yellow",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e2a100"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          ),
        };
      case "message":
        return {
          bgClass: "bg-light-blue",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0055ff"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          ),
        };
      default: // System Maintenance or general status alert
        return {
          bgClass: "bg-light-gray",
          svg: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          ),
        };
    }
  };

  return (
    <div className="Main-Notification-Page">
      {/* Notifications Layout Title Block */}
      <div className="notification-page-header">
        <div className="title-area">
          <h2>Notifications</h2>
          <p>Stay updated with your deliveries, payments, and system alerts</p>
        </div>
        <button className="mark-all-btn">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Mark All as Read
        </button>
      </div>

      {/* Main Structural Notifications Flex Vertical Stack */}
      <div className="notifications-stack-list">
        {notificationsData.map((item) => {
          const iconConfig = getIconConfig(item.type);

          return (
            <div
              key={item.id}
              className={`notification-item-row ${item.isUnread ? "unread-active" : ""}`}
            >
              {/* Left Column Area: Action Circle Icon wrapper */}
              <div className={`notification-icon-circle ${iconConfig.bgClass}`}>
                {iconConfig.svg}
              </div>

              {/* Center Column Area: Descriptive Alert Texts */}
              <div className="notification-content-block">
                <h4>{item.title}</h4>
                <p className="notification-desc">{item.description}</p>
                <span className="notification-time-stamp">{item.time}</span>
              </div>

              {/* Right Column Area: Unread tracking dot status */}
              {item.isUnread && <div className="unread-dot-indicator"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainNotification;
