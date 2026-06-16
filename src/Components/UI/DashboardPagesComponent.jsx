import React, { useEffect, useState } from "react";
import DashboardHeader from "../../Components/DashboardHeader";
import WeatherAlert from "../../Components/WeatherAlert";
import ActiveDeliveries from "../../Components/ActiveDeliveries";
import { apiInstance } from "../../Api/Api";
import MarketSectionHolder from "./MarketSectionHolder";
import { useSelector } from "react-redux";
import axios from "axios";

const DashboardPagesComponent = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const BaseUrl = import.meta.env.VITE_BaseUrl;


  // const user = useSelector((state) => state.auth.user);

    useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${BaseUrl}/farmerDash/farmDash`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response", response);
        setApiResponse(response.data.data);
        setLoading(false);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
