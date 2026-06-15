import React, { useState, useEffect } from "react";
import axios from "axios";
import ActiveDeliveryNotification from "../ActiveDeliveryNotification";
import ActiveDeliveryHeader from "../ActiveDeliveryHeader";

const ActiveDeliveryPageComponets = () => {
  const [dashboardData, setDashboardData] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    inTransit: 0,
    delivered: 0,
  });

  const getAllDeliveries = async () => {
    const BASE_URL = import.meta.env.VITE_BaseUrl;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${BASE_URL}/agentDashboard/getAlldeliveries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

  return (
    <div>
      {/* Passing the state data cleanly down as props */}
      <ActiveDeliveryHeader dashboardData={dashboardData} />
      <ActiveDeliveryNotification dashboardData={dashboardData} />
    </div>
  );
};

export default ActiveDeliveryPageComponets;
