import React, { useState } from 'react'
import "../CSS/RequestTransport.css"
import { useNavigate } from 'react-router-dom'

const RequestTransport = () => {
  const [showModal, setShowModal] = useState(false)
  const nav=useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <div className="request-transport-container">
      <div className="request-transport-wrapper">
        <h1 className="title">Request Transport</h1>
        <p className="subtitle">Fill in the details to find a driver for your produce</p>

        <form onSubmit={handleSubmit}>
          {/* Produce Details */}
          <div className="card">
            <div className="card-header">
              <span className="icon green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Produce Details</h2>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Produce Type</label>
                <select defaultValue="">
                  <option value="" disabled>Select produce</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="yam">Yam</option>
                  <option value="maize">Maize</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <div className="quantity-inputs">
                  <input type="number" defaultValue="500" />
                  <input type="text" placeholder="" />
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="card">
            <div className="card-header">
              <span className="icon blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Pickup Location</h2>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" placeholder="e.g. Ikorodu, Lagos" />
            </div>
            <div className="form-group">
              <label>Landmark</label>
              <input type="text" placeholder="e.g. Near Ogun River Bridge" />
            </div>
          </div>

          {/* Destination */}
          <div className="card">
            <div className="card-header">
              <span className="icon purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Destination</h2>
            </div>
            <div className="form-group">
              <label>Market/Location</label>
              <input type="text" placeholder="" />
            </div>
          </div>

          {/* Customer's Details */}
          <div className="card">
            <div className="card-header">
              <span className="icon pink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#DB2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Customer's Details</h2>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="0801 255 5118" />
            </div>
          </div>

          {/* Pickup Schedule */}
          <div className="card">
            <div className="card-header">
              <span className="icon orange">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V6" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 2V6" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Pickup Schedule</h2>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Time</label>
                <select defaultValue="">
                  <option value="" disabled>Select time</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="card">
            <div className="card-header">
              <span className="icon yellow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11C2 10.4696 2.21071 10.9609 2.58579 10.5858C2.96086 10.2107 3.46957 10 4 10H20C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 17L5 11C5 9.93913 5.42143 8.92172 6.17157 8.17157C6.92172 7.42143 7.93913 7 9 7H15C16.0609 7 17.0783 7.42143 17.8284 8.17157C18.5786 8.92172 19 9.93913 19 11V17" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 17H18" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 17C7 17.5523 6.55228 18 6 18C5.44772 18 5 17.5523 5 17" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 17C19 17.5523 18.5523 18 18 18C17.4477 18 17 17.5523 17 17" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <h2>Vehicle Type</h2>
            </div>
            <div className="form-group">
              <select defaultValue="">
                <option value="" disabled>Select vehicle type</option>
                <option value="van">Van</option>
                <option value="truck">Truck</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
          </div>

          {/* Estimated Price */}
          <div className="card price-card">
            <div className="price-row">
              <span className="icon dollar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1V23" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Estimated Price</span>
            </div>
            <div className="price-row">
              <span className="icon dollar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 1V23" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 5H9.5C8.11929 5 7 6.11929 7 7.5C7 8.88071 8.11929 10 9.5 10H14.5C15.8807 10 17 11.1193 17 12.5C17 13.8807 15.8807 15 14.5 15H7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Service Fee</span>
            </div>
            <p className="price-value">-</p>
            <p className="price-note">Final price may vary based on driver bids and market conditions</p>
          </div>

          <button type="submit" className="submit-btn">Request Transport</button>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Transport Request Submitted!</h2>
            <p>Your request has been sent to drivers in your area. You'll be notified when a driver accepts.</p>
            <button className="modal-btn primary" >View Active Requests</button>
            <button className="modal-btn secondary" onClick={() => setShowModal(false)}>Go Back</button>
            <div className="modal-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestTransport
