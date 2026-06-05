import React from 'react';
import "../CSS/AgentNotification.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FaTruck, FaDollarSign } from "react-icons/fa6";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const AgentNotification = () => {
  const notifications = [
    {
      id: 1,
      type: "driver-accepted",
      icon: <FaTruck className="notif-icon-svg text-blue" />,
      title: "Driver Accepted Request",
      description: "Adebayo Balogun accepted the transport request for Chukwu Farms",
      time: "10 minutes ago",
      unread: true,
      iconBg: "bg-light-blue"
    },
    {
      id: 2,
      type: "payment-released",
      icon: <FaDollarSign className="notif-icon-svg text-green" />,
      title: "Payment Released",
      description: "Your commission of ₦8,500 has been released",
      time: "2 hours ago",
      unread: true,
      iconBg: "bg-light-green"
    },
    {
      id: 3,
      type: "delivery-completed",
      icon: <FiCheckCircle className="notif-icon-svg text-emerald" />,
      title: "Delivery Completed",
      description: "Yam delivery from Badagry Market has been completed successfully",
      time: "5 hours ago",
      unread: false,
      iconBg: "bg-light-emerald"
    },
    {
      id: 4,
      type: "weather-alert",
      icon: <FiAlertTriangle className="notif-icon-svg text-amber" />,
      title: "Weather Alert",
      description: "Heavy rain expected in Lagos area today. Inform your farmers.",
      time: "1 day ago",
      unread: false,
      iconBg: "bg-light-amber"
    },
    {
      id: 5,
      type: "new-request",
      icon: <FaTruck className="notif-icon-svg text-blue" />,
      title: "New Transport Request",
      description: "Eze Oil Ltd needs transport for 200L Palm Oil",
      time: "2 days ago",
      unread: false,
      iconBg: "bg-light-blue"
    }
  ];

  return (
    <div className="agent-notifications-container">
      <div className="back-to-dashboard-btn">
        <ArrowLeftOutlined className="back-arrow-icon" />
        <span>Back to Dashboard</span>
      </div>

      <div className="notif-header-row">
        <div className="notif-title-section">
          <h1>Notifications</h1>
          <p>You have <span className="bold-count">2 unread notifications</span></p>
        </div>
        <button type="button" className="mark-all-read-btn">
          Mark All as Read
        </button>
      </div>

      <div className="notifications-list-wrapper">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`notif-card ${notif.unread ? "unread-border" : "normal-border"}`}
          >
            <div className={`notif-icon-circle ${notif.iconBg}`}>
              {notif.icon}
            </div>
            
            <div className="notif-content-block">
              <h3>{notif.title}</h3>
              <p className="notif-desc">{notif.description}</p>
              <span className="notif-timestamp">{notif.time}</span>
            </div>

            {notif.unread && <div className="unread-dot-indicator"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentNotification;