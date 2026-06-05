import React from 'react'
import { LuUser, LuChevronRight } from 'react-icons/lu'
import "../CSS/ProfileSettings.css"

const ProfileSettings = () => {
  return (
    <div className="fg-profile-settings-container">
      <h2 className="fg-profile-page-title">Settings</h2>
      
      <div className="fg-profile-settings-card">
        <div className="fg-profile-card-header">
          <LuUser className="fg-profile-header-icon" />
          <h3 className="fg-profile-header-title">Profile</h3>
        </div>
        
        <div className="fg-profile-menu-list">
          <button type="button" className="fg-profile-menu-item">
            <span>Edit Profile</span>
            <LuChevronRight className="fg-profile-item-arrow" />
          </button>
          
          <button type="button" className="fg-profile-menu-item">
            <span>Change Phone Number</span>
            <LuChevronRight className="fg-profile-item-arrow" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings