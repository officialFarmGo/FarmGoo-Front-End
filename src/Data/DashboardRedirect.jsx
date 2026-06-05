import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const DashboardRedirect = () => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "farmer") {
    return <Navigate to="/farmer/dashboard" replace />;
  }

  if (userRole === "driver") {
    return <Navigate to="/drivers/dashboard" replace />;
  }

  if (userRole === "agent") {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default DashboardRedirect;