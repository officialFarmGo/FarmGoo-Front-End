import React from 'react'
import DashboardHeader from '../../Components/DashboardHeader'
import WeatherAlert from '../../Components/WeatherAlert'
import ActiveDeliveries from '../../Components/ActiveDeliveries'

const DashboardPagesComponent = () => {
  return (
    <div>
      <DashboardHeader/>
      <WeatherAlert/>
      <ActiveDeliveries/>
    </div>
  )
}

export default DashboardPagesComponent
