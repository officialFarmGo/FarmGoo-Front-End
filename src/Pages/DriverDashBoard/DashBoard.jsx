import React from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import { driverDesktopMenuItems,driverMobileMenuItems } from "../../Data/DriverDashboard";

const DashBoard = () => {
  return (
    <div>
       <DashboardLayout 
      desktopMenuItems={driverDesktopMenuItems} 
      mobileMenuItems={driverMobileMenuItems} 
      profile="C"
      profileName=" Clinton Sommy"
      rows="Driver"
    />
    </div>
  )
}

export default DashBoard
