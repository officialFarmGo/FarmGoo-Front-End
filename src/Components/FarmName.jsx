import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdPhone, MdLocationOn, MdPeople } from "react-icons/md";
import { PiPlantThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import "../CSS/FarmName.css";

const FarmName = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmersOverview = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/agent/getFarmersUnderAgent",
        );
        setFarmers(response.data?.farmers || []);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFarmersOverview();
  }, []);

  const formatJoinedDate = (dateString) => {
    if (!dateString) return "Joined recently";
    const date = new Date(dateString);
    return `Joined ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <div
        className="farms-list-container"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <p>Loading farmers data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="farms-list-container"
        style={{ textAlign: "center", padding: "40px", color: "#d92d20" }}
      >
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  if (farmers.length === 0) {
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
      {farmers.map((farm) => {
        const displayName =
          farm.farmerFullName ||
          farm.farmerName ||
          farm.name ||
          "Unknown Farmer";

        return (
          <div key={farm._id || farm.id} className="farm-card">
            <div className="card-left-section">
              <div className="avatar-circle">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div className="farm-details">
                <h3 className="farm-title">{displayName}</h3>

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
                    <PiPlantThin className="react-icon" />
                    <span className="text">
                      {farm.produceType || farm.produce || "Not Specified"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <MdPeople className="react-icon" />
                    <span className="text">
                      {farm.deliveryCount ?? farm.deliveriesCount ?? 0}{" "}
                      deliveries
                    </span>
                  </div>
                </div>

                <p className="joined-date">
                  {farm.joinedDate
                    ? formatJoinedDate(farm.joinedDate)
                    : "Joined recently"}
                </p>
              </div>
            </div>

            <div className="card-right-section">
              <Link
                style={{ textDecoration: "none" }}
                to="/agent/dashboard/TransportRequest"
                state={{
                  farmerId: farm._id || farm.id,
                  farmerName: displayName,
                }}
              >
                <button className="request-btn">Create Request</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FarmName;
