import React from 'react';
import "../CSS/Notification.css";

const Notification = () => {
  return (
    <section className="notification-section">
      <div className="notification-container">
        
        <div className="notification-header">
          <h1 className="notification-page-title">Notifications</h1>
          <button className="mark-all-btn">Mark all as read</button>
        </div>

        <div className="notification-list-card">
          
          <div className="notification-item unread-item">
            <div className="notif-left-block">
              <div className="notif-badge badge-payment">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="notif-text-stack">
                <h3 className="notif-title">Payment Released</h3>
                <p className="notif-message">₦22,500 has been added to your wallet</p>
                <span className="notif-timestamp">2 hours ago</span>
              </div>
            </div>
            <span className="unread-dot"></span>
          </div>
          
          <div className="notification-item unread-item">
            <div className="notif-left-block">
              <div className="notif-badge badge-job">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <div className="notif-text-stack">
                <h3 className="notif-title">Job Accepted</h3>
                <p className="notif-message">Driver Musa Ibrahim accepted your transport request</p>
                <span className="notif-timestamp">5 hours ago</span>
              </div>
            </div>
            <span className="unread-dot"></span>
          </div>

          <div className="notification-item">
            <div className="notif-left-block">
              <div className="notif-badge badge-weather">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="notif-text-stack">
                <h3 className="notif-title">Weather Alert</h3>
                <p className="notif-message">Heavy rain expected in your delivery route tomorrow</p>
                <span className="notif-timestamp">1 day ago</span>
              </div>
            </div>
          </div>

          <div className="notification-item">
            <div className="notif-left-block">
              <div className="notif-badge badge-delivery">
                <span className="currency-badge-symbol">₦</span>
              </div>
              <div className="notif-text-stack">
                <h3 className="notif-title">Delivery Completed</h3>
                <p className="notif-message">Your tomatoes delivery has been completed</p>
                <span className="notif-timestamp">1 day ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Notification;