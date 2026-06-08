import React from 'react'
import ActiveDeliveries from '../ActiveDeliveries'
import ActiveDeliveriesList from '../ActiveDeliveriesList'
import ActiveDeliveryNotification from '../ActiveDeliveryNotification'

const ActiveDrivesDrivers = () => {
  return (
    <div>
      <ActiveDeliveryNotification/>
      <ActiveDeliveriesList/>
    </div>
  )
}

export default ActiveDrivesDrivers
