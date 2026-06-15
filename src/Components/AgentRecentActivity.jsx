import React from "react";
import {
  CarOutlined,
  UsergroupAddOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "../CSS/AgentRecentActivity.css";

const AgentRecentActivity = ({ dashboardData }) => {
  const rawActivities = dashboardData?.recentActivity || [];

  const getIconAndClass = (type) => {
    switch (type?.toLowerCase()) {
      case "delivery":
      case "transport":
        return {
          icon: <CarOutlined style={{ fontSize: "18px", color: "#16a34a" }} />,
          iconClass: "fg-activity-icon-car",
        };
      case "farmer":
      case "user":
        return {
          icon: (
            <UsergroupAddOutlined
              style={{ fontSize: "18px", color: "#2563eb" }}
            />
          ),
          iconClass: "fg-activity-icon-user",
        };
      default:
        return {
          icon: (
            <InfoCircleOutlined
              style={{ fontSize: "18px", color: "#a855f7" }}
            />
          ),
          iconClass: "fg-activity-icon-default",
        };
    }
  };

  const activities = rawActivities.map((activity, index) => {
    const visualProps = getIconAndClass(activity.type);
    return {
      id: activity.id || activity._id || index,
      title: activity.title || "Activity Update",
      subtitle: activity.subtitle || "",
      time: activity.time || "",
      ...visualProps,
    };
  });

  return (
    <div className="fg-recent-activity-container">
      <h3 className="fg-recent-activity-heading">Recent Activity</h3>
      <div className="fg-recent-activity-card">
        {activities.length === 0 ? (
          <div className="fg-no-activity">No recent activity found</div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id} className="fg-activity-item-wrapper">
              <div className="fg-activity-item">
                <div className={`fg-activity-icon-box ${activity.iconClass}`}>
                  {activity.icon}
                </div>
                <div className="fg-activity-details">
                  <span className="fg-activity-title">{activity.title}</span>
                  <span className="fg-activity-subtitle">
                    {activity.subtitle}
                  </span>
                  <span className="fg-activity-time">{activity.time}</span>
                </div>
              </div>
              {index < activities.length - 1 && (
                <hr className="fg-activity-divider" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentRecentActivity;
