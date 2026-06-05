import React from 'react'
import './App.css'

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import LandingPageComponents from './Components/UI/LandingPageComponents';
import LoginPage from './Pages/Auth/LoginPage';
import SignupPage from './Pages/Auth/SignPage';
import DashboardPagesComponent from './Components/UI/DashboardPagesComponent';
import VerificationOtp from './Pages/Auth/VerificationOtp';
import SuccessFullVerification from './Pages/Auth/SuccessFullVerification';
import FarmersDahboard from './Pages/FarmerDahboard/Dashboard'
import DriverDashboard from './Pages/DriverDashBoard/DashBoard';
import AgentDashboard from './Pages/AgentDasboard/DashBoard';
import Wallet from './Components/Wallet';
import NotificationPreferences from './Components/NotificationPreferences';
import ProfileSettingsDashboard from './Components/ProfileSettingsDashboard';
import ActiveDeliveryPageComponets from './Components/UI/ActiveDeliveryPageComponets';
import DashboardRedirect from './Data/DashboardRedirect';
import { AuthProvider } from './Context/AuthContext';
import DriverDashboardView from './Components/UI/DriverDashboardView';
import Info from './Pages/Auth/Info';
import Notification from './Components/Notification';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageComponents />} />
        <Route path="/login" element={<LoginPage/> } />
        <Route path="/signup" element={<SignupPage/> } />
        <Route path='/otp'  element={<VerificationOtp/>}/>
        <Route path='/chooseDash' element={<Info/>}/>
        <Route path="/success" element={<SuccessFullVerification/>}/>

          <Route path='/dashboard' element={<DashboardRedirect/>}/>


        <Route path='/farmer/dashboard' element={<FarmersDahboard/>}>
          <Route path='' element={<DashboardPagesComponent/>}/>
          <Route path='wallet' element={<Wallet/>}/>
          <Route path='notification' element={<Notification/>}/>
          <Route path='settings' element={<ProfileSettingsDashboard/>}/>
          <Route path='activedelivery' element={<ActiveDeliveryPageComponets/>}/>
        </Route>


        <Route path='/agent/dashboard' element={<AgentDashboard/>}>
          <Route path='' element={<DashboardPagesComponent/>}/>
        </Route>


        <Route path='/drivers/dashboard' element={<DriverDashboard/>}>
          <Route path='' element={<DriverDashboardView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}
export default App;


