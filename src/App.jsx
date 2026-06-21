import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPageComponents from "./Components/UI/LandingPageComponents";
import LoginPage from "./Pages/Auth/LoginPage";
import SignupPage from "./Pages/Auth/SignPage";
import DashboardPagesComponent from "./Components/UI/DashboardPagesComponent";
import VerificationOtp from "./Pages/Auth/VerificationOtp";
import SuccessFullVerification from "./Pages/Auth/SuccessFullVerification";
import FarmersDahboard from "./Pages/FarmerDahboard/Dashboard";
import DriverDashboard from "./Pages/DriverDashBoard/DashBoard";
import AgentDashboard from "./Pages/AgentDasboard/DashBoard";
import AgentDashBoardView from "./Components/UI/AgentDashBoard"; // Fixed name clash
import Wallet from "./Components/Wallet";
import ProfileSettingsDashboard from "./Components/ProfileSettingsDashboard";
import ActiveDeliveryPageComponets from "./Components/UI/ActiveDeliveryPageComponets";
import DashboardRedirect from "./Data/DashboardRedirect";
import DriverDashboardView from "./Components/UI/DriverDashboardView";
import Info from "./Pages/Auth/Info";
import Notification from "./Components/Notification";
import FarmerProfile from "./Pages/Auth/FarmerProfile";
import FarmerHelpAndSupport from "./Components/UI/FarmerHelpAndSupport";
import DriverWellet from "./Components/UI/DriverWellet";
import EarningsDrivers from "./Components/UI/EarningsDrivers";
import Profile from "./Components/UI/Profile";
import AgentProfileSettings from "./Components/AgentProfilesetting";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import RequestTransport from "./Components/RequestTransport";
import DriverKycVerification from "./Components/DriverKycVerification";
import VerificationPending from "./Components/VerificationPending";
import ApprovedDoc from "./Components/ApprovedDoc";
import DriverActiveDeliveries from "./Components/DriverActiveDeliveries";
import DriverJobDetails from "./Components/DriverJobDetails";
import PrivateRoute from "./Props/PrivateRoute";
import NotFound from "./Components/NotFound";
import MyFarmersNum from "./Components/MyFarmersNum";
import FarmName from "./Components/FarmName";
import AddFarm from "./Components/AddFarm";
import TransportRequest from "./Components/TransportRequest";
import NewFarm from "./Components/NewFarm";
import DeliveryTrack from "./Components/DeliveryTrack";
import WithDrawFunds from "./Components/WithDrawFunds";
import FundWellet from "./Components/FundWellet";
import Transport from "./Components/UI/Transport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPageComponents />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<VerificationOtp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/chooseDash" element={<Info />} />
        <Route path="/success" element={<SuccessFullVerification />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/farmer_kyc/:farmId" element={<FarmerProfile />} />
        <Route
          path="/driver_kyc/:driverId"
          element={<DriverKycVerification />}
        />
        <Route path="/driverpending" element={<VerificationPending />} />
        <Route path="/approved" element={<ApprovedDoc />} />

        {/* ================= FARMER DASHBOARD ================= */}
        <Route
          path="/farmer/dashboard"
          element={
            <PrivateRoute>
              <FarmersDahboard />
            </PrivateRoute>
          }
        >
          {/* Note: No leading slashes for sub-routes */}
          <Route index element={<DashboardPagesComponent />} />
          <Route path="request" element={<RequestTransport />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<ProfileSettingsDashboard />} />
          <Route
            path="activedelivery"
            element={<ActiveDeliveryPageComponets />}
          />
          <Route path="help-support" element={<FarmerHelpAndSupport />} />
        </Route>

        {/* ================= AGENT DASHBOARD ================= */}
        <Route
          path="/agent/dashboard"
          element={
            <PrivateRoute>
              <AgentDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<AgentDashBoardView />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="withDrawFunds" element={<WithDrawFunds />} />
          <Route path="FundWellet" element={<FundWellet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<AgentProfileSettings />} />
          <Route
            path="activedelivery"
            element={<ActiveDeliveryPageComponets />}
          />
          <Route path="help-support" element={<FarmerHelpAndSupport />} />
          <Route path="MyFarmersNum" element={<MyFarmersNum />} />
          <Route path="farmName" element={<FarmName />} />
          <Route path="deliverytrack" element={<DeliveryTrack />} />
          <Route path="AddFarm" element={<AddFarm />} />
          <Route path="TransportRequest" element={<TransportRequest />} />
          <Route path="NewFarm" element={<NewFarm />} />
        </Route>

        {/* ================= DRIVER DASHBOARD ================= */}
        <Route
          path="/drivers/dashboard"
          element={
            <PrivateRoute>
              <DriverDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DriverDashboardView />} />
          <Route path="activedelivery" element={<DriverActiveDeliveries />} />
          <Route path="wallet" element={<DriverWellet />} />
          <Route path="jobss" element={<Transport />} />
          <Route path="earnings" element={<EarningsDrivers />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="trackdelivery/:id"
            element={<DriverActiveDeliveries />}
          />
          <Route path="job-details" element={<DriverJobDetails />} />
        </Route>

        {/* Redirects */}
        <Route
          path="/withDrawFunds"
          element={<Navigate to="/agent/dashboard/withDrawFunds" replace />}
        />
        <Route
          path="/withdraw-funds"
          element={<Navigate to="/agent/dashboard/withDrawFunds" replace />}
        />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
