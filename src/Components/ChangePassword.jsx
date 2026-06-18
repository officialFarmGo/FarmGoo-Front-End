import React, { useState } from 'react';
import { FiArrowLeft, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../CSS/ChangePassword.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Live password validation criteria checks
  const validations = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!validations.length || !validations.uppercase || !validations.lowercase || !validations.number) {
      alert("Please meet all password validation criteria.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
  };

  return (
    <main className="cp-section">
      <div className="cp-container">
        
        {/* Top Header Group */}
        <header className="cp-header-row">
          <div className="cp-title-stack">
            <h1 className="cp-main-title">Change Password</h1>
            <p className="cp-sub-title">Update your password to keep your account secure</p>
          </div>
          <button type="button" className="cp-back-btn">
            <FiArrowLeft size={16} />
            <span>Back</span>
          </button>
        </header>

        <form onSubmit={handleUpdatePassword} className="cp-form-stack">
          
          {/* Current Password Block */}
          <div className="cp-input-card">
            <h2 className="cp-card-label">Current Password</h2>
            <div className="cp-field-group">
              <label className="cp-field-sublabel">Enter your current password</label>
              <div className="cp-input-wrapper">
                <FiLock className="cp-input-icon" size={18} />
                <input
                  type={showCurrent ? "text" : "password"}
                  className="cp-input-box"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="cp-visibility-btn"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* New Password & Validations Block */}
          <div className="cp-input-card">
            <h2 className="cp-card-label">New Password</h2>
            
            <div className="cp-field-group">
              <label className="cp-field-sublabel">Enter new password</label>
              <div className="cp-input-wrapper">
                <FiLock className="cp-input-icon" size={18} />
                <input
                  type={showNew ? "text" : "password"}
                  className="cp-input-box"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="cp-visibility-btn"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Live Password Checklist Tracker */}
            <div className="cp-checklist-box">
              <p className="cp-checklist-title">Password must contain:</p>
              <ul className="cp-checklist">
                <li className={`cp-check-item ${validations.length ? 'valid' : ''}`}>
                  <span className="cp-indicator-dot"></span>
                  <span>At least 8 characters</span>
                </li>
                <li className={`cp-check-item ${validations.uppercase ? 'valid' : ''}`}>
                  <span className="cp-indicator-dot"></span>
                  <span>Contains uppercase letter</span>
                </li>
                <li className={`cp-check-item ${validations.lowercase ? 'valid' : ''}`}>
                  <span className="cp-indicator-dot"></span>
                  <span>Contains lowercase letter</span>
                </li>
                <li className={`cp-check-item ${validations.number ? 'valid' : ''}`}>
                  <span className="cp-indicator-dot"></span>
                  <span>Contains number</span>
                </li>
              </ul>
            </div>

            <div className="cp-field-group cp-confirm-spacing">
              <label className="cp-field-sublabel">Confirm new password</label>
              <div className="cp-input-wrapper">
                <FiLock className="cp-input-icon" size={18} />
                <input
                  type={showConfirm ? "text" : "password"}
                  className="cp-input-box"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="cp-visibility-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="cp-action-row">
            <button type="submit" className="cp-btn-submit">
              Change Password
            </button>
            <button type="button" className="cp-btn-cancel">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default ChangePassword;