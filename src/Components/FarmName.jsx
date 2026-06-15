import React from "react";
import { MdPhone, MdLocationOn, MdPeople } from "react-icons/md";
import { GiTomato } from "react-icons/gi";
import "../CSS/FarmName.css";
import { Link } from "react-router-dom";

const FarmName = ({ dashboardData }) => {
  // Use the farmers array from the API response data, fallback to empty array if null
  const farms = dashboardData?.farmers || [];

  // Helper function to format dates nicely if your backend returns a timestamp or ISO string
  const formatJoinedDate = (dateString) => {
    if (!dateString) return "Joined recently";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
  };

  if (farms.length === 0) {
    return (
      <div
        className="farms-list-container"
        style={{ textAlign: "center", padding: "40px", color: "#667085" }}
      >
        <p>No farmers found. Add a new farmer to get started.</p>
      </div>
    );
  }

  return (
    <div className="farms-list-container">
      {farms.map((farm) => (
        <div key={farm._id || farm.id} className="farm-card">
          <div className="card-left-section">
            <div className="avatar-circle">
              {(farm.farmerName || farm.name || "F").charAt(0).toUpperCase()}
            </div>

            <div className="farm-details">
              <h3 className="farm-title">
                {farm.farmerFullName || farm.name || "Unknown Farmer"}
              </h3>

              <div className="details-grid">
                <div className="detail-item">
                  <MdPhone className="react-icon" />
                  <span className="text">
                    {farm.phoneNumber || farm.phone || "No Phone"}
                  </span>
                </div>
                <div className="detail-item">
                  <MdLocationOn className="react-icon" />
                  <span className="text">
                    {farm.farmLocation || farm.location || "No Location"}
                  </span>
                </div>
                <div className="detail-item">
                  <GiTomato className="react-icon" />
                  <span className="text">
                    {farm.produceType || farm.produce || "Not Specified"}
                  </span>
                </div>
                <div className="detail-item">
                  <MdPeople className="react-icon" />
                  <span className="text">
                    {farm.deliveriesCount ?? farm.deliveries ?? 0} deliveries
                  </span>
                </div>
              </div>

              <p className="joined-date">
                {farm.joinedDate
                  ? formatJoinedDate(farm.joinedDate)
                  : farm.joined || "Joined recently"}
              </p>
            </div>
          </div>

          <div className="card-right-section">
            <Link
              style={{ textDecoration: "none" }}
              to="/agent/dashboard/TransportRequest"
              state={{
                farmerId: farm._id || farm.id,
                farmerName: farm.farmerName || farm.name,
              }}
            >
              <button className="request-btn">Create Request</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarmName;
