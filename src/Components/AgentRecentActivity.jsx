import React from "react";
import { 
  UserAddOutlined, 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined 
} from "@ant-design/icons";
import "../CSS/AgentRecentActivity.css";

const AgentRecentActivity = ({ activities }) => {
  // Helper function to return the correct icon based on your backend "type"
  const getActivityIcon = (type) => {
    switch (type) {
      case "New Farmer Added":
        return <UserAddOutlined style={{ color: "#15803d" }} />;
      case "Transport Request Created":
        return <FileTextOutlined style={{ color: "#2563eb" }} />;
      case "Delivery Completed":
        return <CheckCircleOutlined style={{ color: "#16a34a" }} />;
      default:
        return <ClockCircleOutlined style={{ color: "#4b5563" }} />;
    }
  };

  // Helper function to format the ISO timestamp cleanly
  const formatActivityDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fg-recent-activity-container">
      <h3 className="fg-recent-activity-heading">Recent Activity</h3>
      
      <div className="fg-activity-list">
        {!activities || activities.length === 0 ? (
          <p className="fg-empty-activity">No recent activity logs available.</p>
        ) : (
          activities.map((activity, index) => (
            <div key={activity._id || index} className="fg-activity-item">
              {/* Left Side: Icon circle wrapper */}
              <div className="fg-activity-icon-wrapper">
                {getActivityIcon(activity.type)}
              </div>

              {/* Right Side: Content info blocks mapping your exact API keys */}
              <div className="fg-activity-content">
                <div className="fg-activity-text-row">
                  <span className="fg-activity-type">{activity.type} </span>
                  <span className="fg-activity-title">{activity.title} </span>
                </div>
                <span className="fg-activity-time">
                  {formatActivityDate(activity.date)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AgentRecentActivity;