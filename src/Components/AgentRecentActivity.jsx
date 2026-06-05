import React from "react";
import { 
  CarOutlined, 
  UsergroupAddOutlined 
} from "@ant-design/icons";
import "../CSS/AgentRecentActivity.css";

const AgentRecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "Delivery Completed",
      subtitle: "Tomatoes - Jos to Lagos",
      time: "2 hours ago",
      icon: <CarOutlined style={{ fontSize: "18px", color: "#16a34a" }} />,
      iconClass: "fg-activity-icon-car"
    },
    {
      id: 2,
      title: "New Farmer Added",
      subtitle: "Chukwu Farms",
      time: "5 hours ago",
      icon: <UsergroupAddOutlined style={{ fontSize: "18px", color: "#2563eb" }} />,
      iconClass: "fg-activity-icon-user"
    },
    {
      id: 3,
      title: "Transport Request Created",
      subtitle: "Cassava - Ogun to Lagos",
      time: "1 day ago",
      icon: <UsergroupAddOutlined style={{ fontSize: "18px", color: "#2563eb" }} />,
      iconClass: "fg-activity-icon-user"
    }
  ];

  return (
    <div className="fg-recent-activity-container">
      <h3 className="fg-recent-activity-heading">Recent Activity</h3>
      <div className="fg-recent-activity-card">
        {activities.map((activity, index) => (
          <div key={activity.id} className="fg-activity-item-wrapper">
            <div className="fg-activity-item">
              <div className={`fg-activity-icon-box ${activity.iconClass}`}>
                {activity.icon}
              </div>
              <div className="fg-activity-details">
                <span className="fg-activity-title">{activity.title}</span>
                <span className="fg-activity-subtitle">{activity.subtitle}</span>
                <span className="fg-activity-time">{activity.time}</span>
              </div>
            </div>
            {index < activities.length - 1 && <hr className="fg-activity-divider" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentRecentActivity;