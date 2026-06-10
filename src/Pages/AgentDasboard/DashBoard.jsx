import React from 'react';
import { desktopMenuItems, mobileMenuItems } from "../../Data/Data";
import DashboardLayout from '../../Components/DashboardLayout';
const Dashboard = () => {
  return (
    <>
    <DashboardLayout 
      desktopMenuItems={desktopMenuItems} 
      mobileMenuItems={mobileMenuItems} 
      profile="J"
      profileName=" Jola Ogeremu"
      rows="Agent"
    />
   
    </>
  );
}

export default Dashboard;