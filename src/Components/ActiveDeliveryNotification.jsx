import React from 'react'
import { LuMapPin, LuClock, LuTruck } from 'react-icons/lu'
import "../CSS/ActiveDeliveryNotification.css"

const ActiveDeliveryNotification = ({ delivery }) => {
  // No default values – use real data or leave empty
  const productType = delivery?.productType || '';
  const quantity = delivery?.quantity ?? '';
  const weight = delivery?.weight || '';
  const pickup = delivery?.AddressOrpickUpLocation || '';
  const destination = delivery?.Destination || '';
  const trackingId = delivery?.trackingId || '';
  const status = delivery?.status || '';
  const eta = delivery?.estimatedDuration || '';
  const totalFare = delivery?.totalFare ?? 0;

  // Driver info – if driverId exists, use it; otherwise leave blank
  const driver = delivery?.driverId || null;
  const driverFirstName = driver?.firstName || '';
  const driverLastName = driver?.lastName || '';
  const driverFullName = (driverFirstName + ' ' + driverLastName).trim();
  const driverPhone = driver?.phoneNumber || '';
  const avatarLetter = driverFirstName ? driverFirstName.charAt(0) : '';

  return (
    <div className="tracking-card">
      <div className="card-header">
        <div className="header-left">
          <div className="title-row">
            <h2>
              {productType && quantity ? `${productType} - ${quantity}${weight}` : productType || 'Unnamed delivery'}
            </h2>
            <span className="badge badge-transit">
              <LuTruck size={14} className="badge-icon" />
              {status || 'Unknown'}
            </span>
          </div>
          <p className="subtext">
            ID: {trackingId || 'N/A'} • Created: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="header-right">
          <span className="price">
            {totalFare ? `₦${totalFare.toLocaleString()}` : '₦0'}
          </span>
        </div>
      </div>

      <div className="route-details">
        <div className="route-item">
          <LuMapPin size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">Pickup</span>
            <span className="route-value">{pickup || 'Not specified'}</span>
          </div>
        </div>

        <div className="route-item">
          <LuMapPin size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">Destination</span>
            <span className="route-value">{destination || 'Not specified'}</span>
          </div>
        </div>

        <div className="route-item">
          <LuClock size={18} className="route-icon" />
          <div className="route-text">
            <span className="route-label">ETA</span>
            <span className="route-value">{eta || 'N/A'}</span>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="card-footer">
        <div className="driver-profile">
          <div className="avatar">{avatarLetter || '?'}</div>
          <div className="driver-info">
            <h3>{driverFullName || 'No driver assigned'}</h3>
            <p>{driverPhone || 'No phone'}</p>
          </div>
        </div>
        <button className="track-btn">
          Track Delivery
        </button>
      </div>
    </div>
  )
}

export default ActiveDeliveryNotification