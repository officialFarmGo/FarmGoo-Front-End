import React, { useEffect, useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import WeatherAlert from "../../Components/WeatherAlert";
import ActiveDeliveries from "../../Components/ActiveDeliveries";
import { apiInstance } from "../../Api/Api";
import MarketSectionHolder from "./MarketSectionHolder";

const DashboardPagesComponent = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const FetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get("/farmerDash/farmDash");
      setApiResponse(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #006432",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader data={apiResponse?.stats} />
      {apiResponse?.weatherAlert?.hasAlert && <WeatherAlert />}
      <ActiveDeliveries data={apiResponse?.activeDeliveries} />
      <MarketSectionHolder
        marketTips={apiResponse?.marketTips}
        recentDeliveries={apiResponse?.recentDeliveries}
      />
    </div>
  );
};

export default DashboardPagesComponent;
