import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AgentDashBoardHeader from "../AgentDashBoardHeader";
import AgentQuickActions from "../AgentQuickActions";
import AgentRecentActivity from "../AgentRecentActivity";

const AgentDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({
    summary: {},
    recentActivities: [],
  });

  const BASE_URL = import.meta.env.VITE_BaseUrl;
  const token = localStorage.getItem("token");

  // 2. Fetch the data when the page loads
  const getDashboardData = async () => {
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
      console.error("Error fetching agent dashboard metrics:", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div>
      <AgentDashBoardHeader dashboardData={dashboardData} />
      <AgentQuickActions />
      <AgentRecentActivity dashboardData={dashboardData} />
    </div>
  );
};

export default AgentDashBoard;
