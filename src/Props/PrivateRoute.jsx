import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  
  const auth = useSelector((state) => state.auth || {});
  const token = auth.token;
  const user = auth.user || null;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role?.toLowerCase())) {
    return <Navigate to={user.role === "driver" ? "/driverKyc" : "/farmer_kyc"} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;