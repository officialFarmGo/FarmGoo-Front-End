import React from "react";
import "./App.css";

import AgentDashBoard from "./Components/UI/AgentDashBoard";
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
import Wallet from "./Components/Wallet";
import NotificationPreferences from "./Components/NotificationPreferences";
import ProfileSettingsDashboard from "./Components/ProfileSettingsDashboard";
import ActiveDeliveryPageComponets from "./Components/UI/ActiveDeliveryPageComponets";
import DashboardRedirect from "./Data/DashboardRedirect";
import DriverDashboardView from "./Components/UI/DriverDashboardView";
import Info from "./Pages/Auth/Info";
import Notification from "./Components/Notification";
import FarmerProfile from "./Pages/Auth/FarmerProfile";
import FarmerHelpAndSupport from "./Components/UI/FarmerHelpAndSupport";
import DriverWellet from "./Components/UI/DriverWellet";
import ActiveDrivesDrivers from "./Components/UI/ActiveDrivesDrivers";
import DriverNotification from "./Components/UI/DriverNotification";
import DriverActiveDelivery from "./Components/DriverActiveDelivery";
import Transport from "./Components/UI/Transport";
import EarningsDrivers from "./Components/UI/EarningsDrivers";
import Profile from "./Components/UI/Profile";
import AgentProfileSettings from "./Components/AgentProfilesetting";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import RequestTransport from "./Components/RequestTransport";
import MyFarmersNum from "./Components/MyFarmersNum";
import FarmName from "./Components/FarmName";
import AddFarm from "./Components/AddFarm";
import TransportRequest from "./Components/TransportRequest";
import NewFarm from "./Components/NewFarm";
import DeliveryTrack from "./Components/DeliveryTrack";
import WithDrawFunds from "./Components/WithDrawFunds";
import FundWellet from "./Components/FundWellet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageComponents />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<VerificationOtp />} />
        <Route path="/chooseDash" element={<Info />} />
        <Route path="/success" element={<SuccessFullVerification />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/farmer-kyc" element={<FarmerProfile />} />
        <Route path="request" element={<RequestTransport />} />

        <Route path="/farmer/dashboard" element={<FarmersDahboard />}>
          <Route path="" element={<DashboardPagesComponent />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<ProfileSettingsDashboard />} />
          <Route
            path="activedelivery"
            element={<ActiveDeliveryPageComponets />}
          />
          <Route path="help&support" element={<FarmerHelpAndSupport />} />
        </Route>

        <Route path="/agent/dashboard" element={<AgentDashboard />}>
          <Route path="" element={<AgentDashBoard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="withDrawFunds" element={<WithDrawFunds />} />
          <Route path="FundWellet" element={<FundWellet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<AgentProfileSettings />} />
          <Route
            path="activedelivery"
            element={<ActiveDeliveryPageComponets />}
          />
          <Route path="help&support" element={<FarmerHelpAndSupport />} />
          <Route path="MyFarmersNum" element={<MyFarmersNum />} />
          <Route path="farmName" element={<FarmName />} />
          <Route path="deliverytrack" element={<DeliveryTrack />} />
          <Route path="AddFarm" element={<AddFarm />} />
          <Route path="TransportRequest" element={<TransportRequest />} />
          <Route path="NewFarm" element={<NewFarm />} />
        </Route>

        <Route
          path="/withDrawFunds"
          element={<Navigate to="/agent/dashboard/withDrawFunds" replace />}
        />
        <Route
          path="/withdraw-funds"
          element={<Navigate to="/agent/dashboard/withDrawFunds" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/drivers/dashboard" element={<DriverDashboard />}>
          <Route path="" element={<DriverDashboardView />} />
          <Route path="activedelivery" element={<DriverActiveDelivery />} />
          <Route path="wallet" element={<DriverWellet />} />
          <Route path="jobss" element={<Transport />} />
          <Route path="earnings" element={<EarningsDrivers />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
