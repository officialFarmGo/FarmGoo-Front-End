import React from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import { driverDesktopMenuItems, driverMobileMenuItems } from "../../Data/DriverDashboard";
import { useSelector } from 'react-redux';

const DashBoard = () => {
  const user = useSelector((state) => state.auth.user);

  const firstName = user?.firstName || "Driver";
  const lastName = user?.lastName || "";
  const profileInitial = firstName.charAt(0).toUpperCase();
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div>
      <DashboardLayout
        desktopMenuItems={driverDesktopMenuItems}
        mobileMenuItems={driverMobileMenuItems}
        profile={profileInitial}
        profileName={fullName}
        rows="Driver"
      />
    </div>
  )
}

export default DashBoard