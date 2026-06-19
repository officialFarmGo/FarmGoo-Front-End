import React from "react";
import AvailableJobsAndWidgets from "../AvailableJobsAndWidgets";
import ActiveDeliveriesList from "../ActiveDeliveriesList";
import DriverMetricsGrid from "../DriverMetricsGrid";
import DriverWelcomeBanner from "../DriverWelcomeBanner";
import TransportJob from "../TotalJobs";

const DriverDashboardView = () => {
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", paddingBottom: "40px" }}>
      <DriverWelcomeBanner/>
      <DriverMetricsGrid />
      
      {/* <ActiveDeliveriesList /> */}
      {/* <TransportJob/> */}
      <AvailableJobsAndWidgets />
    </div>
  );
};

export default DriverDashboardView;