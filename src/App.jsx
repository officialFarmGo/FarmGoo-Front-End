import React from "react";
import "./App.css";

import AgentDashBoard from "./Components/UI/AgentDashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import DriverKycVerification from "./Components/DriverKycVerification";
import VerificationPending from "./Components/VerificationPending";
import ApprovedDoc from "./Components/ApprovedDoc";
import DriverActiveDeliveries from "./Components/DriverActiveDeliveries";
import AvailableJobsAndWidgets from "./Components/AvailableJobsAndWidgets";
import DriverJobDetails from "./Components/DriverJobDetails";
import PrivateRoute from "./Props/PrivateRoute";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />}/>
        <Route path="/" element={<LandingPageComponents />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<VerificationOtp />} />
        <Route path="/chooseDash" element={<Info />} />
        <Route path="/success" element={<SuccessFullVerification />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/farmer_kyc/:farmId" element={<FarmerProfile />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/driver_kyc/:driverId" element={<DriverKycVerification />} />
        <Route path="driverpending" element={<VerificationPending />} />
        <Route path="/approved" element={<ApprovedDoc />} />

        <Route
          path="/farmer/dashboard"
          element={<PrivateRoute><FarmersDahboard /></PrivateRoute>}
        >
          <Route path="" element={<DashboardPagesComponent />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<ProfileSettingsDashboard />} />
          <Route path="activedelivery" element={<ActiveDeliveryPageComponets />} />
          <Route path="help&support" element={<FarmerHelpAndSupport />} />
        </Route>

        <Route
          path="/agent/dashboard"
          element={<PrivateRoute><AgentDashboard /></PrivateRoute>}
        >
          <Route path="" element={<AgentDashBoard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings" element={<AgentProfileSettings />} />
          <Route path="activedelivery" element={<ActiveDeliveryPageComponets />} />
          <Route path="help&support" element={<FarmerHelpAndSupport />} />
        </Route>

        <Route
          path="/drivers/dashboard"
          element={<PrivateRoute><DriverDashboard /></PrivateRoute>}
        >
          <Route path="" element={<DriverDashboardView />} />
          <Route path="activedelivery" element={<DriverActiveDeliveries />} />
          <Route path="wallet" element={<DriverWellet />} />
          <Route path="jobss" element={<Transport />} />
          <Route path="earnings" element={<EarningsDrivers />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/trackdelivery/:id"
          element={<PrivateRoute><DriverActiveDelivery /></PrivateRoute>}
        />
        <Route
          path="/job-details"
          element={<PrivateRoute><DriverJobDetails /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;