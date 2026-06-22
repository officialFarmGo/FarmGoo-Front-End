import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AgentDashBoardHeader from "../AgentDashBoardHeader";
import AgentQuickActions from "../AgentQuickActions";
import AgentRecentActivity from "../AgentRecentActivity";
import AgentFarmersList from "../AgentFarmersList";
import AgentAddFarmer from "../AgentAddFarmer"; 
import AgentCreateRequest from "../AgentCreateRequest"; // Import the delivery creation component

const AgentDashBoard = () => {
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;

  // Track state strings dynamically: "dashboard" | "farmers" | "add-farmer" | "create-request"
  const [currentView, setCurrentView] = useState("dashboard"); 
  
  // Dynamic state to hold details of a farmer when transitioning from the list view
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const [dashboardData, setDashboardData] = useState({
    greeting: "",
    stats: {
      farmersManaged: 0,
      inProgress: 0,
      completedThisMonth: 0,
      totalSpentThisMonth: 0,
    },
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to refresh numbers whenever updates happen
  const fetchFarmersOverview = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}/agentDashboard/agentsFarmersOverview`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.data?.stats) {
        setDashboardData(prev => ({
          ...prev,
          stats: {
            ...prev.stats,
            farmersManaged: response.data.data.stats.totalFarmers,
            totalSpentThisMonth: response.data.data.stats.totalAmountSpent,
          }
        }));
      }
    } catch (err) {
      console.error("Failed to fetch farmers overview:", err);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/agentDashboard/agentBoard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.data) {
          setDashboardData(prev => ({
            ...prev,
            greeting: response.data.data.greeting,
            recentActivity: response.data.data.recentActivity || [],
            stats: {
              ...prev.stats,
              inProgress: response.data.data.stats?.inProgress || 0,
              completedThisMonth: response.data.data.stats?.completedThisMonth || 0,
            }
          }));
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDashboardData();
  }, [token, BaseUrl]);

  useEffect(() => {
    if (token) fetchFarmersOverview();
  }, [token, BaseUrl]);

  // Unified inline state router functions
  const handleFarmersClick = () => {
    setSelectedFarmer(null);
    setCurrentView("farmers");
  };
  
  const handleAddFarmerClick = () => setCurrentView("add-farmer");
  
  const handleBackToDashboard = () => {
    setSelectedFarmer(null);
    setCurrentView("dashboard");
  };

  // Triggers when "Create Delivery" or "Create Request" is clicked on a Farmer profile card/row
  const handleCreateDeliveryClick = (farmerData) => {
    setSelectedFarmer(farmerData); // Stash the selected farmer data into state 
    setCurrentView("create-request"); // Route view to the form inside the dashboard
  };

  const handleFarmerAddedSuccess = () => {
    fetchFarmersOverview(); // update stats total metrics
    setCurrentView("farmers"); // kick view straight to list wrapper smoothly
  };

  const handleDeliveryCreatedSuccess = () => {
    // Refresh stats if necessary (e.g. tracking transport requests 'inProgress')
    if (token) fetchDashboardData(); 
    setCurrentView("dashboard"); // Send them back home or to deliveries log
  };

  if (loading) return <div className="loading-spinner">Loading dashboard...</div>;
  if (error) return <div className="error-banner">Error: {error}</div>;

  return (
    <div className="fg-dashboard-layout-content">
      {/* Structural view routing handling content body while layout stays untouched */}
      
      {/* VIEW 1: REGISTER NEW FARMER */}
      {currentView === "add-farmer" && (
        <AgentAddFarmer 
          onBackClick={handleBackToDashboard}
          onFarmerAddedSuccessfully={handleFarmerAddedSuccess}
          onCreateDeliveryClick={handleCreateDeliveryClick} 
        />
      )}

      {/* VIEW 2: FARM MANAGEMENT LIST */}
      {currentView === "farmers" && (
        <AgentFarmersList 
          onBackClick={handleBackToDashboard} 
          onAddFarmerClick={handleAddFarmerClick}
          onCreateDeliveryClick={handleCreateDeliveryClick} // Intercept button clicks to stay inline!
        />
      )}

      {/* VIEW 3: DYNAMIC CREATE TRANSPORT LOG (Nested Flow) */}
      {currentView === "create-request" && (
        <AgentCreateRequest 
          preselectedFarmer={selectedFarmer}
          onBackClick={() => setCurrentView("farmers")} // Take them back to list on exit
          onViewDeliveriesClick={handleDeliveryCreatedSuccess}
        />
      )}

      {/* VIEW 4: MAIN DASHBOARD HOMEPAGE LANDING */}
      {currentView === "dashboard" && (
        <>
          <AgentDashBoardHeader
            greeting={dashboardData.greeting}
            stats={dashboardData.stats}
            onFarmersClick={handleFarmersClick}
          />
          <AgentQuickActions 
            onAddFarmer={handleAddFarmerClick} 
            onCreateRequest={() => handleCreateDeliveryClick(null)} // Blank transport setup
          />
          <AgentRecentActivity activities={dashboardData.recentActivity} />
        </>
      )}
    </div>
  );
};

export default AgentDashBoard;