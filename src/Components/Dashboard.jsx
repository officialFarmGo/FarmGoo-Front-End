import React from "react";
import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#042920", margin: "0 0 8px 0" }}>
          Welcome back!
        </h2>
        <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
          Overview of your active supply chain and trip stats.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;