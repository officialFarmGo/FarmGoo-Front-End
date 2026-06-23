import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AgentDashBoard from "./Components/UI/AgentDashBoard";
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
import ProfileSettingsDashboard from "./Components/ProfileSettingsDashboard";
import ActiveDeliveryPageComponets from "./Components/UI/ActiveDeliveryPageComponets";
import DashboardRedirect from "./Data/DashboardRedirect";
import DriverDashboardView from "./Components/UI/DriverDashboardView";
import Info from "./Pages/Auth/Info";
import Notification from "./Components/Notification";
import FarmerProfile from "./Pages/Auth/FarmerProfile";
import FarmerHelpAndSupport from "./Components/UI/FarmerHelpAndSupport";
import DriverWellet from "./Components/UI/DriverWellet";
import DriverActiveDelivery from "./Components/DriverActiveDelivery";
import Transport from "./Components/UI/Transport";
import EarningsDrivers from "./Components/UI/EarningsDrivers";
import Profile from "./Components/UI/Profile";
import AgentProfileSettings from "./Components/AgentProfilesetting";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import DriverKycVerification from "./Components/DriverKycVerification";
import VerificationPending from "./Components/VerificationPending";
import ApprovedDoc from "./Components/ApprovedDoc";
import DriverActiveDeliveries from "./Components/DriverActiveDeliveries";
import DriverJobDetails from "./Components/DriverJobDetails";
import NotFound from "./Components/NotFound";
import CompleteAgentProfile from "./Components/CompleteAgentProfile";
import AgentDashboardContent from "./Components/UI/AgentDashboardContent";
import WithdrawalSuccess from "./Components/WithdrawalSuccess";
import PaymentVerification from "./Components/PaymentVerification";
import PrivateRoute from "./Props/PrivateRoute";
import WithdrawalPageSuccess from "./Components/WithdrawalPageSucess";



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
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route element={<PrivateRoute allowedRoles={["farmer"]} />}>
          <Route path="/farmer_kyc/:farmId" element={<FarmerProfile />} />
          <Route path="/farmer/dashboard" element={<FarmersDahboard />}>
             <Route path='withdrawalpage-success' element={<WithdrawalPageSuccess />} />
            <Route path="" element={<DashboardPagesComponent />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="notification" element={<Notification />} />
            <Route path="settings" element={<ProfileSettingsDashboard />} />
            <Route path="activedelivery" element={<ActiveDeliveryPageComponets />} />
            <Route path="help&support" element={<FarmerHelpAndSupport />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["agent"]} />}>
          <Route path="/agent_kyc/:agentId" element={<CompleteAgentProfile />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />}>
          <Route path='withdrawalpage-success' element={<WithdrawalPageSuccess />} />
            <Route path="" element={<AgentDashBoard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="notification" element={<Notification />} />
            <Route path="settings" element={<AgentProfileSettings />} />
            <Route path="activedelivery" element={<AgentDashboardContent />} />
            <Route path="help&support" element={<FarmerHelpAndSupport />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["driver"]} />}>
          <Route path="/driver_kyc/:driverId" element={<DriverKycVerification />} />
          <Route path="/driverpending" element={<VerificationPending />} />
          <Route path="/payment-verification" element={<PaymentVerification />} />
          <Route path="withdrawal-success" element={<WithdrawalSuccess />} />
          <Route path="/approved" element={<ApprovedDoc />} />
          <Route path="/drivers/dashboard" element={<DriverDashboard />}>
            <Route path="" element={<DriverDashboardView />} />
            <Route path="activedelivery" element={<DriverActiveDeliveries />} />
            <Route path="wallet" element={<DriverWellet />} />
            <Route path="jobss" element={<Transport />} />
            <Route path="earnings" element={<EarningsDrivers />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/trackdelivery/:id" element={<DriverActiveDelivery />} />
          <Route path="/job-details" element={<DriverJobDetails />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardRedirect />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
