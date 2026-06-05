import React from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import { desktopMenuItems, mobileMenuItems } from "../../Data/Data";

const DashBoard = () => {
  return (
    <div>
       <DashboardLayout 
      desktopMenuItems={desktopMenuItems} 
      mobileMenuItems={mobileMenuItems} 
      profile="J"
      profileName=" Jola Ogeremu"
      rows="Driver"
    />
    </div>
  )
}

export default DashBoard
